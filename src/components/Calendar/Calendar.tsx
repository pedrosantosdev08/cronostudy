import { INFOCARDPAGES_DATA } from "../../data/data";
import { CalendarDays } from "../CalendarDays/CalendarDay";
import { InfoCardPages } from "../InfoCardPages/InfoCardPages";
import { SlotVazio } from "../SlotVazio/SlotVazio";

export const Calendar = () => {
  return (
    <>
      <div className="flex flex-col w-full">
        <main className="flex lg:flex-col bg-[#1C192B] w-full  max-w-5xl h-full border border-white/5 rounded-2xl ">
          <CalendarDays />
          <SlotVazio />
          <SlotVazio />
        </main>
        <div className="flex flex-row gap-5 ">
          {INFOCARDPAGES_DATA.map((infoCard) => (
            <InfoCardPages key={infoCard.id} {...infoCard} />
          ))}
        </div>
      </div>
    </>
  );
};
