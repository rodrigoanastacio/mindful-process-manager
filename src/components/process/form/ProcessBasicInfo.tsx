import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FileText, Users, Building2 } from "lucide-react";

interface ProcessBasicInfoProps {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  type: 'administrativo' | 'judicial';
  setType: (value: 'administrativo' | 'judicial') => void;
}

export const ProcessBasicInfo = ({
  title,
  setTitle,
  description,
  setDescription,
  type,
  setType,
}: ProcessBasicInfoProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-4">
        <Label htmlFor="title">Título do Processo</Label>
        <div className="rounded focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
          <Input
            id="title"
            placeholder="Digite o título do processo"
            className="text-lg rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <Label htmlFor="description">Descrição</Label>
        <div className="rounded focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
          <Textarea
            id="description"
            placeholder="Forneça uma descrição detalhada do processo"
            className="min-h-[120px] rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <Label>Tipo de Processo</Label>
        <RadioGroup
          value={type}
          onValueChange={(value: 'administrativo' | 'judicial') => setType(value)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="flex items-center space-x-2 border rounded p-4 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
            <RadioGroupItem value="administrativo" id="administrativo" />
            <Label
              htmlFor="administrativo"
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Administrativo
            </Label>
          </div>

          <div className="flex items-center space-x-2 border rounded p-4 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
            <RadioGroupItem value="judicial" id="judicial" />
            <Label
              htmlFor="judicial"
              className="flex items-center gap-2"
            >
              <Building2 className="h-4 w-4" />
              Jurídico
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};