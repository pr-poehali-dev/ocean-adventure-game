interface ResultOverlayProps {
  result: string;
  onContinue: () => void;
}

export default function ResultOverlay({ result, onContinue }: ResultOverlayProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 p-3 sm:p-6 pointer-events-none">
      <div className="w-full max-w-xl mx-auto pointer-events-auto animate-slide-up">
        <div className="bg-[#0d0a0a]/97 border border-crimson/30 rounded-sm p-4 sm:p-5 shadow-2xl relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crimson/60 to-transparent" />
          <p className="text-parchment text-sm sm:text-base leading-relaxed mb-4 font-display sm:text-[17px]">
            {result}
          </p>
          <button
            onClick={onContinue}
            className="w-full py-3.5 font-title text-sm tracking-widest uppercase text-gold border border-gold/30 hover:border-gold/60 hover:bg-gold/5 transition-all duration-200 active:scale-[0.99] min-h-[48px]"
          >
            Продолжить
          </button>
        </div>
      </div>
    </div>
  );
}
