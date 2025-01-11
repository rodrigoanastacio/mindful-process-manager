import { Card } from "@/components/ui/card";
import { Clock, CheckCircle, Archive, AlertCircle } from "lucide-react";

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  trend?: number;
}

const StatsCard = ({ icon, label, value, trend }: StatsCardProps) => (
  <Card className="glass-card p-6">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <h4 className="text-2xl font-semibold mt-1">{value}</h4>
      </div>
      <div className="text-primary">{icon}</div>
    </div>
    {trend && (
      <p className="text-xs text-gray-500 mt-2">
        {trend > 0 ? "+" : ""}
        {trend}% from last month
      </p>
    )}
  </Card>
);

export const ProcessStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        icon={<Clock className="h-6 w-6" />}
        label="Pending"
        value={12}
        trend={5}
      />
      <StatsCard
        icon={<AlertCircle className="h-6 w-6" />}
        label="Active"
        value={28}
        trend={-2}
      />
      <StatsCard
        icon={<CheckCircle className="h-6 w-6" />}
        label="Completed"
        value={145}
        trend={12}
      />
      <StatsCard
        icon={<Archive className="h-6 w-6" />}
        label="Archived"
        value={38}
        trend={0}
      />
    </div>
  );
};