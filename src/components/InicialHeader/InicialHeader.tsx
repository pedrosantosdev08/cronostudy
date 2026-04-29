import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoCronoStudy from "../../assets/favicon-32x32.png";

interface InicialHeaderProps {
  onOpenMenu: () => void; // Prop para avisar o pai (Page) que o menu deve abrir
}

export const InicialHeader = ({ onOpenMenu }: InicialHeaderProps) => {
  return (
    <header className="flex justify-between items-center p-4 border-b border-b-neutral-800 bg-[#0A0A0F] rounded-2xl lg:rounded-3xl">
      <div className="flex items-center gap-3">
        <img src={LogoCronoStudy} alt="Logo do CronoStudy" className="w-8 h-8" />
        <span className="text-white text-xl font-black italic tracking-tighter uppercase">
          CronoStudy
        </span>
      </div>
      
      <button
        className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all active:scale-90 shadow-xl"
        onClick={onOpenMenu}
        aria-label="Abrir menu"
      >
        <FontAwesomeIcon
          icon={faBars}
          className="text-white text-xl"
        />
      </button>
    </header>
  );
};