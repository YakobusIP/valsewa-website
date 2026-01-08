import Image from "next/image";

export default function Navbar3() {
  return (
    <nav className="flex flex-wrap gap-4 justify-between items-center">

      {/* LOGO */}
      <div className="flex items-center gap-3 bg-black/50 px-4 py-2 rounded-xl border border-white/10">
        <span className="text-yellow-500 font-bold text-xl">V</span>
        <span className="text-white tracking-widest text-sm lg:text-base">
          VALFORUM
        </span>
      </div>

      {/* SVG LINE */}
      <svg
        className="absolute top-6 left-10 w-[360px] xl:w-[480px] hidden lg:block pointer-events-none"
        viewBox="0 0 400 200"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d="
            M 70 160
            H 330
            Q 340 160 340 150
            V 70
            Q 340 60 330 60
            H 190
            Q 180 60 180 50
            V 30
            Q 180 20 170 20
            H 70
            Q 60 20 60 30
            V 150
            Q 60 160 70 160
            Z
          "
          fill="none"
          stroke="#ffffff40"
          strokeWidth="2"
        />
      </svg>

      {/* NAV TABS */}
      <div className="flex flex-wrap bg-[#1a1a1a] border border-white/10 rounded-xl px-2 py-1 gap-2">
        <button className="bg-black px-4 py-2 rounded-lg flex items-center gap-2 text-white text-sm lg:text-base">
          <span className="text-red-600 font-bold">V3</span> VALSEWA
        </button>
        <button className="px-4 py-2 rounded-lg text-white/70 hover:text-white text-sm lg:text-base">
          VAL-JUBEL
        </button>
        <button className="px-4 py-2 rounded-lg text-white/70 hover:text-white text-sm lg:text-base">
          VAL-JOKI
        </button>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3">
        <button className="bg-black/60 border border-white/10 p-2 rounded-xl">
          🔍
        </button>
        <button className="bg-black/60 border border-white/10 px-3 py-2 rounded-xl flex items-center gap-2 text-sm text-white">
          💎 <span className="hidden sm:block">Top Up</span>
        </button>
        <button className="bg-[#c70515] hover:bg-red-700 px-4 py-2 rounded-xl text-sm text-white">
          Login
        </button>
      </div>

    </nav>
  );
}
