import { useState } from "react";
import { faArrowUpFromBracket, faXmark, faFileLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface FormRedacaoProps {
  onClose: () => void;
  onSave: (data: { titulo: string; tema: string; arquivo: File }) => void;
}

export const FormRedacao = ({ onClose, onSave }: FormRedacaoProps) => {
  const [titulo, setTitulo] = useState("");
  const [tema, setTema] = useState("");
  const [arquivo, setArquivo] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo || !tema || !arquivo) return alert("Preencha tudo!");

    // Enviando o objeto FILE completo
    onSave({ titulo, tema, arquivo });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-[#1a1625] p-8 rounded-3xl border border-[#322654] relative animate-in fade-in zoom-in duration-200">
        <button type="button" onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white">
          <FontAwesomeIcon icon={faXmark} size="xl" />
        </button>

        <h2 className="text-3xl text-white font-bold mb-8">Nova Redação</h2>

        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-gray-300 font-medium">Título</label>
            <input 
              required value={titulo} onChange={(e) => setTitulo(e.target.value)}
              className="bg-[#0d0a14] border border-[#322654] rounded-xl p-4 text-white focus:ring-2 focus:ring-[#8B5CF6] outline-none"
              type="text" placeholder="Título da redação"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-300 font-medium">Tema</label>
            <select 
              required value={tema} onChange={(e) => setTema(e.target.value)}
              className="bg-[#0d0a14] border border-[#322654] rounded-xl p-4 text-white focus:ring-2 focus:ring-[#8B5CF6] outline-none cursor-pointer"
            >
              <option value="">Selecione...</option>
              <option value="Tecnologia">Educação e Tecnologia</option>
              <option value="Saúde">Saúde Mental</option>
              <option value="Meio Ambiente">Meio Ambiente</option>
              <option value="Política e Sociedade">Política e Sociedade</option>
              <option value="Direitos Humanos">Direitos Humanos</option>
              <option value="Economia">Economia</option>
              <option value="Cultura de Identidade">Cultura de Identidade</option>

            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-300 font-medium">Arquivo</label>
            <div className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center cursor-pointer ${arquivo ? 'border-[#8B5CF6]' : 'border-[#322654]'}`}>
              <input 
                type="file" className="hidden" id="file-upload" 
                onChange={(e) => e.target.files && setArquivo(e.target.files[0])}
              />
              <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                <FontAwesomeIcon icon={arquivo ? faFileLines : faArrowUpFromBracket} className={`text-3xl mb-2 ${arquivo ? 'text-[#FF8300]' : 'text-[#8B5CF6]'}`} />
                <span className="text-gray-300">{arquivo ? arquivo.name : "Selecionar arquivo"}</span>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-10 flex gap-4">
          <button type="button" onClick={onClose} className="flex-1 border border-[#322654] text-white py-4 rounded-xl font-bold">Cancelar</button>
          <button type="submit" className="flex-1 bg-[#8B5CF6] text-white py-4 rounded-xl font-bold hover:bg-[#7c4dff]">Enviar</button>
        </div>
      </form>
    </div>
  );
};