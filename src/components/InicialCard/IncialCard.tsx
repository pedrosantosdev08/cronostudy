import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface InicialCardProps {
  icon: IconDefinition;
  title: string;
  infoDescription: string;
}

export const InicialCard = ({
  icon,
  title,
  infoDescription,
}: InicialCardProps) => {
  return (
    <div className="w-full bg-[#16161E]  border border-white/5 flex flex-col items-start p-5 rounded-3xl gap-5 transition-all hover:bg-[#181427] hover:border-[#5126B6]">
      
      {/* Container do Ícone: Mais arredondado e com cor suave */}
      <div className="bg-[#1c1829] text-[#5126B6] w-14 h-14 rounded-2xl flex items-center justify-center shrink-0">
        <FontAwesomeIcon icon={icon} className="text-2xl" />
      </div>

      {/* Container do Texto: Alinhamento preciso */}
      <div className="flex flex-col text-start gap-1">
        <h3 className="text-white text-xl">{title}</h3>
        <p className="text-[#8b8a91] text-sm font-medium">
          {infoDescription}
        </p>
      </div>
    </div>
  );
};