import { Scene, Choice } from "@/data/gameData";
import Icon from "@/components/ui/icon";

interface SceneViewProps {
  scene: Scene;
  onChoice: (choice: Choice) => void;
  showResult: boolean;
}

export default function SceneView({ scene, onChoice, showResult }: SceneViewProps) {
  return (
    <div className="animate-fade-in">
      {/* Chapter label */}
      <div className="flex items-center gap-3 mb-5">
        <div className="h-px flex-1 bg-crimson/30" />
        <span className="font-title text-[11px] tracking-widest uppercase text-crimson/80">
          {scene.chapter}
        </span>
        <div className="h-px flex-1 bg-crimson/30" />
      </div>

      {/* Image */}
      {scene.image && (
        <div className="relative mb-5 rounded-sm overflow-hidden">
          <img
            src={scene.image}
            alt={scene.title}
            className="w-full h-48 md:h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0808] via-transparent to-transparent" />
          <div className="vignette absolute inset-0" />
        </div>
      )}

      {/* Title */}
      <h2 className="font-title text-2xl md:text-3xl text-parchment uppercase tracking-wider mb-4">
        {scene.title}
      </h2>

      {/* Story text */}
      <div className="mb-6">
        {scene.text.split("\n\n").map((paragraph, i) => (
          <p
            key={i}
            className="text-parchment/80 text-[17px] leading-relaxed font-display mb-3 last:mb-0"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {/* Choices */}
      {!showResult && scene.choices.length > 0 && (
        <div className="space-y-3 animate-slide-up">
          {scene.choices.length > 1 && (
            <div className="flex items-center gap-2 mb-2">
              <Icon name="GitFork" size={12} className="text-white/20" />
              <span className="text-white/20 text-[10px] font-title tracking-widest uppercase">
                Твой выбор
              </span>
            </div>
          )}
          {scene.choices.map((choice) => (
            <button
              key={choice.id}
              onClick={() => onChoice(choice)}
              className="choice-btn w-full text-left px-4 py-3.5 rounded-sm"
            >
              <span className="text-parchment text-base font-display leading-snug">
                {choice.text}
              </span>
            </button>
          ))}
        </div>
      )}

      {showResult && (
        <div className="h-32" />
      )}
    </div>
  );
}
