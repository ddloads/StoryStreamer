// client/src/context/MediaPlayerContext.js
import React, { createContext, useState } from 'react';

export const MediaPlayerContext = createContext();

export const MediaPlayerProvider = ({ children }) => {
  const [mediaPlayer, setMediaPlayer] = useState({
    audiobook: null,
    isPlaying: false,
  });

  const onPlayPause = () => {
    setMediaPlayer((prev) => ({
      ...prev,
      isPlaying: !prev.isPlaying,
    }));
  };

  const onSkip = () => {
    // Implement skip functionality
  };

  const onRewind = () => {
    // Implement rewind functionality
  };

  return (
    <MediaPlayerContext.Provider
      value={{ mediaPlayer, setMediaPlayer, onPlayPause, onSkip, onRewind }}
    >
      {children}
    </MediaPlayerContext.Provider>
  );
};
