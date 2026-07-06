import { LucideIcon } from 'lucide-react';

interface Props {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export function DashboardCard({ title, value, icon: Icon, description }: Props) {
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <p className="text-sm font-medium text-zinc-400">{title}</p>
        <div className="p-2 bg-zinc-900 rounded-lg text-zinc-300">
          <Icon size={20} />
        </div>
      </div>
      <div className="mt-auto">
        <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
        {description && (
          <p className="text-xs text-zinc-500">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
