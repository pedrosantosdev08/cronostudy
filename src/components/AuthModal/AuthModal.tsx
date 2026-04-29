import { useState } from "react";
import { auth } from "../../lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Bem-vindo de volta!");
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        // Atualiza o nome do usuário no Firebase Auth
        await updateProfile(userCredential.user, { displayName: name });
        alert("Conta criada com sucesso!");
      }
      onClose();
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        // Agora o TS sabe que 'error' tem as propriedades do Firebase
        console.error("Código do Erro:", error.code);
        alert(error.message);
      } else {
        // Caso seja um erro comum do JS
        console.error("Erro inesperado:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    /* Container principal fixo: Ocupa a tela toda (inset-0) e usa flexbox para centralizar */
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      
      {/* O card do modal em si, agora centralizado pelo pai */}
      <div className="w-full max-w-md bg-[#16121f] border border-white/10 rounded-3xl p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
        >
          ✕
        </button>

        <header className="text-center mb-8">
          <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">
            {isLogin ? "Login" : "Cadastro"}
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            {isLogin
              ? "Acesse sua conta para continuar"
              : "Crie sua conta gratuitamente"}
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                Nome Completo
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0d0a14] border border-white/10 rounded-xl py-3 px-4 text-white focus:border-purple-500 outline-none transition-all"
                placeholder="Pedro Gabriel"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
              E-mail
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0d0a14] border border-white/10 rounded-xl py-3 px-4 text-white focus:border-purple-500 outline-none transition-all"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
              Senha
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0d0a14] border border-white/10 rounded-xl py-3 px-4 text-white focus:border-purple-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-black py-4 rounded-xl transition-all active:scale-95 shadow-lg shadow-purple-500/20 uppercase italic"
          >
            {loading ? "Processando..." : isLogin ? "Entrar" : "Criar Conta"}
          </button>
        </form>

        <footer className="mt-8 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
          >
            {isLogin ? "Não tem uma conta? " : "Já possui conta? "}
            <span className="font-bold border-b border-purple-500/50">
              {isLogin ? "Cadastre-se" : "Faça Login"}
            </span>
          </button>
        </footer>
      </div>
    </div>
  );
};