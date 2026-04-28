import { useState } from "react";
import { useStore } from "../../hooks/useStore";

interface ModalMateriaProps {
  onCancel: () => void;
  diaSelecionado: string;
}

export const ModalMateria = ({ onCancel, diaSelecionado }: ModalMateriaProps) => {
  const adicionarMateria = useStore((state) => state.adicionarMateria);
  const [titulo, setTitulo] = useState("");
  const [tema, setTema] = useState("");
  const [tempo, setTempo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo || !tema || !tempo) return;

    // Função auxiliar para formatar a string de exibição (ex: 0.5 -> 30min)
    const formatarTempoParaExibicao = (valor: string) => {
      if (valor === "0.5") return "30min";
      return valor.includes(".5") ? valor.replace(".5", "h 30min") : `${valor}h`;
    };

    const novaMateria = {
      id: Date.now(),
      titulo,
      tema,
      data: new Date().toLocaleDateString("pt-BR"), // Adicionado vírgula aqui
      tempo: formatarTempoParaExibicao(tempo), // Salva a string formatada para o card
    };

    
    adicionarMateria(novaMateria, diaSelecionado, parseFloat(tempo));
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <header>
        <h2 className="text-white text-2xl font-bold tracking-tight">Nova Matéria</h2>
        <p className="text-gray-500 text-sm font-medium">Agendando para {diaSelecionado}</p>
      </header>
      
      <div className="space-y-4">
        <select 
          className="w-full p-4 rounded-2xl bg-white/5 text-white border border-white/10 focus:border-purple-600 outline-none transition-colors appearance-none"
          value={titulo} 
          onChange={(e) => setTitulo(e.target.value)}
          required
        >
          <option value="" className="bg-[#1C192B]">Selecionar Disciplina</option>
          <option value="Matemática" className="bg-[#1C192B]">Matemática</option>
          <option value="Português" className="bg-[#1C192B]">Português</option>
          <option value="História" className="bg-[#1C192B]">História</option>
          <option value="Geografia" className="bg-[#1C192B]">Geografia</option>
          <option value="Biologia" className="bg-[#1C192B]">Biologia</option>
          <option value="Química" className="bg-[#1C192B]">Química</option>
          <option value="Física" className="bg-[#1C192B]">Física</option>
        </select>

        <input
          className="w-full p-4 rounded-2xl bg-white/5 text-white border border-white/10 focus:border-purple-600 outline-none transition-colors"
          type="text"
          value={tema}
          onChange={(e) => setTema(e.target.value)}
          placeholder="Qual o assunto de hoje?"
          required
        />

        <div className="relative">
          <label className="text-[10px] font-black text-purple-500 uppercase tracking-widest ml-1 mb-1 block">
            Duração Estimada
          </label>
          <select 
            value={tempo}
            onChange={(e) => setTempo(e.target.value)}
            className="w-full p-4 rounded-2xl bg-white/5 text-white border border-white/10 focus:border-purple-600 outline-none transition-colors appearance-none"
            required
          >
            <option value="" className="bg-[#1C192B]">Selecione um Horário</option>
            <option value="0.5" className="bg-[#1C192B]">30 min</option>
            <option value="1" className="bg-[#1C192B]">1h</option>
            <option value="1.5" className="bg-[#1C192B]">1h 30min</option>
            <option value="2" className="bg-[#1C192B]">2h</option>
            <option value="2.5" className="bg-[#1C192B]">2h 30min</option>
            <option value="3" className="bg-[#1C192B]">3h</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3 mt-2">
        <button 
          type="button" 
          onClick={onCancel}
          className="flex-1 py-4 text-white/40 font-bold hover:text-white transition-colors text-xs tracking-widest"
        >
          DESCARTAR
        </button>
        <button 
          type="submit"
          className="flex-1 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-2xl shadow-lg shadow-purple-900/20 transition-all active:scale-95 text-xs tracking-widest"
        >
          CONFIRMAR
        </button>
      </div>
    </form>
  );
};