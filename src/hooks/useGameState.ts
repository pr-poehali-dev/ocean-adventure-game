import { useState, useCallback } from "react";
import { Stats, INITIAL_STATS, SCENES, Scene, Choice } from "@/data/gameData";

export interface JournalEntry {
  chapter: string;
  title: string;
  choiceText: string;
  resultText: string;
  timestamp: number;
}

export interface GameState {
  currentSceneId: string;
  stats: Stats;
  journal: JournalEntry[];
  isGameOver: boolean;
  isVictory: boolean;
  showJournal: boolean;
  showResult: boolean;
  lastResult: string;
  pendingNextScene: string;
}

const clampHealth = (v: number) => Math.max(0, Math.min(100, v));
const clampMind = (v: number) => Math.max(-50, Math.min(50, v));
const clampWrath = (v: number) => Math.max(0, Math.min(100, v));

export function useGameState() {
  const [state, setState] = useState<GameState>({
    currentSceneId: "prologue",
    stats: { ...INITIAL_STATS },
    journal: [],
    isGameOver: false,
    isVictory: false,
    showJournal: false,
    showResult: false,
    lastResult: "",
    pendingNextScene: "",
  });

  const currentScene: Scene = SCENES[state.currentSceneId];

  const makeChoice = useCallback((choice: Choice) => {
    setState((prev) => {
      const newStats = { ...prev.stats };

      if (choice.statChanges) {
        const c = choice.statChanges;
        if (c.health !== undefined)
          newStats.health = clampHealth(newStats.health + c.health);
        if (c.mind !== undefined)
          newStats.mind = clampMind(newStats.mind + c.mind);
        if (c.poseidonWrath !== undefined)
          newStats.poseidonWrath = clampWrath(
            newStats.poseidonWrath + c.poseidonWrath
          );
        if (c.shipIntact !== undefined) newStats.shipIntact = c.shipIntact;
        if (c.crewLost !== undefined)
          newStats.crewCount = Math.max(0, newStats.crewCount - c.crewLost);
        if (c.crewCount !== undefined) newStats.crewCount = c.crewCount;
      }

      const scene = SCENES[prev.currentSceneId];
      const entry: JournalEntry = {
        chapter: scene.chapter,
        title: scene.title,
        choiceText: choice.text,
        resultText: choice.result,
        timestamp: Date.now(),
      };

      const nextScene = SCENES[choice.nextScene];
      const isOver = choice.isGameOver || newStats.health <= 0;
      const isVictory = choice.nextScene === "ending";

      return {
        ...prev,
        stats: newStats,
        journal: [...prev.journal, entry],
        showResult: true,
        lastResult: choice.result,
        pendingNextScene: choice.nextScene,
        isGameOver: isOver && !isVictory,
        isVictory,
      };
    });
  }, []);

  const continueToNext = useCallback(() => {
    setState((prev) => ({
      ...prev,
      showResult: false,
      currentSceneId: prev.pendingNextScene,
      pendingNextScene: "",
    }));
  }, []);

  const toggleJournal = useCallback(() => {
    setState((prev) => ({ ...prev, showJournal: !prev.showJournal }));
  }, []);

  const restartGame = useCallback(() => {
    setState({
      currentSceneId: "prologue",
      stats: { ...INITIAL_STATS },
      journal: [],
      isGameOver: false,
      isVictory: false,
      showJournal: false,
      showResult: false,
      lastResult: "",
      pendingNextScene: "",
    });
  }, []);

  return {
    state,
    currentScene,
    makeChoice,
    continueToNext,
    toggleJournal,
    restartGame,
  };
}
