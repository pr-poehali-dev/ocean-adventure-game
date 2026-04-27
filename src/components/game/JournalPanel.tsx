import { JournalEntry } from "@/hooks/useGameState";
import Icon from "@/components/ui/icon";

interface JournalPanelProps {
  entries: JournalEntry[];
  onClose: () => void;
}

export default function JournalPanel({ entries, onClose }: JournalPanelProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full sm:max-w-lg flex flex-col bg-[#0d0a0a] border-t sm:border border-white/10 rounded-t-sm sm:rounded-sm shadow-2xl max-h-[90vh] sm:max-h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-4 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-2">
            <Icon name="BookOpen" size={16} className="text-gold" />
            <span className="font-title text-gold tracking-widest uppercase text-sm">
              Журнал Одиссея
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-9 h-9 text-white/30 hover:text-white/70 transition-colors active:scale-95"
          >
            <Icon name="X" size={18} />
          </button>
        </div>

        {/* Entries */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-5">
          {entries.length === 0 ? (
            <p className="text-white/30 text-sm text-center py-8">
              Журнал пуст. Твой путь только начинается.
            </p>
          ) : (
            entries.map((entry, idx) => (
              <div key={idx} className="animate-fade-in">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-crimson text-[11px] font-title tracking-widest uppercase">
                    {entry.chapter}
                  </span>
                  <div className="flex-1 h-px bg-white/5" />
                  <span className="text-white/20 text-[10px]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-parchment/50 text-xs font-title uppercase tracking-wider mb-1">
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

        {/* Mobile close button */}
        <div className="sm:hidden px-4 py-3 border-t border-white/5 shrink-0">
          <button
            onClick={onClose}
            className="w-full py-3.5 font-title text-sm tracking-widest uppercase text-parchment/50 border border-white/10 active:scale-[0.99] min-h-[48px]"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}
