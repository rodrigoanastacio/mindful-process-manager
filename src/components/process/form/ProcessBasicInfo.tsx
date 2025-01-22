import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ProcessType } from "@/types/database";
import { Building2, Scale, Briefcase, Gavel, Heart } from "lucide-react";

interface ProcessBasicInfoProps {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  type: ProcessType;
  setType: (value: ProcessType) => void;
  protocol: string;
  setProtocol: (value: string) => void;
}

export const ProcessBasicInfo = ({
  title,
  setTitle,
  description,
  setDescription,
  type,
  setType,
  protocol,
  setProtocol,
}: ProcessBasicInfoProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-4">
        <Label htmlFor="protocol">Número do Processo</Label>
        <Input
          id="protocol"
          placeholder="Digite o número do processo"
          value={protocol}
          onChange={(e) => setProtocol(e.target.value)}
          required
        />
      </div>

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
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          <div className="flex items-center space-x-2 border rounded p-4">
            <RadioGroupItem value="civil" id="civil" />
            <Label htmlFor="civil" className="flex items-center gap-2">
              <Scale className="h-4 w-4" />
              Cível
            </Label>
          </div>

          <div className="flex items-center space-x-2 border rounded p-4">
            <RadioGroupItem value="familia" id="familia" />
            <Label htmlFor="familia" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Família
            </Label>
          </div>

          <div className="flex items-center space-x-2 border rounded p-4">
            <RadioGroupItem value="trabalhista" id="trabalhista" />
            <Label htmlFor="trabalhista" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Trabalhista
            </Label>
          </div>

          <div className="flex items-center space-x-2 border rounded p-4">
            <RadioGroupItem value="criminal" id="criminal" />
            <Label htmlFor="criminal" className="flex items-center gap-2">
              <Gavel className="h-4 w-4" />
              Criminal
            </Label>
          </div>

          <div className="flex items-center space-x-2 border rounded p-4">
            <RadioGroupItem value="previdenciario" id="previdenciario" />
            <Label htmlFor="previdenciario" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Previdenciário
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};