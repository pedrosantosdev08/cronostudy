import {
  faBolt,
  faBullseye,
  faCalendar,
  faClock,
  faFireFlameCurved,
} from "@fortawesome/free-solid-svg-icons";

export const INFOCARD_DATA = [
  {
    id: 1,
    icon: faFireFlameCurved,
    infoNumber: 7,
    infoDescription: "Dias consecutivos",
  },
  {
    id: 2,
    icon: faClock,
    infoNumber: "24h",
    infoDescription: "Horas esta semana",
  },
  {
    id: 3,
    icon: faBullseye,
    infoNumber: "85%",
    infoDescription: "Meta diária",
  },
  {
    id: 4,
    icon: faBolt,
    infoNumber: 2.45,
    infoDescription: "Pontos XPs",
  },
];

export const NAVIGATIONCARD_DATA = [
  {
    id: 1,
    icon: faCalendar,
    title: "Horário Semanal",
    description: "Organize sua semana de estudos com blocos de energia",
    label: "Sessões esta semana",
    progress: 12,
    variantColor: "#9019FC",
    path: "/cronograma"
  },
  {
    id: 2,
    icon: faCalendar,
    title: "Conteúdos",
    description: "Acesse materiais e recursos de estudos organizados",
    label: "Sessões esta semana",
    progress: 48,
    variantColor: "#007CDA",
    path: "/conteudos"
  },
  {
    id: 3,
    icon: faCalendar,
    title: "Checklist de Assusntos",
    description: "Acompanhe o progresso em cada materia",
    label: "Sessões esta semana",
    progress: 67,
    variantColor: "#00AB60",
    path: "/checklist"
  },
  {
    id: 4,
    icon: faCalendar,
    title: "Minhas redações",
    description: "Pratique e revise suas redações",
    label: "Sessões esta semana",
    progress: 8,
    variantColor: "#FF8300",
    path: "/redacoes"
  },
  {
    id: 5,
    icon: faCalendar,
    title: "Meu Desempenho",
    description: "Visualize estatísticas e evolução nos estudos",
    label: "Sessões esta semana",
    progress: 8.4,
    variantColor: "#F30A67",
    path: "/desempenho"
  },
];


export const INFOCARDPAGES_DATA = [
    {
        id: 1,
        infoNumber: 4,
        infoDescription: "Matérias"
    },
    {
        id: 2,
        infoNumber: 5,
        infoDescription: "Dias Ativos"
    },
    {
        id: 3,
        infoNumber: 3,
        infoDescription: "Horas Totais"
    },
]

