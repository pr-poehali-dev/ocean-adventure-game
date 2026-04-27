import { useEffect, useRef, useState, useCallback } from "react";
import { Howl, Howler } from "howler";

const TRACKS: Record<string, string> = {
  ambience_sea:
    "https://cdn.freesound.org/previews/545/545377_5674468-lq.mp3",
  ambience_cave:
    "https://cdn.freesound.org/previews/400/400274_7095723-lq.mp3",
  ambience_underworld:
    "https://cdn.freesound.org/previews/478/478687_10543393-lq.mp3",
  ambience_storm:
    "https://cdn.freesound.org/previews/361/361816_6436898-lq.mp3",
  title:
    "https://cdn.freesound.org/previews/612/612095_5674468-lq.mp3",
};

const SFX: Record<string, string> = {
  choice_click:
    "https://cdn.freesound.org/previews/242/242501_4284968-lq.mp3",
  result_good:
    "https://cdn.freesound.org/previews/320/320775_5260872-lq.mp3",
  result_bad:
    "https://cdn.freesound.org/previews/414/414700_7095723-lq.mp3",
  page_turn:
    "https://cdn.freesound.org/previews/261/261855_4921277-lq.mp3",
};

const CHAPTER_AMBIENCE: Record<string, keyof typeof TRACKS> = {
  prologue: "ambience_sea",
  ch1_cave: "ambience_cave",
  ch1_escape_plan: "ambience_cave",
  ch1_goats: "ambience_cave",
  ch1_shouting: "ambience_storm",
  ch2_aeaea: "ambience_sea",
  ch2_bedroom: "ambience_sea",
  ch3_hades: "ambience_underworld",
  ch3_tiresias: "ambience_underworld",
  ch4_sirens: "ambience_storm",
  ch4_scylla: "ambience_storm",
  ch5_helios: "ambience_sea",
  ch5_departure: "ambience_storm",
  finale: "ambience_sea",
  finale_bow: "ambience_sea",
  ending: "ambience_sea",
  gameover_circe: "ambience_cave",
  gameover_sirens: "ambience_storm",
  gameover_helios: "ambience_storm",
  gameover_finale: "ambience_cave",
};

export function useAudio() {
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const currentBgRef = useRef<Howl | null>(null);
  const currentTrackKey = useRef<string>("");
  const sfxCache = useRef<Record<string, Howl>>({});

  const playAmbience = useCallback(
    (sceneId: string) => {
      const trackKey = CHAPTER_AMBIENCE[sceneId] ?? "ambience_sea";
      if (trackKey === currentTrackKey.current) return;

      if (currentBgRef.current) {
        const old = currentBgRef.current;
        old.fade(volume, 0, 800);
        setTimeout(() => old.stop(), 900);
      }

      currentTrackKey.current = trackKey;
      const url = TRACKS[trackKey];
      const howl = new Howl({
        src: [url],
        loop: true,
        volume: 0,
        html5: true,
      });

      if (!muted) {
        howl.play();
        howl.fade(0, volume, 1000);
      }
      currentBgRef.current = howl;
    },
    [muted, volume]
  );

  const playSfx = useCallback(
    (name: keyof typeof SFX) => {
      if (muted) return;
      if (!sfxCache.current[name]) {
        sfxCache.current[name] = new Howl({
          src: [SFX[name]],
          volume: 0.5,
          html5: true,
        });
      }
      sfxCache.current[name].play();
    },
    [muted]
  );

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      Howler.mute(next);
      return next;
    });
  }, []);

  const changeVolume = useCallback((v: number) => {
    setVolume(v);
    Howler.volume(v);
  }, []);

  useEffect(() => {
    return () => {
      currentBgRef.current?.stop();
    };
  }, []);

  const playTitle = useCallback(() => {
    if (currentTrackKey.current === "title") return;

    if (currentBgRef.current) {
      const old = currentBgRef.current;
      old.fade(volume, 0, 800);
      setTimeout(() => old.stop(), 900);
    }

    currentTrackKey.current = "title";
    const howl = new Howl({
      src: [TRACKS.title],
      loop: true,
      volume: 0,
      html5: true,
    });

    howl.play();
    howl.fade(0, volume * 0.7, 2000);
    currentBgRef.current = howl;
  }, [volume]);

  const stopTitle = useCallback(() => {
    if (currentTrackKey.current === "title" && currentBgRef.current) {
      const old = currentBgRef.current;
      old.fade(volume * 0.7, 0, 1200);
      setTimeout(() => old.stop(), 1300);
      currentBgRef.current = null;
      currentTrackKey.current = "";
    }
  }, [volume]);

  return { muted, volume, toggleMute, changeVolume, playAmbience, playSfx, playTitle, stopTitle };
}