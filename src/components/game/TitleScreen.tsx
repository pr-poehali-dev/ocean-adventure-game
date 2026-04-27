import { useState, useEffect } from "react";
import { IMAGES } from "@/data/gameData";

interface TitleScreenProps {
  onStart: () => void;
  onContinue: () => void;
  onPlayTitle: () => void;
  onStopTitle: () => void;
  hasSave: boolean;
  saveChapter?: string;
}

export default function TitleScreen({
  onStart,
  onContinue,
  onPlayTitle,
  onStopTitle,
  hasSave,
  saveChapter,
}: TitleScreenProps) {
  const [visible, setVisible] = useState(false);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    const m = setTimeout(() => onPlayTitle(), 400);
    return () => {
      clearTimeout(t);
      clearTimeout(m);
    };
  }, [onPlayTitle]);

  const handleAction = (action: () => void) => {
    setStarting(true);
    onStopTitle();
    setTimeout(action, 900);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-700 ${
        starting ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${IMAGES.prologue})` }}
      />
      <div className="absolute inset-0 bg-black/75" />
      <div className="vignette absolute inset-0" />
      <div className="grain absolute inset-0" />

      <div
        className={`relative z-10 text-center px-5 sm:px-8 w-full max-w-sm sm:max-w-md transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Top ornament */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          <div className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-gold/50" />
          <span className="text-gold/60 text-[10px] sm:text-xs font-title tracking-[0.25em] sm:tracking-[0.3em] uppercase">
            Интерактивная RPG
          </span>
          <div className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-gold/50" />
        </div>

        <div className="text-gold/20 text-xl sm:text-2xl mb-3 sm:mb-4 tracking-widest">◈ ◈ ◈</div>

        <h1
          className="font-title text-4xl sm:text-5xl md:text-7xl text-parchment uppercase tracking-widest mb-2 sm:mb-3"
          style={{ textShadow: "0 0 60px rgba(184,150,12,0.3)" }}
        >
          Одиссея
        </h1>
        <h2 className="font-title text-base sm:text-lg md:text-xl text-gold/70 uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-8 sm:mb-10">
          Путь домой
        </h2>

        <p className="text-parchment/40 text-sm font-display mx-auto leading-relaxed mb-10 sm:mb-12">
          Десять лет войны. Три года скитаний. Один путь домой.
          <br />
          Твои решения определят судьбу Одиссея.
        </p>

        {/* Buttons */}
        <div className="flex flex-col items-center gap-3 w-full">
          {hasSave && (
            <button
              onClick={() => handleAction(onContinue)}
              className="group relative inline-flex items-center gap-3 px-6 py-4 font-title text-sm tracking-[0.25em] uppercase text-parchment border border-gold/50 hover:border-gold transition-all duration-300 bg-gold/5 hover:bg-gold/10 w-full justify-center active:scale-[0.98]"
              style={{ boxShadow: "0 0 30px rgba(184,150,12,0.1)" }}
            >
              <span className="text-gold">›</span>
              Продолжить
              <span className="text-gold">‹</span>
              {saveChapter && (
                <span className="absolute -bottom-5 left-0 right-0 text-[10px] text-gold/40 font-title tracking-wider">
                  {saveChapter}
                </span>
              )}
            </button>
          )}

          <button
            onClick={() => handleAction(onStart)}
            className={`group relative inline-flex items-center gap-3 px-6 py-4 font-title text-sm tracking-[0.25em] uppercase border transition-all duration-300 w-full justify-center active:scale-[0.98] ${
              hasSave
                ? "text-parchment/50 border-white/10 hover:border-white/30 hover:text-parchment/80"
                : "text-parchment border-gold/30 hover:border-gold/70 hover:bg-gold/5"
            }`}
          >
            {hasSave ? (
              <>
                <span className="text-white/30 group-hover:text-white/60">›</span>
                Начать заново
                <span className="text-white/30 group-hover:text-white/60">‹</span>
              </>
            ) : (
              <>
                <span className="text-gold/60 group-hover:text-gold transition-colors">›</span>
                Начать странствие
                <span className="text-gold/60 group-hover:text-gold transition-colors">‹</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div
        className={`absolute bottom-5 sm:bottom-6 left-0 right-0 text-center transition-all duration-1000 delay-500 ${
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
