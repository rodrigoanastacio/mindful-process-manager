import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ProcessType } from "@/types/database";

interface ProcessBasicInfoProps {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  type: ProcessType;
  setType: (value: ProcessType) => void;
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
        <Input
          id="title"
          placeholder="Digite o título do processo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="space-y-4">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          placeholder="Forneça uma descrição detalhada do processo"
          className="min-h-[120px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="space-y-4">
        <Label>Tipo de Processo</Label>
        <RadioGroup
          value={type}
          onValueChange={(value: ProcessType) => setType(value)}
          className="grid grid-cols-2 gap-4"
        >
          <div className="flex items-center space-x-2 border rounded p-4">
            <RadioGroupItem value="administrativo" id="administrativo" />
            <Label htmlFor="administrativo">Administrativo</Label>
          </div>

          <div className="flex items-center space-x-2 border rounded p-4">
            <RadioGroupItem value="judicial" id="judicial" />
            <Label htmlFor="judicial">Judicial</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};