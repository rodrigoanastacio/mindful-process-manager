import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Clock, CheckCircle, Archive, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ProcessStatus } from "@/types/database";

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  trend?: number;
  description?: string;
  isLoading?: boolean;
}

const StatsCard = ({ icon, label, value, trend, description, isLoading }: StatsCardProps) => (
  <Card className="glass-card p-6 hover:shadow-lg transition-all duration-200 hover:translate-y-[-2px]">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <h4 className="text-2xl font-semibold mt-1">
          {isLoading ? "-" : value}
        </h4>
        {description && (
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        )}
      </div>
      <div className={`text-primary p-2 rounded-lg ${isLoading ? 'bg-gray-100' : 'bg-primary/10'}`}>
        {icon}
      </div>
    </div>
    {trend !== undefined && (
      <div className={`text-xs mt-2 flex items-center gap-1 ${
        trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-600'
      }`}>
        {trend > 0 ? '↑' : trend < 0 ? '↓' : '→'}
        <span>
          {trend > 0 ? '+' : ''}{trend}% em relação ao mês anterior
        </span>
      </div>
    )}
  </Card>
);

const calculateTrend = (currentCount: number, previousCount: number): number => {
  if (previousCount === 0) return 0;
  return Math.round(((currentCount - previousCount) / previousCount) * 100);
};

const getMonthRange = (monthsAgo: number = 0) => {
  const date = new Date();
  date.setMonth(date.getMonth() - monthsAgo);
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return {
    start: startOfMonth.toISOString(),
    end: endOfMonth.toISOString(),
  };
};

export const ProcessStats = () => {
  const currentMonth = getMonthRange();
  const lastMonth = getMonthRange(1);

  const { data: stats, isLoading } = useQuery({
    queryKey: ['process-stats'],
    queryFn: async () => {
      const [currentPending, lastPending] = await Promise.all([
        supabase
          .from('processos')
          .select('id', { count: 'exact' })
          .eq('status', 'em_andamento' as ProcessStatus)
          .gte('created_at', currentMonth.start)
          .lte('created_at', currentMonth.end),
        supabase
          .from('processos')
          .select('id', { count: 'exact' })
          .eq('status', 'em_andamento' as ProcessStatus)
          .gte('created_at', lastMonth.start)
          .lte('created_at', lastMonth.end)
      ]);

      const [currentInProgress, lastInProgress] = await Promise.all([
        supabase
          .from('processos')
          .select('id', { count: 'exact' })
          .eq('status', 'em_andamento' as ProcessStatus),
        supabase
          .from('processos')
          .select('id', { count: 'exact' })
          .eq('status', 'em_andamento' as ProcessStatus)
          .lt('created_at', lastMonth.end)
      ]);

      const [currentCompleted, lastCompleted] = await Promise.all([
        supabase
          .from('processos')
          .select('id', { count: 'exact' })
          .eq('status', 'concluido' as ProcessStatus)
          .gte('updated_at', currentMonth.start)
          .lte('updated_at', currentMonth.end),
        supabase
          .from('processos')
          .select('id', { count: 'exact' })
          .eq('status', 'concluido' as ProcessStatus)
          .gte('updated_at', lastMonth.start)
          .lte('updated_at', lastMonth.end)
      ]);

      const [currentArchived, lastArchived] = await Promise.all([
        supabase
          .from('processos')
          .select('id', { count: 'exact' })
          .eq('status', 'arquivado' as ProcessStatus),
        supabase
          .from('processos')
          .select('id', { count: 'exact' })
          .eq('status', 'arquivado' as ProcessStatus)
          .lt('created_at', lastMonth.end)
      ]);

      return {
        pending: {
          current: currentPending.count || 0,
          last: lastPending.count || 0
        },
        inProgress: {
          current: currentInProgress.count || 0,
          last: lastInProgress.count || 0
        },
        completed: {
          current: currentCompleted.count || 0,
          last: lastCompleted.count || 0
        },
        archived: {
          current: currentArchived.count || 0,
          last: lastArchived.count || 0
        }
      };
    }
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        icon={<Clock className="h-6 w-6" />}
        label="Pendentes"
        value={stats?.pending.current || 0}
        trend={stats ? calculateTrend(stats.pending.current, stats.pending.last) : undefined}
        description="Processos aguardando análise"
        isLoading={isLoading}
      />
      <StatsCard
        icon={<AlertCircle className="h-6 w-6" />}
        label="Em Andamento"
        value={stats?.inProgress.current || 0}
        trend={stats ? calculateTrend(stats.inProgress.current, stats.inProgress.last) : undefined}
        description="Processos em análise"
        isLoading={isLoading}
      />
      <StatsCard
        icon={<CheckCircle className="h-6 w-6" />}
        label="Concluídos"
        value={stats?.completed.current || 0}
        trend={stats ? calculateTrend(stats.completed.current, stats.completed.last) : undefined}
        description="Processos finalizados este mês"
        isLoading={isLoading}
      />
      <StatsCard
        icon={<Archive className="h-6 w-6" />}
        label="Arquivados"
        value={stats?.archived.current || 0}
        trend={stats ? calculateTrend(stats.archived.current, stats.archived.last) : undefined}
        description="Total de processos arquivados"
        isLoading={isLoading}
      />
    </div>
  );
};