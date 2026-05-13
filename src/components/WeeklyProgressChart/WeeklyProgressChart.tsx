import { useId, useMemo } from "react";

export interface PontoSemana {
  rotulo: string;
  horas: number;
}

interface WeeklyProgressChartProps {
  pontos: PontoSemana[];
  /** Altura útil do gráfico em px (sem eixo de rótulos). */
  altura?: number;
}

export function WeeklyProgressChart({ pontos, altura = 200 }: WeeklyProgressChartProps) {
  const gradId = `wk-grad-${useId().replace(/:/g, "")}`;
  const { pathLinha, pathArea, circulos, ticks } = useMemo(() => {
    const n = pontos.length;
    if (n === 0) {
      return { pathLinha: "", pathArea: "", circulos: [] as { x: number; y: number }[], ticks: [] };
    }
    const padX = 24;
    const padY = 16;
    const W = 320;
    const H = altura;
    const valores = pontos.map((p) => p.horas);
    const maxRaw = Math.max(...valores, 0.5);
    const maxY = Math.ceil(maxRaw * 2) / 2;
    const escala = (h: number) => H - padY - (h / maxY) * (H - padY * 2);

    const xs = (i: number) => padX + (i / (n - 1 || 1)) * (W - padX * 2);

    const coords = valores.map((h, i) => ({ x: xs(i), y: escala(h) }));

    const pathLinha = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`).join(" ");
    const baseY = H - padY;
    const pathArea =
      coords.length > 0
        ? `M ${coords[0].x.toFixed(1)} ${baseY} L ${coords.map((c) => `${c.x.toFixed(1)} ${c.y.toFixed(1)}`).join(" L ")} L ${coords[coords.length - 1].x.toFixed(1)} ${baseY} Z`
        : "";

    const ticks = [0, maxY / 2, maxY].map((v) => ({
      v,
      y: escala(v),
      label: v === Math.floor(v) ? `${v}h` : `${v.toFixed(1)}h`,
    }));

    return { pathLinha, pathArea, circulos: coords, ticks };
  }, [pontos, altura]);

  const larguraView = 320;
  const alturaView = altura + 28;

  return (
    <div className="w-full overflow-x-auto">
      <svg
        className="w-full min-w-[280px] max-w-full"
        viewBox={`0 0 ${larguraView} ${alturaView}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Gráfico de horas planejadas por dia da semana"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(147, 51, 234)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="rgb(147, 51, 234)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {ticks.map((t) => (
          <g key={`tick-${t.v}`}>
            <line
              x1="20"
              y1={t.y}
              x2={larguraView - 8}
              y2={t.y}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
            <text x="4" y={t.y + 4} fill="rgba(255,255,255,0.35)" fontSize="9" fontWeight="700">
              {t.label}
            </text>
          </g>
        ))}

        {pathArea ? <path d={pathArea} fill={`url(#${gradId})`} /> : null}
        {pathLinha ? (
          <path
            d={pathLinha}
            fill="none"
            stroke="rgb(192, 132, 252)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : null}

        {circulos.map((c, i) => (
          <g key={i}>
            <circle cx={c.x} cy={c.y} r="5" fill="#0d0a14" stroke="rgb(192, 132, 252)" strokeWidth="2" />
            <title>{`${pontos[i].rotulo}: ${pontos[i].horas.toFixed(1)}h`}</title>
          </g>
        ))}

        {pontos.map((p, i) => {
          const x = 24 + (i / (pontos.length - 1 || 1)) * (larguraView - 48);
          return (
            <text
              key={p.rotulo}
              x={x}
              y={alturaView - 6}
              textAnchor="middle"
              fill="rgba(255,255,255,0.45)"
              fontSize="10"
              fontWeight="800"
              style={{ textTransform: "uppercase" }}
            >
              {p.rotulo}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
