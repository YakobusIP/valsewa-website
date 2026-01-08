import Image from "next/image";

export default function Hero() {
  return (
    <section className="mt-14 lg:mt-20 grid lg:grid-cols-2 gap-10 relative">

      {/* LEFT SIDE */}
      <div className="relative z-10">

        <h5 className="flex items-center gap-3 text-white/80">
          <span className="text-red-600 font-bold text-xl">V3</span>
          VALSEWA
        </h5>

        <h1 className="text-white font-black text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl leading-[1.1] mt-4 max-w-0.5">
          WORLD’S #1 <br />
          <span>VALORANT ACCOUNT</span> <br />
          RENTAL SITE
        </h1>

        {/* CHARACTER */}
        <div
          className="
            absolute
            right-[-100px] 
            -top-10 
            w-[280px] sm:w-[340px] md:w-[400px] xl:w-[480px]
            h-[380px] sm:h-[450px] md:h-[500px] xl:h-[600px]
            pointer-events-none
          "
        >
          <Image
            src="/NewHero/Agent Neon.png"
            alt="Valorant Agent"
            fill
            className="object-contain drop-shadow-[0_0_40px_#00ffff50]"
          />
        </div>

      </div>

      {/* RIGHT CARD / SLIDER */}
      <div className="flex justify-center lg:justify-end items-start">
        <div className="relative w-full max-w-[360px] lg:max-w-[380px] h-[460px] bg-gradient-to-br from-white/10 via-black/60 to-red-950/70 rounded-2xl border border-white/10 shadow-xl p-4">

          <div className="relative w-full h-[240px] rounded-xl overflow-hidden">
            <Image
              src="/screen1.jpg"
              alt="preview"
              fill
              className="object-cover"
            />
          </div>

          <div className="mt-4 flex justify-between items-center text-white">
            <div>
              <p className="font-bold text-xl">A-27</p>
              <p className="text-white/70 text-sm">1 transaction</p>
            </div>
            <span className="text-white/60">7 days</span>
          </div>

          <button className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white/10 w-9 h-9 rounded-full text-white">
            ←
          </button>
          <button className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white/10 w-9 h-9 rounded-full text-white">
            →
          </button>

          <div className="mt-6 flex justify-center gap-2">
            <span className="w-3 h-3 bg-blue-600 rounded-full" />
            <span className="w-3 h-3 bg-white/30 rounded-full" />
            <span className="w-3 h-3 bg-white/30 rounded-full" />
          </div>

        </div>
      </div>
    </section>
  );
}
