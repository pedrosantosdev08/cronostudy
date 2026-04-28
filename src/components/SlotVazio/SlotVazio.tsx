import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SlotVazioProps {
  onClick?: () => void;
}

export const SlotVazio = ({ onClick }: SlotVazioProps) => {
  return (
    <button 
      onClick={onClick}
      className="w-full h-20 rounded-2xl border-2 border-dashed border-white/5 flex justify-center items-center transition-all duration-300 hover:bg-white/5 hover:border-white/20 group"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white/5 flex justify-center items-center group-hover:bg-purple-600 transition-colors">
          <FontAwesomeIcon icon={faPlus} className="text-white text-xs" />
        </div>
        <span className="text-white/20 font-bold text-xs tracking-widest group-hover:text-white/40">ADICIONAR MATÉRIA</span>
      </div>
    </button>
  );
};