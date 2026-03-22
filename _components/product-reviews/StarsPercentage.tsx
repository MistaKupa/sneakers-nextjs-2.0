import { IoStarSharp } from "react-icons/io5";

export default function StarsPercentage() {
  return (
    <div className="flex flex-col gap-1 items-center">
      {/* 5 STARS CONTAINER*/}
      <div className="flex items-center gap-2">
        <span className="flex items-center">
          <span className="font-medium w-5 flex justify-center ">5</span>
          <IoStarSharp className="text-amber-400" size={18} />
        </span>
        <span className="block bg-dark-300 w-36 h-2 rounded-full"></span>
        <span>90%</span>
      </div>

      {/* 4 STARS CONTAINER*/}
      <div className="flex items-center gap-2">
        <span className="flex items-center">
          <span className="font-medium w-5 flex justify-center ">4</span>
          <IoStarSharp className="text-amber-400" size={18} />
        </span>
        <span className="block bg-dark-300 w-36 h-2 rounded-full"></span>
        <span>90%</span>
      </div>

      {/* 3 STARS CONTAINER*/}
      <div className="flex items-center gap-2">
        <span className="flex items-center">
          <span className="font-medium w-5 flex justify-center ">3</span>
          <IoStarSharp className="text-amber-400" size={18} />
        </span>
        <span className="block bg-dark-300 w-36 h-2 rounded-full"></span>
        <span>90%</span>
      </div>

      {/* 2 STARS CONTAINER*/}
      <div className="flex items-center gap-2">
        <span className="flex items-center">
          <span className="font-medium w-5 flex justify-center">2</span>
          <IoStarSharp className="text-amber-400" size={18} />
        </span>
        <span className="block bg-dark-300 w-36 h-2 rounded-full"></span>
        <span>90%</span>
      </div>

      {/* 1 STARS CONTAINER*/}
      <div className="flex items-center gap-2">
        <span className="flex items-center">
          <span className="font-medium w-5 flex justify-center ">1</span>
          <IoStarSharp className="text-amber-400" size={18} />
        </span>
        <span className="block bg-dark-300 w-36 h-2 rounded-full"></span>
        <span>90%</span>
      </div>
    </div>
  );
}
