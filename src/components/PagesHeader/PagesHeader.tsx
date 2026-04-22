import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowBack } from "../ArrowBack/ArrowBack";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface PagesHeaderProps {
  titleHeader: string;
  descriptionHeader: string;
  icon: IconDefinition;
  variantColor?: string;
}

export const PagesHeader = ({
  titleHeader,
  descriptionHeader,
  icon,
  variantColor,
}: PagesHeaderProps) => {
  return (
    <header className="">
      {/* Lado Esquerdo: Títulos */}
      <div className="flex flex-col gap-3">
        <ArrowBack />
        <div>
          <div className="flex flex-row gap-2.5">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg text-2xl"
              style={{
                background: `linear-gradient(135deg, ${variantColor} 0%, #1e1b4b 100% )`,
              }}
            >
              <FontAwesomeIcon icon={icon} />
            </div>
            <h1 className="text-white text-3xl font-bold tracking-tight">
              {titleHeader}
            </h1>
          </div>
          <p className="text-neutral-400 text-md mt-1">{descriptionHeader}</p>
        </div>
      </div>
    </header>
  );
};
