"use client";

export default function Description({
  currentSneaker,
  setCurrent,
  resetInterval,
}) {
  const { colorText, borderColor } = currentSneaker;

  return (
    <div className="w-full flex flex-col gap-10 xl:gap-7">
      <div className="w-full">
        <h1
          className={`uppercase font-extrabold ${colorText} transition-colors duration-500 delay-500 text-center xl:text-left text-3xl md:text-5xl xl:text-6xl`}
        >
          Sneakers Epic
        </h1>
        <h1 className="uppercase font-bold text-dark-500 text-center xl:text-left text-3xl md:text-5xl xl:text-6xl">
          Nike&rsquo;s Crossover
        </h1>
      </div>

      <p className="font-medium text-dark-500 xl:p-0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint.
      </p>
    </div>
  );
}
