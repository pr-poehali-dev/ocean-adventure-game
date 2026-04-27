import { JournalEntry } from "@/hooks/useGameState";
import Icon from "@/components/ui/icon";

interface JournalPanelProps {
  entries: JournalEntry[];
  onClose: () => void;
}

export default function JournalPanel({ entries, onClose }: JournalPanelProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-lg max-h-[80vh] flex flex-col bg-[#0d0a0a] border border-white/10 rounded-sm shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Icon name="BookOpen" size={16} className="text-gold" />
            <span className="font-title text-gold tracking-widest uppercase text-sm">
              Журнал Одиссея
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white/30 hover:text-white/70 transition-colors"
          >
            <Icon name="X" size={16} />
          </button>
        </div>

        {/* Entries */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {entries.length === 0 ? (
            <p className="text-white/30 text-sm text-center py-8">
              Журнал пуст. Твой путь только начинается.
            </p>
          ) : (
            entries.map((entry, idx) => (
              <div key={idx} className="animate-fade-in">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-crimson text-[10px] font-title tracking-widest uppercase">
                    {entry.chapter}
                  </span>
                  <div className="flex-1 h-px bg-white/5" />
                  <span className="text-white/20 text-[10px]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-parchment/50 text-[11px] font-title uppercase tracking-wider mb-1">
                  {entry.title}
                </p>
                <p className="text-gold/80 text-sm mb-1 leading-snug">
                  › {entry.choiceText.replace(/\s*\(.*?\)/, "")}
                </p>
                <p className="text-parchment/60 text-sm leading-relaxed">
                  {entry.resultText}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
