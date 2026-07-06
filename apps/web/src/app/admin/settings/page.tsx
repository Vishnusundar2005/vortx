'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsService, BusinessSettingsData } from '@/services/settings.service';
import { useForm } from 'react-hook-form';
import { Save } from 'lucide-react';
import { useEffect } from 'react';

export default function SettingsPage() {
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ['business-settings'],
    queryFn: settingsService.getSettings,
    retry: false,
  });

  const DEFAULT_SETTINGS: BusinessSettingsData = {
    studioName: 'VORTX Studios',
    ownerName: 'Admin',
    email: 'admin@vortx.com',
    phone: '+91 9840039699',
    whatsappNumber: '+919840039699',
    address: 'Chennai, Tamil Nadu, India',
    openingTime: '00:00',
    closingTime: '23:59',
    hourlyPrice: 2000,
    minBookingHours: 2,
    maxBookingHours: 12,
    googleMapsUrl: '',
    instagram: '',
    youtube: '',
    facebook: '',
  };

  const updateMutation = useMutation({
    mutationFn: settingsService.updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business-settings'] });
      alert('Settings saved successfully!');
    },
  });

  const { register, handleSubmit, reset } = useForm<BusinessSettingsData>();

  useEffect(() => {
    reset(settings || DEFAULT_SETTINGS);
  }, [settings, reset]);

  const onSubmit = (data: BusinessSettingsData) => {
    const payload = {
      ...data,
      hourlyPrice: Number(data.hourlyPrice),
      minBookingHours: Number(data.minBookingHours),
      maxBookingHours: Number(data.maxBookingHours),
    };
    updateMutation.mutate(payload);
  };

  if (isLoading) return <div className="text-zinc-500 animate-pulse">Loading settings...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Business Settings</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* General Info */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4 border-b border-zinc-800 pb-2">General Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Studio Name</label>
              <input {...register('studioName')} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Owner Name</label>
              <input {...register('ownerName')} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white" />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4 border-b border-zinc-800 pb-2">Contact Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Email Address</label>
              <input type="email" {...register('email')} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Phone Number</label>
              <input {...register('phone')} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">WhatsApp Number (inc. country code)</label>
              <input {...register('whatsappNumber')} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-zinc-400 mb-1">Physical Address</label>
              <input {...register('address')} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white" />
            </div>
          </div>
        </div>

        {/* Operations & Pricing */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4 border-b border-zinc-800 pb-2">Operations & Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Opening Time</label>
              <input type="time" {...register('openingTime')} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Closing Time</label>
              <input type="time" {...register('closingTime')} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Hourly Price (₹/$)</label>
              <input type="number" step="0.01" {...register('hourlyPrice')} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Min Hours</label>
                <input type="number" {...register('minBookingHours')} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Max Hours</label>
                <input type="number" {...register('maxBookingHours')} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4 border-b border-zinc-800 pb-2">Social & Links</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Google Maps URL</label>
              <input type="url" {...register('googleMapsUrl')} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Instagram URL</label>
              <input type="url" {...register('instagram')} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">YouTube URL</label>
              <input type="url" {...register('youtube')} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Facebook URL</label>
              <input type="url" {...register('facebook')} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white" />
            </div>
          </div>
        </div>

        <div className="flex justify-end sticky bottom-6">
          <button type="submit" disabled={updateMutation.isPending} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition flex items-center shadow-lg disabled:opacity-50">
            <Save size={20} className="mr-2" />
            {updateMutation.isPending ? 'Saving...' : 'Save Settings'}
          </button>
        </div>

      </form>
    </div>
  );
}
