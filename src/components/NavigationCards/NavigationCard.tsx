import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

interface NavigationCardProps {
  icon: IconDefinition;
  title: string;
  description: string;
  label: string;
  progress: number;
  variantColor?: string;
  path: string;
}

export const NavigationCard = ({
  icon,
  title,
  label,
  description,
  progress,
  variantColor,
  path,
}: NavigationCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-full bg-radial-[at_50%_75%] from-[#1C192B] border border-white/5 rounded-4xl p-6 flex flex-col gap-5 transition-all hover:bg-[#1c172e] cursor-pointer"
      onClick={()=> navigate(path)}
    >
      {/* 1. Ícone com Gradiente */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${variantColor} 0%, #1e1b4b 100% )`,
        }}
      >
        <FontAwesomeIcon icon={icon} className="text-white text-2xl" />
      </div>

      {/* 2. Textos Principais */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 group cursor-pointer">
          <h3 className="text-white text-xl font-bold">{title}</h3>
          <FontAwesomeIcon
            icon={faChevronRight}
            className="text-white/40 text-sm group-hover:translate-x-1 transition-transform"
          />
        </div>
        <p className="text-gray-400 text-sm leading-relaxed max-w-[90%]">
          {description}
        </p>
      </div>

      {/* 3. Linha Divisória sutil */}
      <div className="h-[1px] w-full bg-white/5 mt-2" />

      {/* 4. Rodapé (Label e Progress) */}
      <div className="flex justify-between items-center">
        <p className="text-gray-500 text-sm font-medium">{label}</p>
        <span className="text-xl font-bold" style={{ color: variantColor }}>
          {progress}
        </span>
      </div>
    </div>
  );
};
