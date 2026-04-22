import {
  faCircleCheck,
  faFileLines,
  faMedal,
  faPlus,
  
} from "@fortawesome/free-solid-svg-icons";
import { PagesHeader } from "../components/PagesHeader/PagesHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InfoCardPages } from "../components/InfoCardPages/InfoCardPages";

export const Redacao = () => {
  return (
    <div className="min-h-screen w-full bg-[#0d0a14] flex flex-col items-center px-6 py-10">
      <header className="w-full max-w-5xl flex flex-col lg:flex-row lg:items-center justify-between items-start mb-10">
        <PagesHeader
          variantColor={"#FF8300"}
          titleHeader={"Minhas Redações"}
          descriptionHeader={"Pratique, envie e acompanhe suas redações"}
          icon={faFileLines}
        />
        <button className="bg-[#8B5CF6] w-full lg:max-w-70 h-12 text-white font-bold rounded-2xl flex justify-start items-center gap-2 pl-3 cursor-pointer mt-5">
          <FontAwesomeIcon icon={faPlus} />
          <span className="text-2xl">Nova Redação</span>
        </button>
      </header>
      <main className="w-full max-w-5xl  ">
        

        <section className="lg:flex flex-row gap-5">
          <InfoCardPages
            variantColorBg="#493322"
            variantColorText="#FFB900"
            icon={faFileLines}
            infoNumber={4}
            infoDescription={"Total de redações"}
          />
          <InfoCardPages
            variantColorBg="#163A3B"
            variantColorText="#0E745C"
            icon={faCircleCheck}
            infoNumber={4}
            infoDescription={"Corrigidas"}
          />
          <InfoCardPages
            variantColorBg="#322654"
            variantColorText="#895BF3"
            icon={faMedal}
            infoNumber={4}
            infoDescription={"Nota média"}
          />
        </section>

        <section className="mt-5">
          <h2 className="text-2xl text-white font-bold">Suas Redações</h2>
        </section>
      </main>
    </div>
  );
};
