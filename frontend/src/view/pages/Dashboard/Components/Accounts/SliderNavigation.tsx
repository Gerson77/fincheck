import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useSwiper } from "swiper/react";

interface SliderNavigationProps {
  isBeginning: boolean;
  isEnd: boolean;
}

export function SliderNavigation({ isBeginning, isEnd }: SliderNavigationProps) {
  const swiper = useSwiper();

  return (
    <div>
      <button
        className="text-white enabled:hover:bg-black/10 py-3 pl-2.5 pr-3.5 rounded-full transition-colors disabled:opacity-40"
        onClick={() => swiper.slidePrev()}
        disabled={isBeginning}
      >
        <ChevronLeftIcon className="text-white w-6 h-6" />
      </button>
      <button
        onClick={() => swiper.slideNext()}
        disabled={isEnd}
        className="text-white enabled:hover:bg-black/10 py-3 pl-2.5 pr-3.5 rounded-full transition-colors disabled:opacity-40">
        <ChevronRightIcon className="text-white w-6 h-6" />
      </button>
    </div>
  );
}
