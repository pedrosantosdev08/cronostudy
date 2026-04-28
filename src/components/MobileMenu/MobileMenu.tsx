import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faClock, faBook, faFire } from "@fortawesome/free-solid-svg-icons";
import { useStore } from "../../hooks/useStore";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { materias, horasSemana, diasConsecutivos, xp } = useStore();

  const totalMaterias = materias.length;

  const dataAtual = new Date();
  const primeiroDia = new Date(dataAtual.setDate(dataAtual.getDate() - dataAtual.getDay())).toLocaleDateString("pt-BR", { day: 'numeric', month: 'short' });
  const ultimoDia = new Date(dataAtual.setDate(dataAtual.getDate() - dataAtual.getDay() + 6)).toLocaleDateString("pt-BR", { day: 'numeric', month: 'short' });

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        aria-label="Estatísticas do Cronograma"
        aria-hidden={!isOpen}
        className={`fixed top-0 right-0 h-full w-80 bg-[#161223] border-l border-white/10 z-[70] p-8 shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-white font-bold text-xl">Resumo</h2>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors cursor-pointer"
            aria-label="Fechar menu"
          >
            <FontAwesomeIcon icon={faXmark} size="lg" />
          </button>
        </div>

        <div className="flex flex-col gap-8">
          <section>
            <h3 className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
              Período Atual
            </h3>
            <div className="flex items-center gap-3 text-white">
              <time className="text-lg font-semibold capitalize">
                {primeiroDia} — {ultimoDia}
              </time>
            </div>
          </section>

          <div className="h-px w-full bg-white/5" />

          <div className="grid grid-cols-1 gap-6">
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center text-purple-500">
                <FontAwesomeIcon icon={faClock} />
              </div>
              <div>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Horas Semanais</p>
                <p className="text-white text-xl font-black">{horasSemana}H</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-500">
                <FontAwesomeIcon icon={faBook} />
              </div>
              <div>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Total Matérias</p>
                <p className="text-white text-xl font-black">{totalMaterias}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-orange-600/20 flex items-center justify-center text-orange-500">
                <FontAwesomeIcon icon={faFire} />
              </div>
              <div>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Ofensiva</p>
                <p className="text-white text-xl font-black">{diasConsecutivos} dias</p>
              </div>
            </div>
          </div>

          <div className="mt-4 p-6 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl shadow-lg shadow-purple-900/20">
            <p className="text-purple-200 text-[10px] font-black uppercase tracking-widest mb-1">XP Acumulado</p>
            <p className="text-white text-3xl font-black">{Number(xp || 0).toFixed(2)}</p>
            <div className="w-full bg-black/20 h-1.5 rounded-full mt-4 overflow-hidden">
              <div 
                className="bg-white h-full transition-all duration-1000" 
                style={{ width: `${Math.min((xp % 1) * 100, 100)}%` }} 
              />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};