import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) {
      return;
    }

    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="flex flex-row items-center justify-between ">
      <div className="flex flex-col">
        <div className="font-medium  text-[14px] sm:text-[15px] md:text-[16px] lg:text-[16px] xl:text-[16px] 2xl:text-[16px] 3xl:text-[16px] 4xl:text-[15px]">
          {title}
        </div>
        <div className="font-light text-[12px] sm:text-[12px] md:text-[13px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px] 3xl:text-sm 4xl:text-sm  py-1 text-gray-600 mr-3">
          {subtitle}
        </div>
      </div>
      <div className="flex flex-row items-center gap-4 ">
        <div
          onClick={onReduce}
          className="
            w-5
            sm:w-5
            md:w-6
            lg:w-7 
            xl:w-7
            2xl:w-7
            5xl:w-7
            h-5
            sm:h-5
            md:h-6
            lg:h-7 
            xl:h-7
            2xl:h-7
            5xl:h-7

            rounded-full
            border
            border-neutral-400
            flex
            items-center
            justify-center
            text-neutral-600
            cursor-pointer
            hover:opacity-80
            transition
          "
        >
          <AiOutlineMinus className="text-[11px] sm:text-[13px] md:text-[11px] lg:text-[12px] xl:text-[12px] 2xl:text-lg 3xl:text-sm 4xl:text-sm" />
        </div>
        <div
          className="
            font-light 
 text-[11px] sm:text-[13px] md:text-[11px] lg:text-[12px] xl:text-[15px] 2xl:text-lg 3xl:text-sm 4xl:text-sm            text-neutral-600
          "
        >
          {value}
        </div>
        <div
          onClick={onAdd}
          className="
          w-5
          sm:w-5
          md:w-6
          lg:w-7 
          xl:w-7
          2xl:w-7
          5xl:w-7
          h-5
          sm:h-5
          md:h-6
          lg:h-7 
          xl:h-7
          2xl:h-7
          5xl:h-7

            rounded-full
            border-[1px]
            border-neutral-400
            flex
            items-center
            justify-center
            text-neutral-600
            cursor-pointer
            hover:opacity-80
            transition
          "
        >
          <AiOutlinePlus className="text-[11px] sm:text-[13px] md:text-[11px] lg:text-[12px] xl:text-[12px] 2xl:text-lg 3xl:text-sm 4xl:text-sm" />
        </div>
      </div>
    </div>
  );
};

export default Counter;
