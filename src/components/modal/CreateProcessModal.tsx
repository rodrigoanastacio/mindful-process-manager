import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { toast } from "sonner";
import { FileText, Users, Building2, Calendar } from "lucide-react";

interface CreateProcessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateProcessModal = ({
  open,
  onOpenChange,
}: CreateProcessModalProps) => {
  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Process created successfully!");
    onOpenChange(false);
    setStep(1);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full h-screen flex flex-col p-0 gap-0 bg-gray-50">
        <div className="container mx-auto p-6">
          <h2 className="text-2xl font-semibold">Create New Process</h2>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the process details below
          </p>
        </div>

        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-4 ">
                    <Label htmlFor="title">Process Title</Label>
                    <div className="rounded focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
                      <Input
                        id="title"
                        placeholder="Enter process title"
                        className="text-lg rounded"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="description">Description</Label>
                    <div className="rounded focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
                      <Textarea
                        id="description"
                        placeholder="Provide a detailed description of the process"
                        className="min-h-[120px] rounded"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Process Type</Label>
                    <RadioGroup
                      defaultValue="administrative"
                      className="grid grid-cols-1 md:grid-cols-3 gap-4 "
                    >
                      <div className="flex items-center space-x-2 border rounded p-4 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
                        <RadioGroupItem
                          value="administrative"
                          id="administrative"
                        />
                        <Label
                          htmlFor="administrative"
                          className="flex items-center gap-2"
                        >
                          <FileText className="h-4 w-4" />
                          Administrative
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 border rounded p-4 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
                        <RadioGroupItem value="legal" id="legal" />
                        <Label
                          htmlFor="legal"
                          className="flex items-center gap-2"
                        >
                          <Building2 className="h-4 w-4" />
                          Legal
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 border rounded p-4 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
                        <RadioGroupItem value="hr" id="hr" />
                        <Label htmlFor="hr" className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Human Resources
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-4">
                    <Label>Deadline</Label>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 rounded focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
                        <Input type="date" className="rounded" required />
                      </div>

                      <div className="flex-1 rounded focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
                        <Input type="time" className="rounded" required />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Priority Level</Label>
                    <RadioGroup
                      defaultValue="medium"
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      <div className="flex items-center space-x-2 border rounded p-4 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
                        <RadioGroupItem value="low" id="low" />
                        <Label htmlFor="low">Low</Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded p-4 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
                        <RadioGroupItem value="medium" id="medium" />
                        <Label htmlFor="medium">Medium</Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded p-4 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
                        <RadioGroupItem value="high" id="high" />
                        <Label htmlFor="high">High</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="assignee">Assignee</Label>
                    <div className="rounded focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
                      <Input
                        id="assignee"
                        className="rounded"
                        placeholder="Enter assignee name or email"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="attachments">Attachments</Label>
                    <div className="rounded focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
                      <Input
                        id="attachments"
                        type="file"
                        multiple
                        className="cursor-pointer rounded"
                      />
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t flex justify-between items-center">
          {step === 2 ? (
            <>
              <Button variant="outline" onClick={() => setStep(1)}>
                Previous
              </Button>
              <Button onClick={handleSubmit}>Create Process</Button>
            </>
          ) : (
            <>
              <div className="rounded focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="rounded"
                >
                  Cancelar
                </Button>
              </div>

              <div className="rounded focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
                <Button className="rounded" onClick={() => setStep(2)}>
                  Próximo
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
