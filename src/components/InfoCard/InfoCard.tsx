import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface InfoCardProps {
  icon: IconDefinition;
  infoNumber: number | string;
  infoDescription: string;
}

export const InfoCard = ({
  icon,
  infoNumber,
  infoDescription,
}: InfoCardProps) => {
  return (
    <div className="w-full bg-[#13111b]  border border-white/5 flex items-center p-5 rounded-3xl gap-5 transition-all hover:bg-[#181427]">
      
      {/* Container do Ícone: Mais arredondado e com cor suave */}
      <div className="bg-[#1c1829] text-[#a855f7] w-14 h-14 rounded-2xl flex items-center justify-center shrink-0">
        <FontAwesomeIcon icon={icon} className="text-2xl" />
      </div>

      {/* Container do Texto: Alinhamento preciso */}
      <div className="flex flex-col justify-center">
        <span className="text-white font-bold text-3xl tracking-tight leading-tight">
          {infoNumber}
        </span>
        <p className="text-[#8b8a91] text-sm font-medium">
          {infoDescription}
        </p>
      </div>
    </div>
  );
};