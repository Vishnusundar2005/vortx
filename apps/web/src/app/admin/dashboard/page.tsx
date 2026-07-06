'use client';

import dynamic from 'next/dynamic';
import { useQuery } from '@tanstack/react-query';
import { reportsService } from '@/services/reports.service';
import { DashboardCard } from '@/components/admin/DashboardCard';
import { Calendar, CheckCircle, Clock, XCircle, IndianRupee, PieChart as PieChartIcon, TrendingUp } from 'lucide-react';

const RevenueChart = dynamic(() => import('@/components/admin/charts/RevenueChart'), { ssr: false, loading: () => <div className="h-full w-full flex items-center justify-center text-zinc-500 animate-pulse bg-zinc-900/50 rounded-lg">Loading chart...</div> });
const PurposeChart = dynamic(() => import('@/components/admin/charts/PurposeChart'), { ssr: false, loading: () => <div className="h-full w-full flex items-center justify-center text-zinc-500 animate-pulse bg-zinc-900/50 rounded-lg">Loading chart...</div> });
const StatusChart = dynamic(() => import('@/components/admin/charts/StatusChart'), { ssr: false, loading: () => <div className="h-full w-full flex items-center justify-center text-zinc-500 animate-pulse bg-zinc-900/50 rounded-lg">Loading chart...</div> });

export default function DashboardPage() {
  const { data: summary, isLoading: isSummaryLoading } = useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: reportsService.getDashboardSummary,
    retry: false,
  });

  const { data: stats, isLoading: isStatsLoading } = useQuery({
    queryKey: ['dashboard-statistics'],
    queryFn: reportsService.getStatistics,
    retry: false,
  });

  if (isSummaryLoading || isStatsLoading) {
    return <div className="text-zinc-400 animate-pulse">Loading dashboard metrics...</div>;
  }

  if (!summary || !stats) {
    return <div className="text-red-500 p-6 bg-zinc-950 border border-zinc-800 rounded-xl">Failed to load dashboard statistics.</div>;
  }

  const displaySummary = summary;
  const displayStats = stats;

  return (
    <div className="space-y-8">
      {/* Top Level Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          title="Today's Bookings" 
          value={displaySummary.todayCount} 
          icon={Calendar} 
          description={`${displaySummary.totalHours} hrs total confirmed`} 
        />
        <DashboardCard 
          title="This Week" 
          value={displaySummary.weekCount} 
          icon={TrendingUp} 
        />
        <DashboardCard 
          title="This Month" 
          value={displaySummary.monthCount} 
          icon={PieChartIcon} 
        />
        <DashboardCard 
          title="Estimated Revenue" 
          value={`₹${displaySummary.estimatedRevenue.toLocaleString('en-IN')}`} 
          icon={IndianRupee} 
          description="Based on confirmed hours"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Pending" value={displaySummary.pendingCount} icon={Clock} />
        <DashboardCard title="Confirmed" value={displaySummary.confirmedCount} icon={CheckCircle} />
        <DashboardCard title="Completed" value={displaySummary.completedCount} icon={CheckCircle} />
        <DashboardCard title="Cancelled/Rejected" value={displaySummary.cancelledCount + displaySummary.rejectedCount} icon={XCircle} />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Revenue Trend */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Revenue Trend (Monthly)</h3>
          <div className="h-72 w-full">
            <RevenueChart data={displayStats.revenueTrend} />
          </div>
        </div>

        {/* Purpose Distribution */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Bookings by Purpose</h3>
          <div className="h-72 w-full">
            <PurposeChart data={displayStats.purposeDistribution} />
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-white mb-6">Overall Status Distribution</h3>
          <div className="h-80 w-full flex justify-center">
            <StatusChart data={displayStats.statusDistribution} />
          </div>
        </div>

      </div>
    </div>
  );
}
