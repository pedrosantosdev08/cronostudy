interface InicialMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAuth: () => void;
}

export const InicialMenu = ({
  isOpen,
  onClose,
  onOpenAuth,
}: InicialMenuProps) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 left-0 right-0 z-[60] w-full bg-[#0d0a14] border-b border-white/10 p-6 shadow-2xl rounded-b-3xl transition-all duration-500 ease-out transform ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex justify-between items-center mb-8 max-w-md mx-auto">
          <h2 className="text-white font-black italic tracking-widest">MENU</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white text-3xl transition-colors"
          >
            &times;
          </button>
        </header>

        <nav className="flex flex-col gap-2 mb-6 max-w-md mx-auto">
          <a
            href="#recursos"
            onClick={onClose}
            className="text-gray-400 hover:text-purple-400 hover:bg-white/5 p-4 rounded-xl transition-all font-medium border border-transparent hover:border-white/5"
          >
            Recursos
          </a>
          <a
            href="#sobre"
            onClick={onClose}
            className="text-gray-400 hover:text-purple-400 hover:bg-white/5 p-4 rounded-xl transition-all font-medium border border-transparent hover:border-white/5"
          >
            Sobre
          </a>
        </nav>

        <span className="block h-px w-full bg-gradient-to-r from-transparent via-neutral-700 to-transparent mb-6 max-w-md mx-auto"></span>

        <div className="flex gap-4 max-w-md mx-auto">
          <button
            onClick={() => {
              onOpenAuth(); // Chama a função que vem do pai
              onClose(); // Fecha o menu ao abrir o login
            }}
            className="flex-1 text-white font-semibold py-3 rounded-xl hover:bg-white/5 transition-colors border border-white/5"
          >
            Login
          </button>
          <button
            onClick={() => {
              onOpenAuth(); // Chama a função que vem do pai
              onClose(); // Fecha o menu ao abrir o login
            }}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition-all active:scale-[0.95] shadow-lg shadow-purple-500/20"
          >
            Cadastrar
          </button>
        </div>

        <div className="w-12 h-1 bg-white/10 rounded-full mx-auto mt-6" />
      </div>
    </>
  );
};
