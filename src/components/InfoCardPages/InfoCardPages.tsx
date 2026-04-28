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
  variantColorText,
}: InfoCardPagesProps) => {
  return (
    <div className="w-full max-w-5xl">
      <div className="flex w-full h-30 bg-[#1C192B] rounded-2xl mt-5 justify-start items-center border border-white/10 px-6">
        {icon ? (
          <div
            style={{
              background: `${variantColorBg}`,
            }}
            className="p-3 rounded-2xl mr-2.5"
          >
            <FontAwesomeIcon
              icon={icon}
              className="text-white text-2xl"
              style={{
                color: `${variantColorText}`,
              }}
            />
          </div>
        ) : null}
        <div className="flex flex-col w-full items-center">
          <span className="flex text-xl text-white font-bold ">{infoNumber}</span>
          <span className="text-neutral-500 text-[12px]">
            {infoDescription}
          </span>
        </div>
      </div>
    </div>
  );
};
