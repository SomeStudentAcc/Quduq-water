import { IFAQ } from "@/types/getDataTypes";
import { getLocalizedText } from "@/utils/getLocaleText";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useRef } from "react";
import { useClickAway } from "react-use";
interface Props {
  index: number;
  openIndex: number | null;
  element: IFAQ;
  handleToggle: (index: number | null) => void;
}

export default function AnswerCard({
  index,
  openIndex,
  handleToggle,
  element,
}: Props) {
  const locale = useLocale();
  const answerRef = useRef(null);
  useClickAway(
    answerRef,
    () => {
      console.log("card");
      handleToggle(null);
    },
    ["click"]
  );

  return (
    <>
      <div
        ref={answerRef}
        onClick={() => handleToggle(index)}
        className="w-full select-none max-w-[58.5rem] bg-secondary flex flex-col gap-5 rounded-[1rem] p-5"
      >
        <div className="flex justify-between items-center">
          <h3 className={`mr-2 ${index == openIndex && "text-primary "}`}>
            {getLocalizedText(element, "question", locale)}
          </h3>
          <button
            onClick={() => handleToggle(index)}
            className="p-4 rounded-full bg-white transition-all duration-300"
          >
            {openIndex == index ? (
              <Image src={"/Minus.svg"} width={18} height={18} alt="" />
            ) : (
              <Image src={"/Plus.svg"} width={18} height={18} alt="" />
            )}
          </button>
        </div>
        {openIndex == index && (
          <div className={` transition-all duration-300 ease-in-out`}>
            <p className="text-[#677E8B] font-medium">
              {getLocalizedText(element, "answer", locale)}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
