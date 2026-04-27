import { Stats } from "@/data/gameData";
import Icon from "@/components/ui/icon";

interface StatsPanelProps {
  stats: Stats;
}

export default function StatsPanel({ stats }: StatsPanelProps) {
  const mindLabel =
    stats.mind > 15
      ? "Мудрый"
      : stats.mind < -15
        ? "Гордец"
        : "Уравновешенный";

  const wrathColor =
    stats.poseidonWrath >= 60
      ? "from-blue-700 to-blue-900"
      : stats.poseidonWrath >= 30
        ? "from-blue-600 to-blue-800"
        : "from-blue-900 to-slate-900";

  const shipIcon = stats.shipIntact ? "Anchor" : "AlertTriangle";
  const shipLabel = stats.shipIntact ? "Цел" : "Повреждён";
  const shipColor = stats.shipIntact ? "text-gold" : "text-crimson";

  return (
    <div className="bg-black/60 border border-white/5 rounded-sm p-3 space-y-2.5 text-xs font-title tracking-wide">
      <div className="text-white/30 uppercase text-[10px] tracking-widest mb-3">
        Статус Одиссея
      </div>

      {/* Health */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1.5 text-parchment/80">
            <Icon name="Heart" size={11} className="text-crimson" />
            Здоровье
          </span>
          <span className="text-parchment">{stats.health}%</span>
        </div>
        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full stat-bar rounded-full transition-all duration-700"
            style={{ width: `${stats.health}%` }}
          />
        </div>
      </div>

      {/* Mind */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1.5 text-parchment/80">
            <Icon name="Brain" size={11} className="text-gold" />
            Разум
          </span>
          <span className="text-gold text-[11px]">{mindLabel}</span>
        </div>
        <div className="h-1 bg-white/5 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-amber-700 to-amber-500 rounded-full transition-all duration-700 absolute"
            style={{
              left: "50%",
              width: `${Math.abs(stats.mind)}%`,
              transform: stats.mind >= 0 ? "translateX(0)" : "translateX(-100%)",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-px h-full bg-white/20" />
          </div>
        </div>
      </div>

      {/* Poseidon's wrath */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1.5 text-parchment/80">
            <Icon name="Waves" size={11} className="text-blue-400" />
            Гнев Посейдона
          </span>
          <span className="text-blue-400">{stats.poseidonWrath}</span>
        </div>
        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${wrathColor} rounded-full transition-all duration-700`}
            style={{ width: `${stats.poseidonWrath}%` }}
          />
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/5 pt-2 flex gap-3">
        {/* Ship */}
        <div className="flex items-center gap-1.5">
          <Icon name={shipIcon} size={11} className={shipColor} />
          <span className={`${shipColor} text-[11px]`}>Корабль: {shipLabel}</span>
        </div>

        {/* Crew */}
        <div className="flex items-center gap-1.5 ml-auto">
          <Icon name="Users" size={11} className="text-parchment/60" />
          <span className="text-parchment/60 text-[11px]">
            Команда: {stats.crewCount}
          </span>
        </div>
      </div>
    </div>
  );
}
