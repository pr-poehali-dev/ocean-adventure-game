import { useState, useCallback, useEffect } from "react";
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

const SAVE_KEY = "odyssey_save_v1";
const STARTED_KEY = "odyssey_started_v1";

const INITIAL_STATE: GameState = {
  currentSceneId: "prologue",
  stats: { ...INITIAL_STATS },
  journal: [],
  isGameOver: false,
  isVictory: false,
  showJournal: false,
  showResult: false,
  lastResult: "",
  pendingNextScene: "",
};

function loadSave(): { state: GameState; started: boolean } {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    const started = localStorage.getItem(STARTED_KEY) === "true";
    if (raw) {
      const parsed = JSON.parse(raw) as GameState;
      return { state: { ...INITIAL_STATE, ...parsed, showJournal: false }, started };
    }
  } catch {
    // ignore
  }
  return { state: { ...INITIAL_STATE }, started: false };
}

function saveToDisk(state: GameState) {
  try {
    const { showJournal, ...rest } = state;
    localStorage.setItem(SAVE_KEY, JSON.stringify(rest));
  } catch {
    // ignore
  }
}

const clampHealth = (v: number) => Math.max(0, Math.min(100, v));
const clampMind = (v: number) => Math.max(-50, Math.min(50, v));
const clampWrath = (v: number) => Math.max(0, Math.min(100, v));

export function useGameState() {
  const saved = loadSave();
  const [state, setState] = useState<GameState>(saved.state);
  const [gameStartedOnDisk] = useState(saved.started);

  // Автосохранение при каждом изменении состояния
  useEffect(() => {
    saveToDisk(state);
  }, [state]);

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
    const fresh = { ...INITIAL_STATE, stats: { ...INITIAL_STATS } };
    setState(fresh);
    localStorage.removeItem(SAVE_KEY);
    localStorage.removeItem(STARTED_KEY);
  }, []);

  const markStarted = useCallback(() => {
    localStorage.setItem(STARTED_KEY, "true");
  }, []);

  const hasSave =
    gameStartedOnDisk &&
    saved.state.currentSceneId !== "prologue" &&
    !saved.state.isGameOver &&
    !saved.state.isVictory;

  return {
    state,
    currentScene,
    makeChoice,
    continueToNext,
    toggleJournal,
    restartGame,
    markStarted,
    hasSave,
  };
}
