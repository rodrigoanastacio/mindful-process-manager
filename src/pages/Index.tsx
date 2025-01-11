import { useState } from "react";
import { ProcessStats } from "@/components/ProcessStats";
import { ProcessFilter } from "@/components/ProcessFilter";
import { ProcessCard } from "@/components/ProcessCard";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { CreateProcessModal } from "@/components/CreateProcessModal";

const mockProcesses = [
  {
    id: "PRO001",
    title: "Environmental License Request",
    description:
      "Request for environmental license for new construction project in downtown area.",
    status: "active" as const,
    date: "2024-03-15",
  },
  {
    id: "PRO002",
    title: "Building Permit Application",
    description:
      "Application for building permit for residential complex development.",
    status: "pending" as const,
    date: "2024-03-14",
  },
  {
    id: "PRO003",
    title: "Zoning Change Request",
    description: "Request to change zoning classification for commercial property.",
    status: "completed" as const,
    date: "2024-03-10",
  },
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { toast } = useToast();

  const filteredProcesses = mockProcesses.filter((process) => {
    const matchesSearch = process.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || process.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleArchive = (id: string) => {
    toast({
      title: "Process Archived",
      description: `Process ${id} has been archived successfully.`,
    });
  };

  const handleDelete = (id: string) => {
    toast({
      title: "Process Deleted",
      description: `Process ${id} has been deleted successfully.`,
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Process Management</h1>
          <Button 
            className="bg-primary hover:bg-primary/90"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            New Process
          </Button>
        </div>

        <ProcessStats />

        <div className="space-y-6">
          <ProcessFilter
            onSearch={setSearchTerm}
            onStatusChange={setStatusFilter}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProcesses.map((process) => (
              <ProcessCard
                key={process.id}
                {...process}
                onArchive={() => handleArchive(process.id)}
                onDelete={() => handleDelete(process.id)}
              />
            ))}
          </div>

          {filteredProcesses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No processes found</p>
            </div>
          )}
        </div>
      </div>

      <CreateProcessModal 
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />
    </div>
  );
};

export default Index;
