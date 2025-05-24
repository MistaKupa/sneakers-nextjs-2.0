import { IoChevronBack, IoChevronForward } from "react-icons/io5";

function Arrows({ setCurrent, resetInterval }) {
  return (
    <div className="absolute flex -bottom-24 -right-60">
      <button
        onClick={() => {
          setCurrent((prev) => (prev + 1) % sneakers.length);
          resetInterval();
        }}
        className="hidden xl:flex items-center justify-center w-9 h-9 bg-slate-200"
      >
        <IoChevronBack />
      </button>
      <button
        onClick={() => {
          setCurrent((prev) => (prev + 1) % sneakers.length);
          resetInterval();
        }}
        className={`hidden xl:flex items-center justify-center w-9 h-9  text-dark-100 ${currentSneaker.bg1} transition-colors  duration-500 delay-500`}
      >
        <IoChevronForward />
      </button>
    </div>
  );
}

export default Arrows;
