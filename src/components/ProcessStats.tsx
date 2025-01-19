import { Card } from "@/components/ui/card";
import { Clock, CheckCircle, Archive, AlertCircle } from "lucide-react";

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  trend?: number;
  description?: string;
}

const StatsCard = ({ icon, label, value, trend, description }: StatsCardProps) => (
  <Card className="glass-card p-6 hover:shadow-lg transition-all duration-200 hover:translate-y-[-2px]">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <h4 className="text-2xl font-semibold mt-1">{value}</h4>
        {description && (
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        )}
      </div>
      <div className="text-primary bg-primary/10 p-2 rounded-lg">{icon}</div>
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

export const ProcessStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        icon={<Clock className="h-6 w-6" />}
        label="Pendentes"
        value={12}
        trend={5}
        description="Processos aguardando análise"
      />
      <StatsCard
        icon={<AlertCircle className="h-6 w-6" />}
        label="Em Andamento"
        value={28}
        trend={-2}
        description="Processos em análise"
      />
      <StatsCard
        icon={<CheckCircle className="h-6 w-6" />}
        label="Concluídos"
        value={145}
        trend={12}
        description="Processos finalizados este mês"
      />
      <StatsCard
        icon={<Archive className="h-6 w-6" />}
        label="Arquivados"
        value={38}
        trend={0}
        description="Total de processos arquivados"
      />
    </div>
  );
};