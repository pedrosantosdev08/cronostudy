import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface sla {
    onClick?: ()=> void;
}

export const SlotVazio = ({onClick}:sla) => {
  return (
    <div onClick={onClick}>
      <div className="w-20 h-20 rounded-2xl p-10 border-2 border-dashed border-white/10 flex justify-center items-center m-3 transition hover:bg-white/20">
        <FontAwesomeIcon icon={faPlus} className="text-white" />
      </div>
    </div>
  );
};
