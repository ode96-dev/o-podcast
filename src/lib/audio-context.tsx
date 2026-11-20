"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { Episode } from "@/types/podcast";
import { EPISODES } from "./data";

interface AudioContextType {
  currentEpisode: Episode;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackRate: number;
  volume: number;
  isMuted: boolean;
  isPlayerExpanded: boolean;
  playEpisode: (episode: Episode) => void;
  togglePlay: () => void;
  seek: (seconds: number) => void;
  skipBy: (seconds: number) => void;
  setSpeed: (rate: number) => void;
  setVolumeLevel: (val: number) => void;
  toggleMute: () => void;
  nextEpisode: () => void;
  previousEpisode: () => void;
  toggleExpandPlayer: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentEpisode, setCurrentEpisode] = useState<Episode>(EPISODES[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(EPISODES[0].durationSeconds);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const initialEpisodeRef = useRef(currentEpisode);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audio.src = initialEpisodeRef.current.audioUrl;
    audioRef.current = audio;

    const onTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };

    const onLoadedMetadata = () => {
      if (audioRef.current && audioRef.current.duration) {
        setDuration(
          Math.max(
            audioRef.current.duration,
            initialEpisodeRef.current.durationSeconds,
          ),
        );
      }
    };

    const onEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const playEpisode = useCallback(
    (episode: Episode) => {
      setCurrentEpisode(episode);
      setCurrentTime(0);
      setDuration(episode.durationSeconds);
      if (audioRef.current) {
        audioRef.current.src = episode.audioUrl;
        audioRef.current.currentTime = 0;
        audioRef.current.playbackRate = playbackRate;
        audioRef.current.volume = isMuted ? 0 : volume;
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            setIsPlaying(true);
          });
      } else {
        setIsPlaying(true);
      }
    },
    [playbackRate, volume, isMuted],
  );

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(true);
        });
    }
  }, [isPlaying]);

  const seek = useCallback((seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = seconds;
      setCurrentTime(seconds);
    }
  }, []);

  const skipBy = useCallback(
    (seconds: number) => {
      if (audioRef.current) {
        const nextTime = Math.max(
          0,
          Math.min(audioRef.current.currentTime + seconds, duration),
        );
        audioRef.current.currentTime = nextTime;
        setCurrentTime(nextTime);
      }
    },
    [duration],
  );

  const setSpeed = useCallback((rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  }, []);

  const setVolumeLevel = useCallback((val: number) => {
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      if (val === 0) setIsMuted(true);
      else setIsMuted(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  }, [isMuted, volume]);

  const nextEpisode = useCallback(() => {
    const currentIndex = EPISODES.findIndex((e) => e.id === currentEpisode.id);
    const nextIdx = (currentIndex + 1) % EPISODES.length;
    playEpisode(EPISODES[nextIdx]);
  }, [currentEpisode, playEpisode]);

  const previousEpisode = useCallback(() => {
    const currentIndex = EPISODES.findIndex((e) => e.id === currentEpisode.id);
    const prevIdx = (currentIndex - 1 + EPISODES.length) % EPISODES.length;
    playEpisode(EPISODES[prevIdx]);
  }, [currentEpisode, playEpisode]);

  const toggleExpandPlayer = useCallback(() => {
    setIsPlayerExpanded((prev) => !prev);
  }, []);

  return (
    <AudioContext.Provider
      value={{
        currentEpisode,
        isPlaying,
        currentTime,
        duration,
        playbackRate,
        volume,
        isMuted,
        isPlayerExpanded,
        playEpisode,
        togglePlay,
        seek,
        skipBy,
        setSpeed,
        setVolumeLevel,
        toggleMute,
        nextEpisode,
        previousEpisode,
        toggleExpandPlayer,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
