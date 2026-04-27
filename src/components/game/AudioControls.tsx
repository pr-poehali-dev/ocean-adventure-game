import Icon from "@/components/ui/icon";

interface AudioControlsProps {
  muted: boolean;
  volume: number;
  onToggleMute: () => void;
  onVolumeChange: (v: number) => void;
}

export default function AudioControls({
  muted,
  volume,
  onToggleMute,
  onVolumeChange,
}: AudioControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onToggleMute}
        title={muted ? "Включить звук" : "Выключить звук"}
        className="flex items-center justify-center w-7 h-7 text-parchment/40 hover:text-gold transition-colors"
      >
        <Icon name={muted ? "VolumeX" : "Volume2"} size={14} />
      </button>
      {!muted && (
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={volume}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
          className="w-16 h-1 accent-amber-700 cursor-pointer"
          title="Громкость"
        />
      )}
    </div>
  );
}
