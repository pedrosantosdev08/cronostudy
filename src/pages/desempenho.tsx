import {
  faArrowTrendUp,
  faBullseye,
  faCalendar,
  faCalendarCheck,
  faClock,
  faFireFlameCurved,
} from "@fortawesome/free-solid-svg-icons";
import { PagesHeader } from "../components/PagesHeader/PagesHeader";
import { InfoCardPages } from "../components/InfoCardPages/InfoCardPages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStore } from "../hooks/useStore";

export const DesempenhoPage = () => {
  const { horasSemana, xp, materias, diasConsecutivos } = useStore();

  const mediaDiaria = (horasSemana / 7).toFixed(1);
  const tópicosConcluidos = materias.length; // Ou use uma lógica de checklist se tiver

  // Lógica para simular o gráfico baseado nas matérias do store por dia
  const diasSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
  const dadosMockados = [4.5, 3.2, 5, 2.8, 4, 6.5, 3]; // Substituir por lógica real de horas/dia no futuro
  const melhorHora = Math.max(...dadosMockados);

  return (
    <div className="min-h-screen w-full bg-[#0d0a14] flex flex-col items-center">
      {/* Container Principal */}
      <div className="w-full max-w-5xl px-4 py-6 md:px-8 md:py-12 flex flex-col gap-8">
        <header className="w-full flex justify-between items-start">
          <PagesHeader
            icon={faArrowTrendUp}
            variantColor="#F30A67"
            titleHeader={"Meu Desempenho"}
            descriptionHeader={"Acompanhe sua evolução e estatísticas"}
          />
        </header>

        <main className="w-full">
          {/* Cards de Estatísticas - Grid Responsivo */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <InfoCardPages
              variantColorBg="#493322"
              variantColorText="#FFB900"
              icon={faClock}
              infoNumber={horasSemana}
              infoDescription={"Horas Totais"}
            />
            <InfoCardPages
              variantColorBg="#163A3B"
              variantColorText="#10B981"
              icon={faBullseye}
              infoNumber={xp}
              infoDescription={"XP Total"}
            />
            <InfoCardPages
              variantColorBg="#322654"
              variantColorText="#895BF3"
              icon={faCalendarCheck}
              infoNumber={tópicosConcluidos}
              infoDescription={"Matérias"}
            />
            <InfoCardPages
              variantColorBg="#4A2922"
              variantColorText="#EB7D07"
              icon={faFireFlameCurved}
              infoNumber={diasConsecutivos}
              infoDescription={"Streak"}
            />
          </section>

          {/* Card do Gráfico */}
          <section className="bg-[#1C192B] mt-8 rounded-[2rem] border border-white/5 p-6 md:p-10 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <div className="flex flex-col">
                <h2 className="text-white text-xl md:text-2xl font-bold">
                  Frequência Semanal
                </h2>
                <p className="text-neutral-500 text-sm font-medium">
                  Distribuição de carga horária
                </p>
              </div>
              <div className="hidden md:flex bg-white/5 px-4 py-2 rounded-xl text-neutral-400 gap-2 items-center text-sm border border-white/5">
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="text-purple-500"
                />
                <span>Últimos 7 Dias</span>
              </div>
            </div>

            {/* Visualização de Barras Custom (Substituindo Canvas vazio) */}
            <div className="flex items-end justify-between h-48 w-full gap-2 px-2">
              {dadosMockados.map((hora, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-3 group"
                >
                  <div className="relative w-full flex justify-center items-end h-full">
                    {/* Tooltip on hover */}
                    <span className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-purple-600 text-white text-[10px] px-2 py-1 rounded-md font-bold mb-2">
                      {hora}h
                    </span>
                    {/* Barra */}
                    <div
                      style={{ height: `${(hora / melhorHora) * 100}%` }}
                      className={`w-full max-w-[32px] rounded-t-lg transition-all duration-500 group-hover:brightness-125 ${
                        hora === melhorHora
                          ? "bg-gradient-to-t from-purple-600 to-fuchsia-500"
                          : "bg-white/10"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-[10px] md:text-xs font-bold uppercase tracking-tighter ${diasSemana[i] === "Dom" ? "text-fuchsia-500" : "text-neutral-500"}`}
                  >
                    {diasSemana[i]}
                  </span>
                </div>
              ))}
            </div>

            {/* Rodapé do Card de Desempenho */}
            <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-white/5">
              <div className="flex flex-col gap-1">
                <h3 className="text-neutral-500 text-[10px] md:text-xs font-black uppercase tracking-widest">
                  Total
                </h3>
                <span className="text-white text-xl md:text-2xl font-black">
                  {horasSemana}h
                </span>
              </div>
              <div className="flex flex-col gap-1 border-x border-white/5 px-4">
                <h3 className="text-neutral-500 text-[10px] md:text-xs font-black uppercase tracking-widest">
                  Média
                </h3>
                <span className="text-white text-xl md:text-2xl font-black">
                  {mediaDiaria}h
                </span>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Glow Effect */}
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-900/10 blur-[120px] pointer-events-none -z-10 rounded-full" />
    </div>
  );
};
