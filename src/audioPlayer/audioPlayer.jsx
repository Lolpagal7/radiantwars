import { useEffect, useRef } from 'react';

function AutoPlayAudio({ src, repeat = 1, volume = 1, onEnd, duration = 0 }) {
  const audioRef = useRef();

  useEffect(() => {
    if (audioRef.current) {
      // Set the audio file source
      audioRef.current.src = src;

      // Set the repeat behavior
      if (repeat === 0) {
        audioRef.current.loop = true; // Infinite loop if repeat is 0
      } else {
        audioRef.current.loop = false;
        audioRef.current.onended = () => {
          if (repeat > 1) {
            // Decrease repeat count and restart audio
            audioRef.current.play();
            repeat -= 1;
          } else {
            onEnd(); // Trigger cleanup when audio finishes playing
          }
        };
      }

      // Set the volume
      audioRef.current.volume = volume;

      // Play the audio
      audioRef.current.play();

      // Set a timeout for the force shutdown
      if (duration > 0) {
        const timeoutId = setTimeout(() => {
          audioRef.current.pause(); // Force shutdown
          audioRef.current.currentTime = 0; // Reset playback time
          onEnd(); // Trigger cleanup when audio stops
        }, duration);

        // Cleanup timeout on component unmount
        return () => clearTimeout(timeoutId);
      }
    }
    
    return () => {
      // Cleanup audio element if it's still in the DOM
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, [src, repeat, volume, onEnd, duration]); // Run effect again if src, repeat, volume, or duration changes

  return (
    <audio ref={audioRef} />
  );
}

export default AutoPlayAudio;
