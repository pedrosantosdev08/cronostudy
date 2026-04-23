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

export const DesempenhoPage = () => {
  return (
    <div className="min-h-screen w-full bg-[#0d0a14] flex flex-col items-center px-6 py-10">
      {/* Header com largura máxima controlada e justify-between */}
      <header className="w-full max-w-5xl  flex justify-between items-start mb-10">
        <PagesHeader
          icon={faArrowTrendUp}
          variantColor="#F30A67"
          titleHeader={"Meu Desempenho"}
          descriptionHeader={"Acompanhe sua evolução e estatísticas de estudo"}
        />
      </header>
      <main className="w-full max-w-5xl">
        <section className="grid grid-cols-2 grid-rows-2 gap-5 lg:grid-cols-4 lg:grid-rows-1">
          <InfoCardPages
            variantColorBg="#493322"
            variantColorText="#FFB900"
            icon={faClock}
            infoNumber={0}
            infoDescription={"Horas Totais"}
          />
          <InfoCardPages
            variantColorBg="#163A3B"
            variantColorText="#0E745C"
            icon={faBullseye}
            infoNumber={0}
            infoDescription={"Média Geral"}
          />
          <InfoCardPages
            variantColorBg="#322654"
            variantColorText="#895BF3"
            icon={faCalendarCheck}
            infoNumber={0}
            infoDescription={"Tópicos concluidos"}
          />
          <InfoCardPages
            variantColorBg="#4A2922"
            variantColorText="#EB7D07"
            icon={faFireFlameCurved}
            infoNumber={0}
            infoDescription={"Dias Consecutivos"}
          />
        </section>

        <section className="bg-[#1C192B] mt-10 rounded-2xl h-full p-6">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <h2 className="text-white text-2xl">Horas de Estudo</h2>
              <p className="text-neutral-400">Esta semana</p>
            </div>
            <div className="flex text-neutral-400 gap-1 items-center">
              <FontAwesomeIcon icon={faCalendar} />
              <span>7 Dias</span>
            </div>
          </div>

          {/* Área do Gráfico */}
          <div className="relative h-40 w-full">
            <canvas id="studyChart" className="w-full h-full"></canvas>
          </div>

          {/* Legendas (Fora do Canvas) */}
          <div className="grid grid-cols-7 mt-4 gap-1">
            {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map(
              (dia, index) => (
                <div key={dia} className="flex flex-col items-center">
                  <span className="text-[10px] text-gray-500 mb-1">
                    {/* Exemplo de horas dinâmicas */}
                    {[4.5, 3.2, 5, 2.8, 4, 6.5, 3][index]}h
                  </span>
                  <span
                    className={`text-xs font-medium ${dia === "Dom" ? "text-purple-500" : "text-gray-400"}`}
                  >
                    {dia}
                  </span>
                </div>
              ),
            )}
          </div>
          <span className="block w-full h-px  bg-white/5 mt-4"></span>
          <div className="flex justify-between mt-2">
            <div>
              <h3 className="text-neutral-400">Total da semana</h3>
              <span className="text-white text-2xl font-bold">29.0h</span>
            </div>
            <div>
              <h3 className="text-neutral-400">Média diária</h3>
              <span className="text-white text-2xl font-bold">4.1h</span>
            </div>
            <div>
              <h3 className="text-neutral-400">Melhor dia</h3>
              <span className="text-[#8B5CF6] text-2xl font-bold ">6.5h</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
