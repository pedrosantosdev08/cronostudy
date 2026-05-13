import { useMemo } from "react";
import {
  faArrowTrendUp,
  faBullseye,
  faCalendar,
  faCircleCheck,
  faClock,
  faFileLines,
  faFireFlameCurved,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { InfoCardPages } from "../components/InfoCardPages/InfoCardPages";
import { PagesHeader } from "../components/PagesHeader/PagesHeader";
import { WeeklyProgressChart } from "../components/WeeklyProgressChart/WeeklyProgressChart";
import { useStore } from "../hooks/useStore";
import { getSemanaCorrenteDiasCompleto } from "../lib/calendarWeek";
import { parseTempoExibicaoParaHoras } from "../lib/parseEstudoTempo";

export const DesempenhoPage = () => {
  const horasSemana = useStore((s) => s.horasSemana);
  const xp = useStore((s) => s.xp);
  const materias = useStore((s) => s.materias);
  const diasConsecutivos = useStore((s) => s.diasConsecutivos);
  const redacoes = useStore((s) => s.redacoes);
  const redacoesCorrigidas = useStore((s) => s.redacoesCorrigidas);

  const semanaLayout = useMemo(() => getSemanaCorrenteDiasCompleto(), []);

  const pontosSemana = useMemo(() => {
    const porChave = new Map<string, number>();
    for (const d of semanaLayout) {
      porChave.set(d.name, 0);
    }
    for (const m of materias) {
      if (!porChave.has(m.dia)) continue;
      const h = parseTempoExibicaoParaHoras(m.tempo);
      porChave.set(m.dia, (porChave.get(m.dia) ?? 0) + h);
    }
    return semanaLayout.map((d) => ({
      rotulo: d.fullName.slice(0, 3).replace(/^./, (c) => c.toUpperCase()),
      horas: porChave.get(d.name) ?? 0,
    }));
  }, [materias, semanaLayout]);

  const totalHorasCronograma = useMemo(
    () => pontosSemana.reduce((acc, p) => acc + p.horas, 0),
    [pontosSemana],
  );

  const mediaDiaria = useMemo(() => {
    const base = horasSemana > 0 ? horasSemana : totalHorasCronograma;
    return (base / 7).toFixed(1);
  }, [horasSemana, totalHorasCronograma]);

  const xpExibicao = Math.round(xp * 10) / 10;
  const horasExibicao = Math.round(horasSemana * 10) / 10;
  const picoSemanal = useMemo(() => Math.max(...pontosSemana.map((p) => p.horas), 0), [pontosSemana]);

  return (
    <div className="min-h-screen w-full bg-[#0d0a14] flex flex-col items-center">
      <div className="w-full max-w-5xl px-4 py-6 md:px-8 md:py-12 flex flex-col gap-8">
        <header className="w-full flex justify-between items-start">
          <PagesHeader
            icon={faArrowTrendUp}
            variantColor="#F30A67"
            titleHeader="Meu Desempenho"
            descriptionHeader="Dados do cronograma, XP e streak (sincronizados com sua conta)"
          />
        </header>

        <main className="w-full flex flex-col gap-8">
          <section className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <InfoCardPages
              variantColorBg="#493322"
              variantColorText="#FFB900"
              icon={faClock}
              infoNumber={horasExibicao}
              infoDescription="Horas no cronograma"
            />
            <InfoCardPages
              variantColorBg="#163A3B"
              variantColorText="#10B981"
              icon={faBullseye}
              infoNumber={xpExibicao}
              infoDescription="XP total"
            />
            <InfoCardPages
              variantColorBg="#322654"
              variantColorText="#895BF3"
              icon={faCalendar}
              infoNumber={materias.length}
              infoDescription="Matérias agendadas"
            />
            <InfoCardPages
              variantColorBg="#4A2922"
              variantColorText="#EB7D07"
              icon={faFireFlameCurved}
              infoNumber={diasConsecutivos}
              infoDescription="Streak (dias)"
            />
            <InfoCardPages
              variantColorBg="#1e2a4a"
              variantColorText="#60A5FA"
              icon={faFileLines}
              infoNumber={redacoes.length}
              infoDescription="Redações em andamento"
            />
            <InfoCardPages
              variantColorBg="#1a3d2e"
              variantColorText="#34D399"
              icon={faCircleCheck}
              infoNumber={redacoesCorrigidas.length}
              infoDescription="Redações corrigidas"
            />
          </section>

          <section className="bg-[#1C192B] rounded-[2rem] border border-white/5 p-6 md:p-10 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
              <div>
                <h2 className="text-white text-xl md:text-2xl font-bold">Carga por dia da semana</h2>
                <p className="text-neutral-500 text-sm font-medium mt-1">
                  Linha de progresso com horas planejadas (soma das matérias por dia)
                </p>
              </div>
              <div className="flex bg-white/5 px-4 py-2 rounded-xl text-neutral-400 gap-2 items-center text-sm border border-white/5 shrink-0">
                <FontAwesomeIcon icon={faCalendar} className="text-purple-500" />
                <span>Semana atual</span>
              </div>
            </div>

            <WeeklyProgressChart pontos={pontosSemana} altura={200} />

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-10 pt-8 border-t border-white/5">
              <div className="flex flex-col gap-1">
                <h3 className="text-neutral-500 text-[10px] md:text-xs font-black uppercase tracking-widest">
                  Total semanal
                </h3>
                <span className="text-white text-xl md:text-2xl font-black">{horasExibicao}h</span>
              </div>
              <div className="flex flex-col gap-1 sm:border-l border-white/5 sm:pl-4">
                <h3 className="text-neutral-500 text-[10px] md:text-xs font-black uppercase tracking-widest">
                  Média por dia
                </h3>
                <span className="text-white text-xl md:text-2xl font-black">{mediaDiaria}h</span>
              </div>
              <div className="flex flex-col gap-1 sm:border-l border-white/5 sm:pl-4 col-span-2 sm:col-span-1">
                <h3 className="text-neutral-500 text-[10px] md:text-xs font-black uppercase tracking-widest">
                  Dia com mais horas
                </h3>
                <span className="text-white text-xl md:text-2xl font-black">
                  {Math.round(picoSemanal * 10) / 10}h
                </span>
              </div>
            </div>
          </section>
        </main>
      </div>

      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-900/10 blur-[120px] pointer-events-none -z-10 rounded-full" />
    </div>
  );
};
