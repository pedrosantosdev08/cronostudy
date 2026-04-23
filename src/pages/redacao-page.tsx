import { useState } from "react";
import {
  faCircleCheck,
  faFileLines,
  faMedal,
  faPlus,
  faPaperclip,
  faXmark,
  faCalendarDays,
  faTag,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PagesHeader } from "../components/PagesHeader/PagesHeader";
import { InfoCardPages } from "../components/InfoCardPages/InfoCardPages";
import { FormRedacao } from "../components/FormRedacao/FormRedacao";

interface RedacaoItem {
  id: number;
  titulo: string;
  tema: string;
  data: string;
  arquivoReal: File | null; // Agora salvamos o arquivo real aqui
}

export const RedacaoPage = () => {
  const [formRedacaoOpen, setFormRedacaoOpen] = useState(false);
  const [redacaoSelecionada, setRedacaoSelecionada] =
    useState<RedacaoItem | null>(null);
  const [redacoes, setRedacoes] = useState<RedacaoItem[]>([]);

  const handleSaveRedacao = (dados: {
    titulo: string;
    tema: string;
    arquivo: File;
  }) => {
    const novaRedacao: RedacaoItem = {
      id: Date.now(),
      titulo: dados.titulo,
      tema: dados.tema,
      arquivoReal: dados.arquivo, 
      data: new Date().toLocaleDateString("pt-BR"),
    };
    setRedacoes([novaRedacao, ...redacoes]);
  };

  // Função para baixar o arquivo salvo localmente
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
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
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
                <label className="text-gray-500 text-sm block mb-1">
                  Título
                </label>
                <p className="text-xl font-semibold">
                  {redacaoSelecionada.titulo}
                </p>
              </div>

              <div className="flex gap-10">
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
              </div>

              {redacaoSelecionada.arquivoReal && (
                <div className="bg-[#0d0a14] p-4 rounded-2xl border border-[#322654] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon
                      icon={faPaperclip}
                      className="text-[#8B5CF6]"
                    />
                    <span className="text-sm truncate max-w-[200px]">
                      {redacaoSelecionada.arquivoReal.name}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      baixarArquivo(redacaoSelecionada.arquivoReal!)
                    }
                    className="flex items-center gap-2 bg-[#8B5CF6] px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#7c4dff]"
                  >
                    <FontAwesomeIcon icon={faDownload} /> Baixar
                  </button>
                </div>
              )}
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
          className="bg-[#8B5CF6] px-6 h-12 text-white font-bold rounded-2xl flex items-center gap-2 mt-5"
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
            infoDescription={"Total"}
          />
          <InfoCardPages
            variantColorBg="#163A3B"
            variantColorText="#0E745C"
            icon={faCircleCheck}
            infoNumber={0}
            infoDescription={"Corrigidas"}
          />
          <InfoCardPages
            variantColorBg="#322654"
            variantColorText="#895BF3"
            icon={faMedal}
            infoNumber={0}
            infoDescription={"Nota"}
          />
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Suas Redações</h2>

          <div className="flex flex-col gap-4">
            {redacoes.length > 0 ? (
              redacoes.map((red) => (
                <div
                  key={red.id}
                  className="bg-[#1a1625] border border-[#322654] p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-[#8B5CF6] transition-all group"
                >
                  <div className="flex flex-col gap-1">
                    <h3 className="text-white font-bold text-xl group-hover:text-[#8B5CF6] transition-colors">
                      {red.titulo}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {red.tema} • {red.data}
                    </p>
                  </div>
                  <button
                    onClick={() => setRedacaoSelecionada(red)}
                    className="bg-[#322654] hover:bg-[#8B5CF6] text-white px-6 py-2 rounded-xl font-bold transition-colors text-sm"
                  >
                    Ver Detalhes
                  </button>
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
