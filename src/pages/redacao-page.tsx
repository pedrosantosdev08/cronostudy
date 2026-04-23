import { useState } from "react";
import {
  faCircleCheck,
  faFileLines,
  faMedal,
  faPlus,
  faXmark,
  faCalendarDays,
  faTag,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PagesHeader } from "../components/PagesHeader/PagesHeader";
import { InfoCardPages } from "../components/InfoCardPages/InfoCardPages";
import { FormRedacao } from "../components/FormRedacao/FormRedacao";
import { useStore } from "../hooks/useStore";

interface RedacaoItem {
  id: number;
  titulo: string;
  tema: string;
  data: string;
  arquivoReal: File | null;
}

export const RedacaoPage = () => {
  const [formRedacaoOpen, setFormRedacaoOpen] = useState(false);
  const [redacaoSelecionada, setRedacaoSelecionada] = useState<RedacaoItem | null>(null);

  // Consumindo Zustand Store
  const redacoes = useStore((state) => state.redacoes);
  const adicionarRedacaoStore = useStore((state) => state.adicionarRedacao);
  const removerRedacaoStore = useStore((state) => state.removerRedacao);

  const handleSaveRedacao = (dados: {
    titulo: string;
    tema: string;
    arquivo: File;
  }) => {
    const novaRedacao = {
      id: Date.now(),
      titulo: dados.titulo,
      tema: dados.tema,
      data: new Date().toLocaleDateString("pt-BR"),
      arquivoReal: dados.arquivo,
    };

    adicionarRedacaoStore(novaRedacao);
    setFormRedacaoOpen(false);
  };

  const baixarArquivo = (file: File) => {
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleRemove = (id?: number) => {
    // Se um ID for passado (pelo card), usa ele. Caso contrário, usa o da redação selecionada no modal.
    const idParaRemover = id || redacaoSelecionada?.id;

    if (!idParaRemover) return;

    removerRedacaoStore(idParaRemover);

    // Se a redação que estamos removendo for a que está aberta no modal, fechamos o modal
    if (redacaoSelecionada?.id === idParaRemover) {
      setRedacaoSelecionada(null);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0d0a14] flex flex-col items-center px-6 py-10 text-white">
      {formRedacaoOpen && (
        <FormRedacao
          onClose={() => setFormRedacaoOpen(false)}
          onSave={handleSaveRedacao}
        />
      )}

      {/* MODAL DE DETALHES */}
      {redacaoSelecionada && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-[#1a1625] w-full max-w-xl p-8 rounded-3xl border border-[#322654] relative shadow-2xl">
            <button
              onClick={() => setRedacaoSelecionada(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white"
            >
              <FontAwesomeIcon icon={faXmark} size="xl" />
            </button>
            
            <h2 className="text-3xl font-bold mb-6 text-[#8B5CF6]">Detalhes</h2>
            
            <div className="space-y-6">
              <div>
                <label className="text-gray-500 text-sm block mb-1">Título</label>
                <p className="text-xl font-semibold">{redacaoSelecionada.titulo}</p>
              </div>

              <div className="flex gap-10 justify-between items-end">
                <div>
                  <label className="text-gray-500 text-sm block mb-1">
                    <FontAwesomeIcon icon={faTag} /> Tema
                  </label>
                  <p className="font-medium">{redacaoSelecionada.tema}</p>
                </div>
                <div>
                  <label className="text-gray-500 text-sm block mb-1">
                    <FontAwesomeIcon icon={faCalendarDays} /> Data
                  </label>
                  <p className="font-medium">{redacaoSelecionada.data}</p>
                </div>
                
                <button
                  className="text-2xl cursor-pointer hover:text-[#8B5CF6] transition-colors p-2"
                  title="Baixar Redação"
                  onClick={() => {
                    if (redacaoSelecionada.arquivoReal) {
                      baixarArquivo(redacaoSelecionada.arquivoReal);
                    } else {
                      alert("Arquivo não disponível nesta sessão.");
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faDownload} />
                </button>
              </div>

              <div className="pt-4 border-t border-[#322654]">
                <button
                  onClick={() => handleRemove()}
                  className="text-red-500 text-sm font-bold hover:underline"
                >
                  Excluir esta redação
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <header className="w-full max-w-5xl flex flex-col lg:flex-row lg:items-center justify-between mb-10">
        <PagesHeader
          variantColor={"#FF8300"}
          titleHeader={"Minhas Redações"}
          descriptionHeader={"Pratique e acompanhe"}
          icon={faFileLines}
        />
        <button
          onClick={() => setFormRedacaoOpen(true)}
          className="bg-[#8B5CF6] px-6 h-12 text-white font-bold rounded-2xl flex items-center gap-2 mt-5 hover:bg-[#7c4dff] transition-colors"
        >
          <FontAwesomeIcon icon={faPlus} /> Nova Redação
        </button>
      </header>

      <main className="w-full max-w-5xl">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <InfoCardPages
            variantColorBg="#493322"
            variantColorText="#FFB900"
            icon={faFileLines}
            infoNumber={redacoes.length}
            infoDescription={"Total de redações"}
          />
          <InfoCardPages
            variantColorBg="#163A3B"
            variantColorText="#0E745C"
            icon={faCircleCheck}
            infoNumber={0}
            infoDescription={"Redações Corrigidas"}
          />
          <InfoCardPages
            variantColorBg="#322654"
            variantColorText="#895BF3"
            icon={faMedal}
            infoNumber={0}
            infoDescription={"Nota Média"}
          />
        </section>

        {/* Upload das redações */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Suas Redações</h2>
          <div className="flex flex-col gap-4">
            {redacoes.length > 0 ? (
              redacoes.map((red) => (
                <div
                  key={red.id}
                  className="bg-[#1a1625] relative border border-[#322654] p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-[#8B5CF6] transition-all group"
                >
                  <div className="flex flex-col gap-1 relative">
                    <h3 className="text-white font-bold text-xl group-hover:text-[#8B5CF6] transition-colors">
                      {red.titulo}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {red.tema} • {red.data}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 ">
                    <button
                      onClick={() => setRedacaoSelecionada(red as any)}
                      className="bg-[#322654] hover:bg-[#8B5CF6] text-white px-6 py-2 rounded-xl font-bold transition-colors text-sm"
                    >
                      Ver Detalhes
                    </button>
                    
                    <button
                      onClick={() => handleRemove(red.id)}
                      className="text-gray-500 hover:text-red-500 transition-all p-2 absolute top-5 right-5 hover:scale-100"
                      title="Excluir"
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 border-2 border-dashed border-[#322654] rounded-3xl">
                <p className="text-gray-500 italic">
                  Nenhuma redação enviada ainda.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};