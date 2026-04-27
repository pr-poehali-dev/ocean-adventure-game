import { useEffect, useState } from "react";
import { useGameState } from "@/hooks/useGameState";
import { useAudio } from "@/hooks/useAudio";
import StatsPanel from "@/components/game/StatsPanel";
import SceneView from "@/components/game/SceneView";
import ResultOverlay from "@/components/game/ResultOverlay";
import JournalPanel from "@/components/game/JournalPanel";
import EndingScreen from "@/components/game/EndingScreen";
import AudioControls from "@/components/game/AudioControls";
import TitleScreen from "@/components/game/TitleScreen";
import Icon from "@/components/ui/icon";

export default function Index() {
  const [gameStarted, setGameStarted] = useState(false);

  const {
    state,
    currentScene,
    makeChoice,
    continueToNext,
    toggleJournal,
    restartGame,
  } = useGameState();

  const { muted, volume, toggleMute, changeVolume, playAmbience, playSfx } =
    useAudio();

  useEffect(() => {
    if (gameStarted && state.currentSceneId) {
      playAmbience(state.currentSceneId);
    }
  }, [state.currentSceneId, playAmbience, gameStarted]);

  const handleStart = () => {
    setGameStarted(true);
  };

  const handleRestart = () => {
    restartGame();
    setGameStarted(false);
  };

  const handleChoice = (choice: Parameters<typeof makeChoice>[0]) => {
    playSfx("choice_click");
    makeChoice(choice);
  };

  const handleContinue = () => {
    playSfx("page_turn");
    continueToNext();
  };

  if (!gameStarted) {
    return <TitleScreen onStart={handleStart} />;
  }

  const isEnding = state.isGameOver || state.isVictory;

  if (isEnding && currentScene?.isEnding) {
    return (
      <>
        <EndingScreen
          isVictory={state.isVictory}
          isGameOver={state.isGameOver}
          stats={state.stats}
          journal={state.journal}
          sceneTitle={currentScene.title}
          sceneText={currentScene.text}
          sceneImage={currentScene.image}
          onRestart={handleRestart}
          onJournal={toggleJournal}
        />
        {state.showJournal && (
          <JournalPanel entries={state.journal} onClose={toggleJournal} />
        )}
      </>
    );
  }

  return (
    <div className="grain min-h-screen bg-[#0a0808]">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-[#0a0808]/90 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 bg-crimson animate-pulse-slow" />
            <span className="font-title text-sm tracking-widest uppercase text-parchment/70">
              Одиссея: Путь домой
            </span>
          </div>

          <div className="flex items-center gap-3">
            <AudioControls
              muted={muted}
              volume={volume}
              onToggleMute={toggleMute}
              onVolumeChange={changeVolume}
            />
            <button
              onClick={toggleJournal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-parchment/50 hover:text-gold transition-colors border border-white/5 hover:border-gold/30 text-xs font-title tracking-wider uppercase"
            >
              <Icon name="BookOpen" size={13} />
              Журнал
              {state.journal.length > 0 && (
                <span className="ml-1 text-gold/60">
                  {state.journal.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        {/* Stats sidebar */}
        <aside className="lg:w-56 shrink-0">
          <div className="lg:sticky lg:top-20">
            <StatsPanel stats={state.stats} />
          </div>
        </aside>

        {/* Scene content */}
        <main className="flex-1 min-w-0 pb-32">
          {currentScene && (
            <SceneView
              scene={currentScene}
              onChoice={handleChoice}
              showResult={state.showResult}
            />
          )}
        </main>
      </div>

      {/* Result overlay */}
      {state.showResult && (
        <ResultOverlay result={state.lastResult} onContinue={handleContinue} />
      )}

      {/* Journal */}
      {state.showJournal && (
        <JournalPanel entries={state.journal} onClose={toggleJournal} />
      )}
    </div>
  );
}
