import { useState } from "react";
import {
  faCircleCheck,
  faFileLines,
  faMedal,
  faPlus,
  faXmark,
  faDownload,
  faCheck,
  faTrash, // Adicionei para um visual melhor no histórico
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PagesHeader } from "../components/PagesHeader/PagesHeader";
import { InfoCardPages } from "../components/InfoCardPages/InfoCardPages";
import { FormRedacao } from "../components/FormRedacao/FormRedacao";
import { useStore, type Redacao } from "../hooks/useStore";

export const RedacaoPage = () => {
  const [formRedacaoOpen, setFormRedacaoOpen] = useState<boolean>(false);
  const [redacaoSelecionada, setRedacaoSelecionada] = useState<Redacao | null>(
    null,
  );

  const {
    redacoes,
    redacoesCorrigidas,
    adicionarRedacao,
    removerRedacao,
    corrigirRedacao,
  } = useStore();

  const notaMedia: number =
    redacoesCorrigidas.length > 0
      ? Number(
          (
            redacoesCorrigidas.reduce(
              (acc, curr) => acc + (curr.nota || 0),
              0,
            ) / redacoesCorrigidas.length
          ).toFixed(0),
        )
      : 0;

  const handleSaveRedacao = (dados: {
    titulo: string;
    tema: string;
    arquivo: File;
  }) => {
    const novaRedacao: Redacao = {
      id: Date.now(),
      titulo: dados.titulo,
      tema: dados.tema,
      data: new Date().toLocaleDateString("pt-BR"),
      arquivoReal: dados.arquivo,
      corrigida: false,
    };
    adicionarRedacao(novaRedacao);
    setFormRedacaoOpen(false);
  };

  const baixarArquivo = (file: File) => {
    try {
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name || "redacao.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Erro ao baixar arquivo", e);
    }
  };

  const handleCorrigir = (id: number) => {
    const nota = prompt("Qual nota você tirou nesta redação? (0-1000)");

    
    if (nota !== null && nota.trim() !== "") {
      const notaNum = Number(nota);

       
      if (!isNaN(notaNum) && notaNum >= 0 && notaNum <= 1000) {
        corrigirRedacao(id, notaNum);
        setRedacaoSelecionada(null);
      } else {
        
        alert("Por favor, insira uma nota válida entre 0 e 1000.");
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0d0a14] flex flex-col items-center px-6 py-10 text-white font-sans">
      {formRedacaoOpen && (
        <FormRedacao
          onClose={() => setFormRedacaoOpen(false)}
          onSave={handleSaveRedacao}
        />
      )}

      {/* MODAL DE DETALHES */}
      {redacaoSelecionada && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-[#1a1625] w-full max-w-xl p-8 rounded-[2.5rem] border border-[#322654] relative shadow-2xl">
            <button
              onClick={() => setRedacaoSelecionada(null)}
              className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors"
            >
              <FontAwesomeIcon icon={faXmark} size="lg" />
            </button>

            <h2 className="text-3xl font-black mb-8 italic uppercase tracking-tighter">
              Detalhes
            </h2>

            <div className="space-y-6">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <label className="text-gray-500 text-[10px] font-black uppercase mb-2 block tracking-widest">
                  Título
                </label>
                <p className="text-xl font-bold">{redacaoSelecionada.titulo}</p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() =>
                    redacaoSelecionada.arquivoReal &&
                    baixarArquivo(redacaoSelecionada.arquivoReal)
                  }
                  className="flex-1 bg-white/5 hover:bg-white/10 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 border border-white/10"
                >
                  <FontAwesomeIcon icon={faDownload} /> PDF
                </button>
                <button
                  onClick={() => handleCorrigir(redacaoSelecionada.id)}
                  className="flex-[2] bg-purple-600 hover:bg-purple-500 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-purple-900/40"
                >
                  <FontAwesomeIcon icon={faCheck} /> Corrigir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="w-full max-w-5xl flex flex-col lg:flex-row justify-between mb-10 gap-6">
        <PagesHeader
          variantColor="#FF8300"
          titleHeader="Minhas Redações"
          descriptionHeader="Pratique sua escrita"
          icon={faFileLines}
        />
        <button
          onClick={() => setFormRedacaoOpen(true)}
          className="bg-purple-600 px-8 h-14 text-white font-bold rounded-2xl flex items-center gap-3 hover:bg-purple-500 shadow-lg shadow-purple-900/20 transition-all"
        >
          <FontAwesomeIcon icon={faPlus} /> Nova Redação
        </button>
      </header>

      <main className="w-full max-w-5xl space-y-12">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <InfoCardPages
            variantColorBg="#493322"
            variantColorText="#FFB900"
            icon={faFileLines}
            infoNumber={redacoes.length}
            infoDescription="Pendentes"
          />
          <InfoCardPages
            variantColorBg="#163A3B"
            variantColorText="#10B981"
            icon={faCircleCheck}
            infoNumber={redacoesCorrigidas.length}
            infoDescription="Corrigidas"
          />
          <InfoCardPages
            variantColorBg="#322654"
            variantColorText="#895BF3"
            icon={faMedal}
            infoNumber={notaMedia}
            infoDescription="Nota Média"
          />
        </section>

        {/* LISTA EM ABERTO */}
        <section>
          <h2 className="text-2xl font-black mb-6">Em aberto</h2>
          <div className="flex flex-col gap-4">
            {redacoes.length > 0 ? (
              redacoes.map((red) => (
                <div
                  key={red.id}
                  className="bg-[#1a1625] border border-white/5 p-6 rounded-3xl flex justify-between items-center group"
                >
                  <div>
                    <h3 className="font-bold text-lg group-hover:text-purple-400 transition-colors">
                      {red.titulo}
                    </h3>
                    <p className="text-xs text-gray-500 uppercase font-black">
                      {red.tema} • {red.data}
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => setRedacaoSelecionada(red)}
                      className="bg-white/5 hover:bg-purple-600 px-6 py-2 rounded-xl font-bold transition-all text-sm"
                    >
                      Visualizar
                    </button>
                    <button
                      onClick={() => removerRedacao(red.id)}
                      className="text-red-500/40 hover:text-red-500 transition-colors p-2"
                    >
                      <FontAwesomeIcon icon={faTrash} size="sm" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 italic text-sm">Nada por aqui...</p>
            )}
          </div>
        </section>

        {/* HISTÓRICO */}
        {redacoesCorrigidas.length > 0 && (
          <section>
            <h2 className="text-2xl font-black mb-6 text-emerald-500">
              Histórico
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {redacoesCorrigidas.map((red) => (
                <div
                  key={red.id}
                  className="bg-white/5 border border-white/5 p-5 rounded-2xl flex justify-between items-center"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-500 font-black">
                      {red.nota}
                    </div>
                    <h4 className="font-bold">{red.titulo}</h4>
                  </div>
                  <div className="flex items-center gap-4">
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="text-emerald-500"
                    />
                    {/* CORREÇÃO AQUI: Usando o 'red.id' do map e arrow function */}
                    <button
                      onClick={() => removerRedacao(red.id)}
                      className="text-red-500/40 hover:text-red-500 transition-colors p-2"
                    >
                      <FontAwesomeIcon icon={faTrash} size="sm" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
