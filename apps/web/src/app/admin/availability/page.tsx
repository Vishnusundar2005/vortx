'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { availabilityService } from '@/services/availability.service';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function AvailabilityPage() {
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);

  const { data: blockedSlots, isLoading } = useQuery({
    queryKey: ['blocked-slots'],
    queryFn: availabilityService.getBlockedSlots,
    retry: false,
  });

  const removeMutation = useMutation({
    mutationFn: availabilityService.removeBlockedSlot,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blocked-slots'] });
    },
  });

  const addMutation = useMutation({
    mutationFn: availabilityService.createBlockedSlot,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blocked-slots'] });
      setIsAdding(false);
      reset();
    },
  });

  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      date: '',
      isFullDay: false,
      startTime: '',
      endTime: '',
      reason: '',
    }
  });

  const isFullDay = watch('isFullDay');

  const onSubmit = (data: unknown) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formData = data as any;
    if (formData.isFullDay) {
      addMutation.mutate({
        date: formData.date,
        isFullDay: true,
        reason: formData.reason
      });
    } else {
      addMutation.mutate({
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        isFullDay: false,
        reason: formData.reason
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Availability Management</h1>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition flex items-center"
        >
          {isAdding ? 'Cancel' : <><Plus size={18} className="mr-2" /> Block Slot</>}
        </button>
      </div>

      {isAdding && (
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Block New Time Slot</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Date</label>
                <input type="date" {...register('date', { required: true })} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white" />
              </div>
              <div className="flex items-center mt-6">
                <input type="checkbox" id="fullDay" {...register('isFullDay')} className="mr-2" />
                <label htmlFor="fullDay" className="text-sm font-medium text-zinc-400">Block Full Day</label>
              </div>
            </div>

            {!isFullDay && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Start Time (HH:MM)</label>
                  <input type="time" {...register('startTime')} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">End Time (HH:MM)</label>
                  <input type="time" {...register('endTime')} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Reason (Optional)</label>
              <input type="text" {...register('reason')} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white" />
            </div>

            <button type="submit" disabled={addMutation.isPending} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition disabled:opacity-50">
              {addMutation.isPending ? 'Saving...' : 'Save Blocked Slot'}
            </button>
          </form>
        </div>
      )}

      <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-900/50">
            <TableRow className="border-zinc-800">
              <TableHead className="text-zinc-400">Date</TableHead>
              <TableHead className="text-zinc-400">Time</TableHead>
              <TableHead className="text-zinc-400">Reason</TableHead>
              <TableHead className="text-zinc-400 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={4} className="text-center py-8 text-zinc-500">Loading...</TableCell></TableRow>
            ) : blockedSlots?.length === 0 ? (
              <TableRow><TableCell colSpan={4} className="text-center py-8 text-zinc-500">No blocked slots.</TableCell></TableRow>
            ) : (
              blockedSlots?.map((slotObj: unknown) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const slot = slotObj as any;
                return (
                <TableRow key={slot.id} className="border-zinc-800">
                  <TableCell className="text-white font-medium">{new Date(slot.date).toLocaleDateString()}</TableCell>
                  <TableCell className="text-zinc-300">
                    {slot.isFullDay ? <span className="px-2 py-1 bg-zinc-800 rounded text-xs">Full Day</span> : `${slot.startTime} - ${slot.endTime}`}
                  </TableCell>
                  <TableCell className="text-zinc-400">{slot.reason || '-'}</TableCell>
                  <TableCell className="text-right">
                    <button onClick={() => removeMutation.mutate(slot.id)} className="text-red-500 hover:text-red-400 p-2">
                      <Trash2 size={18} />
                    </button>
                  </TableCell>
                </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
