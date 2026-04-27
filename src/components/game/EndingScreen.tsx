import { Stats } from "@/data/gameData";
import { JournalEntry } from "@/hooks/useGameState";
import Icon from "@/components/ui/icon";

interface EndingScreenProps {
  isVictory: boolean;
  isGameOver: boolean;
  stats: Stats;
  journal: JournalEntry[];
  sceneTitle: string;
  sceneText: string;
  sceneImage?: string;
  onRestart: () => void;
  onJournal: () => void;
}

export default function EndingScreen({
  isVictory,
  isGameOver,
  stats,
  journal,
  sceneTitle,
  sceneText,
  sceneImage,
  onRestart,
  onJournal,
}: EndingScreenProps) {
  const poseidonEnding =
    isVictory && stats.poseidonWrath >= 60;

  const choices = journal.length;
  const wisdomChoices = journal.filter((e) =>
    e.choiceText.toLowerCase().includes("мудрост") ||
    e.choiceText.toLowerCase().includes("хитрост") ||
    e.choiceText.toLowerCase().includes("самооблад")
  ).length;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      {/* Background */}
      {sceneImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${sceneImage})` }}
        />
      )}
      <div className="vignette absolute inset-0" />

      <div className="relative z-10 w-full max-w-lg text-center animate-fade-in">
        {/* Status badge */}
        <div className="mb-6">
          {isVictory ? (
            <span className="inline-flex items-center gap-2 px-4 py-1.5 border border-gold/40 text-gold font-title text-xs tracking-widest uppercase">
              <Icon name="Crown" size={14} />
              Одиссея завершена
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 px-4 py-1.5 border border-crimson/40 text-crimson font-title text-xs tracking-widest uppercase">
              <Icon name="Skull" size={14} />
              Конец пути
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="font-title text-3xl md:text-4xl text-parchment uppercase tracking-wider mb-4">
          {sceneTitle}
        </h1>

        {/* Scene text */}
        <p className="text-parchment/70 text-base leading-relaxed mb-8 font-display text-[17px]">
          {sceneText}
        </p>

        {/* Poseidon extra ending */}
        {poseidonEnding && (
          <div className="mb-6 p-4 border border-blue-900/40 bg-blue-950/20 rounded-sm">
            <p className="text-blue-300/80 text-sm leading-relaxed italic font-display">
              «Но Посейдон всё ещё не простил тебя. Однажды тебе придётся снова взять весло и идти в земли, где не знают морей...»
            </p>
            <p className="text-blue-400/50 text-xs mt-2 font-title tracking-wider uppercase">
              — To be continued?
            </p>
          </div>
        )}

        {/* Stats summary */}
        <div className="grid grid-cols-2 gap-2 mb-8 text-left">
          <div className="bg-white/3 border border-white/5 rounded-sm p-3">
            <div className="text-white/30 text-[10px] font-title uppercase tracking-wider mb-1">
              Сделано выборов
            </div>
            <div className="text-parchment text-xl font-title">{choices}</div>
          </div>
          <div className="bg-white/3 border border-white/5 rounded-sm p-3">
            <div className="text-white/30 text-[10px] font-title uppercase tracking-wider mb-1">
              Выживших
            </div>
            <div className="text-parchment text-xl font-title">
              {stats.crewCount}
            </div>
          </div>
          <div className="bg-white/3 border border-white/5 rounded-sm p-3">
            <div className="text-white/30 text-[10px] font-title uppercase tracking-wider mb-1">
              Здоровье
            </div>
            <div className="text-parchment text-xl font-title">
              {stats.health}%
            </div>
          </div>
          <div className="bg-white/3 border border-white/5 rounded-sm p-3">
            <div className="text-white/30 text-[10px] font-title uppercase tracking-wider mb-1">
              Мудрых решений
            </div>
            <div className="text-parchment text-xl font-title">
              {wisdomChoices}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onJournal}
            className="w-full py-3 font-title text-sm tracking-widest uppercase text-gold border border-gold/30 hover:border-gold/60 hover:bg-gold/5 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Icon name="BookOpen" size={15} />
            Читать журнал
          </button>
          <button
            onClick={onRestart}
            className="w-full py-3 font-title text-sm tracking-widest uppercase text-parchment border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Icon name="RotateCcw" size={15} />
            Начать заново
          </button>
        </div>
      </div>
    </div>
  );
}
