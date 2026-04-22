import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface InfoCardPagesProps {
  infoNumber: number;
  infoDescription: string;
  icon?: IconDefinition;
  variantColorBg?: string;
  variantColorText?: string;
}

export const InfoCardPages = ({
  infoNumber,
  infoDescription,
  icon,
  variantColorBg,
  variantColorText
}: InfoCardPagesProps) => {
  return (
    <div className="w-full max-w-5xl">
      <div className="flex w-full h-30 bg-[#1C192B] rounded-2xl mt-5 justify-start items-center pl-6 border border-white/10">
        <div
          style={{
            background: `${variantColorBg}`,
          }}
          className="p-3 rounded-2xl mr-2.5"
        >
          {icon && (
            <FontAwesomeIcon
            icon={icon}
            className="text-white text-2xl"
            style={{
              color: `${variantColorText}`
            }}/>
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-2xl text-white font-bold">{infoNumber}</span>
          <span className="text-neutral-500">{infoDescription}</span>
        </div>
      </div>
    </div>
  );
};
