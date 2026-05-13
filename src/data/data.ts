import {
  faArrowTrendUp,
  faBolt,
  faBookOpen,
  faBullseye,
  faCalendar,
  faClock,
  faFileLines,
  faFireFlameCurved,
} from "@fortawesome/free-solid-svg-icons";

export const INFOCARD_DATA = [
  {
    id: 1,
    icon: faFireFlameCurved,
    infoDescription: "Dias consecutivos",
  },
  {
    id: 2,
    icon: faClock,
    infoDescription: "Horas esta semana",
  },
  {
    id: 3,
    icon: faBullseye,
    infoDescription: "Meta diária",
  },
  {
    id: 4,
    icon: faBolt,
    infoDescription: "Pontos XPs",
  },
];

export const INICIALCARD = [
{
  id:1,
  icon: faCalendar,
  title: "Horário Semanal",
  infoDescription: "Organize seus estudos com um cronograma semanal personalizado. Visualize todas as suas atividades de forma clara e eficiente."
},
{
  id:2,
  icon: faArrowTrendUp,
  title: "Análise de Desempenho",
  infoDescription: "Acompanhe seu progresso com gráficos detalhados e métricas de desempenho. Identifique pontos fortes e áreas para melhorar."
},
{
  id:3,
  icon: faBookOpen,
  title: "Biblioteca de Conteúdos",
  infoDescription: "Acesse materiais de estudo organizados por disciplina. Tudo que você precisa em um só lugar."
},
{
  id:4,
  icon: faFileLines,
  title: "Controle de Redações",
  infoDescription: "Gerencie suas redações, acompanhe correções e melhore sua escrita de forma consistente."
},
]

export const NAVIGATIONCARD_DATA = [
  {
    id: 1,
    icon: faCalendar,
    title: "Horário Semanal",
    description: "Organize sua semana de estudos com blocos de energia",
    label: "Sessões esta semana",
    variantColor: "#9019FC",
    path: "/cronograma",
  },
  {
    id: 2,
    icon: faBookOpen,
    title: "Conteúdos",
    description: "Acesse materiais e recursos de estudos organizados",
    label: "Sessões esta semana",
    variantColor: "#007CDA",
    path: "/conteudos",
  },
  
  {
    id: 3,
    icon: faFileLines,
    title: "Minhas redações",
    description: "Pratique e revise suas redações",
    label: "Sessões esta semana",
    variantColor: "#FF8300",
    path: "/redacoes",
  },
  {
    id: 4,
    icon: faArrowTrendUp,
    title: "Meu Desempenho",
    description: "Visualize estatísticas e evolução nos estudos",
    label: "Sessões esta semana",
    variantColor: "#F30A67",
    path: "/desempenho",
  },
];

export const INFOCARDPAGES_DATA = [
  {
    id: 1,
    infoNumber: 4,
    infoDescription: "Matérias",
  },
  {
    id: 2,
    infoNumber: 5,
    infoDescription: "Dias Ativos",
  },
  {
    id: 3,
    infoNumber: 3,
    infoDescription: "Horas Totais",
  },
];
