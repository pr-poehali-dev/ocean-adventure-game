import { useEffect, useState } from "react";
import { useGameState } from "@/hooks/useGameState";
import { useAudio } from "@/hooks/useAudio";
import { SCENES } from "@/data/gameData";
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
  const [statsOpen, setStatsOpen] = useState(false);

  const {
    state,
    currentScene,
    makeChoice,
    continueToNext,
    toggleJournal,
    restartGame,
    markStarted,
    hasSave,
  } = useGameState();

  const { muted, volume, toggleMute, changeVolume, playAmbience, playSfx, playTitle, stopTitle } =
    useAudio();

  useEffect(() => {
    if (gameStarted && state.currentSceneId) {
      playAmbience(state.currentSceneId);
    }
  }, [state.currentSceneId, playAmbience, gameStarted]);

  const handleStart = () => {
    restartGame();
    markStarted();
    setGameStarted(true);
  };

  const handleContinueSave = () => {
    markStarted();
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

  const handleContinueResult = () => {
    playSfx("page_turn");
    continueToNext();
  };

  const saveChapter = hasSave ? SCENES[state.currentSceneId]?.chapter : undefined;

  if (!gameStarted) {
    return (
      <TitleScreen
        onStart={handleStart}
        onContinue={handleContinueSave}
        onPlayTitle={playTitle}
        onStopTitle={stopTitle}
        hasSave={hasSave}
        saveChapter={saveChapter}
      />
    );
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
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#0a0808]/90 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 h-12 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-1 h-5 shrink-0 bg-crimson animate-pulse-slow" />
            <span className="font-title text-xs sm:text-sm tracking-widest uppercase text-parchment/70 truncate">
              Одиссея
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Stats toggle — только на мобиле */}
            <button
              onClick={() => setStatsOpen((v) => !v)}
              className="lg:hidden flex items-center justify-center w-9 h-9 text-parchment/50 hover:text-gold transition-colors border border-white/5 hover:border-gold/30"
            >
              <Icon name="BarChart2" size={14} />
            </button>

            <AudioControls
              muted={muted}
              volume={volume}
              onToggleMute={toggleMute}
              onVolumeChange={changeVolume}
            />

            <button
              onClick={toggleJournal}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 h-9 text-parchment/50 hover:text-gold transition-colors border border-white/5 hover:border-gold/30 text-[11px] sm:text-xs font-title tracking-wider uppercase"
            >
              <Icon name="BookOpen" size={13} />
              <span className="hidden sm:inline">Журнал</span>
              {state.journal.length > 0 && (
                <span className="text-gold/60">{state.journal.length}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile stats drawer */}
      {statsOpen && (
        <div className="lg:hidden border-b border-white/5 bg-[#0d0a0a] px-3 py-3 animate-fade-in">
          <StatsPanel stats={state.stats} />
        </div>
      )}

      {/* Main layout */}
      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-4 sm:py-6 flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Sidebar — только на десктопе */}
        <aside className="hidden lg:block lg:w-56 shrink-0">
          <div className="lg:sticky lg:top-20">
            <StatsPanel stats={state.stats} />
          </div>
        </aside>

        {/* Scene content */}
        <main className="flex-1 min-w-0 pb-36 sm:pb-40">
          {currentScene && (
            <SceneView
              scene={currentScene}
              onChoice={handleChoice}
              showResult={state.showResult}
            />
          )}
        </main>
      </div>

      {state.showResult && (
        <ResultOverlay result={state.lastResult} onContinue={handleContinueResult} />
      )}

      {state.showJournal && (
        <JournalPanel entries={state.journal} onClose={toggleJournal} />
      )}
    </div>
  );
}
