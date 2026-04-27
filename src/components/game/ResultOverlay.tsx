interface ResultOverlayProps {
  result: string;
  onContinue: () => void;
}

export default function ResultOverlay({ result, onContinue }: ResultOverlayProps) {
  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center p-6 pointer-events-none">
      <div className="w-full max-w-xl pointer-events-auto animate-slide-up">
        <div className="bg-[#0d0a0a]/95 border border-crimson/30 rounded-sm p-5 shadow-2xl relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crimson/60 to-transparent" />
          <p className="text-parchment text-base leading-relaxed mb-4 font-display text-[17px]">
            {result}
          </p>
          <button
            onClick={onContinue}
            className="w-full py-2.5 font-title text-sm tracking-widest uppercase text-gold border border-gold/30 hover:border-gold/60 hover:bg-gold/5 transition-all duration-200"
          >
            Продолжить
          </button>
        </div>
      </div>
    </div>
  );
}
