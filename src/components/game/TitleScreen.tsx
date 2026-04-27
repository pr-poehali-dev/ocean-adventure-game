import { useState, useEffect } from "react";
import { IMAGES } from "@/data/gameData";

interface TitleScreenProps {
  onStart: () => void;
}

export default function TitleScreen({ onStart }: TitleScreenProps) {
  const [visible, setVisible] = useState(false);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleStart = () => {
    setStarting(true);
    setTimeout(onStart, 900);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-700 ${
        starting ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${IMAGES.prologue})` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/75" />
      {/* Vignette */}
      <div className="vignette absolute inset-0" />
      {/* Grain */}
      <div className="grain absolute inset-0" />

      {/* Content */}
      <div
        className={`relative z-10 text-center px-6 transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Top ornament */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
          <span className="text-gold/60 text-xs font-title tracking-[0.3em] uppercase">
            Интерактивная RPG
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
        </div>

        {/* Greek ornament line */}
        <div className="text-gold/20 text-2xl mb-4 tracking-widest">
          ◈ ◈ ◈
        </div>

        {/* Title */}
        <h1
          className="font-title text-5xl md:text-7xl text-parchment uppercase tracking-widest mb-3"
          style={{ textShadow: "0 0 60px rgba(184,150,12,0.3)" }}
        >
          Одиссея
        </h1>
        <h2 className="font-title text-lg md:text-xl text-gold/70 uppercase tracking-[0.4em] mb-10">
          Путь домой
        </h2>

        {/* Subtitle */}
        <p className="text-parchment/40 text-sm font-display max-w-sm mx-auto leading-relaxed mb-14">
          Десять лет войны. Три года скитаний. Один путь домой.
          <br />
          Твои решения определят судьбу Одиссея.
        </p>

        {/* Start button */}
        <button
          onClick={handleStart}
          className="group relative inline-flex items-center gap-3 px-10 py-4 font-title text-sm tracking-[0.3em] uppercase text-parchment border border-gold/30 hover:border-gold/70 transition-all duration-300 hover:bg-gold/5"
          style={{ boxShadow: "0 0 30px rgba(184,150,12,0.05)" }}
        >
          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(184,150,12,0.08) 0%, transparent 70%)",
            }}
          />
          <span className="text-gold/60 group-hover:text-gold transition-colors">›</span>
          Начать странствие
          <span className="text-gold/60 group-hover:text-gold transition-colors">‹</span>
        </button>

        {/* Hint */}
        <p className="mt-6 text-white/15 text-[11px] font-title tracking-widest uppercase">
          Нажми, чтобы начать
        </p>
      </div>

      {/* Bottom credits */}
      <div
        className={`absolute bottom-6 left-0 right-0 text-center transition-all duration-1000 delay-500 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-white/15 text-[10px] font-title tracking-widest uppercase">
          По мотивам «Одиссеи» Гомера
        </p>
      </div>
    </div>
  );
}
