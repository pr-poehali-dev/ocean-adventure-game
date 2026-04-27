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
        className={`relative z-10 text-center px-6 transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
          <span className="text-gold/60 text-xs font-title tracking-[0.3em] uppercase">
            Интерактивная RPG
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
        </div>

        <div className="text-gold/20 text-2xl mb-4 tracking-widest">◈ ◈ ◈</div>

        <h1
          className="font-title text-5xl md:text-7xl text-parchment uppercase tracking-widest mb-3"
          style={{ textShadow: "0 0 60px rgba(184,150,12,0.3)" }}
        >
          Одиссея
        </h1>
        <h2 className="font-title text-lg md:text-xl text-gold/70 uppercase tracking-[0.4em] mb-10">
          Путь домой
        </h2>

        <p className="text-parchment/40 text-sm font-display max-w-sm mx-auto leading-relaxed mb-12">
          Десять лет войны. Три года скитаний. Один путь домой.
          <br />
          Твои решения определят судьбу Одиссея.
        </p>

        <div className="flex flex-col items-center gap-3">
          {/* Continue button — если есть сохранение */}
          {hasSave && (
            <button
              onClick={() => handleAction(onContinue)}
              className="group relative inline-flex items-center gap-3 px-10 py-4 font-title text-sm tracking-[0.3em] uppercase text-parchment border border-gold/50 hover:border-gold transition-all duration-300 bg-gold/5 hover:bg-gold/10 w-72 justify-center"
              style={{ boxShadow: "0 0 30px rgba(184,150,12,0.1)" }}
            >
              <span className="text-gold group-hover:text-gold transition-colors">›</span>
              Продолжить
              <span className="text-gold group-hover:text-gold transition-colors">‹</span>
              {saveChapter && (
                <span className="absolute -bottom-5 left-0 right-0 text-[10px] text-gold/40 font-title tracking-wider">
                  {saveChapter}
                </span>
              )}
            </button>
          )}

          {/* New game button */}
          <button
            onClick={() => handleAction(onStart)}
            className={`group relative inline-flex items-center gap-3 px-10 py-4 font-title text-sm tracking-[0.3em] uppercase border transition-all duration-300 w-72 justify-center ${
              hasSave
                ? "text-parchment/50 border-white/10 hover:border-white/30 hover:text-parchment/80 hover:bg-white/3"
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

        {!hasSave && (
          <p className="mt-8 text-white/15 text-[11px] font-title tracking-widest uppercase">
            Нажми, чтобы начать
          </p>
        )}
      </div>

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
