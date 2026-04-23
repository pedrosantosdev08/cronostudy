import { useState } from "react";
import  CronoStudyLogo  from "../../assets/favicon-32x32.png"

export const HomeHeader = () => {
  const obterSaudacao = () => {
    const hora = new Date().getHours();
    if (hora >= 5 && hora < 12) return "Bom dia";
    if (hora >= 12 && hora < 18) return "Boa tarde";
    return "Boa noite";
  };

  const [periodo] = useState(obterSaudacao);

  return (
    <header>
      <div className="flex gap-2 items-center mb-5">
        <img src={CronoStudyLogo} alt="Logo CronoStudy" className="h-12 w-12"/>
        <span className="text-white font-bold text-2xl">CronoStudy</span>
      </div>
      <div>
        <h1 className="text-4xl text-white font-bold">
          {periodo},{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#5126b6] from-20% via-white via-60% to-[#5126b6] to-70% font-bold ">
            Estudante
          </span>
        </h1>
        <p className="text-neutral-600">
          Continue de onde parou. Seu progresso está sendo acompanhado.
        </p>
      </div>
    </header>
  );
};
