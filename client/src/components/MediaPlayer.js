import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';

const MediaPlayer = ({ audiobook, onClose }) => {
  // State for playing status and Howl instance
  const [isPlaying, setIsPlaying] = useState(false);
  const [howl, setHowl] = useState(null);

  // Effect to handle audio loading
  useEffect(() => {
    if (audiobook && audiobook.filepath) {
      const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      
      // Handle filepath as an array
      const filepaths = Array.isArray(audiobook.filepath) 
        ? audiobook.filepath 
        : audiobook.filepath.split(';');

      // Construct the audio URL
      const audioUrl = `${baseUrl}/api/audio?filepath=${encodeURIComponent(filepaths[0])}`;

      console.log('Audio URL:', audioUrl); // For debugging

      const audio = new Howl({
        src: [audioUrl],
        html5: true, // Force HTML5 Audio
        format: ['mp3', 'm4b', 'm4a', 'aac', 'ogg', 'wma', 'flac', 'alac', 'wav'],
      });

      audio.on('load', () => {
        console.log('Audio loaded');
      });

      audio.on('play', () => {
        console.log('Audio is playing');
      });

      audio.on('pause', () => {
        console.log('Audio is paused');
      });

      audio.on('stop', () => {
        console.log('Audio is stopped');
      });

      setHowl(audio);

      return () => {
        audio.unload();
      };
    }
  }, [audiobook]);

  // Effect to handle play/pause events
  useEffect(() => {
    if (howl) {
      howl.on('play', () => setIsPlaying(true));
      howl.on('pause', () => setIsPlaying(false));
      howl.on('stop', () => setIsPlaying(false));
    }
  }, [howl]);

  // Handle play/pause button
  const handlePlayPause = () => {
    console.log('Play/Pause button clicked');
    if (howl) {
      if (isPlaying) {
        console.log('Pausing audio');
        howl.pause();
      } else {
        console.log('Playing audio');
        howl.play();
      }
    }
  };

  // Handle seek forward/backward
  const handleSeek = (direction) => {
    if (howl) {
      const currentTime = howl.seek();
      console.log(`Seeking ${direction * 10} seconds from current time: ${currentTime}`);
      howl.seek(currentTime + direction * 10);
    }
  };

  if (!audiobook) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center space-x-4">
          <img src={audiobook.coverImage} alt={audiobook.title} className="w-16 h-16 object-cover rounded" />
          <div>
            <h3 className="font-semibold">{audiobook.title}</h3>
            <p className="text-sm text-gray-300">{audiobook.author}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={() => handleSeek(-1)} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
            -10s
          </button>
          <button onClick={handlePlayPause} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button onClick={() => handleSeek(1)} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
            +10s
          </button>
        </div>
        <button onClick={onClose} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
          Close
        </button>
      </div>
    </div>
  );
};

export default MediaPlayer;
