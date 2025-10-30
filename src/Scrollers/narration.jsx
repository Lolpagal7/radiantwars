"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "./narration.module.css";

import AutoPlayAudio from "../audioPlayer/audioPlayer";

const InputDesign = ({}) => {
  // Structured dialogue data for pre-temporal shift
  const preShiftDialogues = [
    {
      text: "They don't understand what they're sitting on. We take the Radianite before someone else does.",
      speaker: "ZYROKK",
      audio: "/audios/InvasionLines/1.mp3",
      duration: 2500,
    },
    {
      text: "Invade, and we light a fire we can't put out. This planet burns easy.",
      speaker: "KAELA",
      audio: "/audios/InvasionLines/2.mp3",
      duration: 3000,
    },
    {
      text: "Strategic models show success is probable... but not without consequence.",
      speaker: "CASE",
      audio: "/audios/InvasionLines/3.mp3",
      duration: 2000,
    },
    {
      text: "We make a move, or we rot up here. Pick one.",
      speaker: "ZYROKK",
      audio: "/audios/InvasionLines/4.mp3",
      duration: 3500,
    },
    {
      text: "Invade or Vanish. Either way, the silence ends TODAY",
      speaker: "SLITHRA",
      audio: "/audios/InvasionLines/4-slithra.mp3",
      duration: 4000,
    },
  ];

  // Structured data for post-warp narrations
  const postWarpNarrations = [
    {
      text: "The invasion was meant to be swift- Effortless.",
      speaker: "AGENT 8",
      audio: "/audios/Agent8/1-Agent8.mp3",
      duration: 1500,
      image:
      "/Images/1.jpg",
    },
    {
      text: "But the humans evolved, weaponsing the same radionite that tempted their invaders.",
      speaker: "AGENT 8",
      audio: "/audios/Agent8/2-Agent8.mp3",
      duration: 1500,
      image:
      "/Images/2.jpg",
    },
    {
      text: "[VALORANT PROTOCOL] was born. The radiants, wielding powers once though alien.",
      speaker: "AGENT 8",
      audio: "/audios/Agent8/3-Agent8.mp3",
      duration: 1500,
      image: "/Images/3.jpg",
    },
    {
      text: "The WAR became more than survival, it becme vengence.",
      speaker: "AGENT 8",
      audio: "/audios/Agent8/4-Agent8.mp3",
      duration: 1500,
      image:
        "/Images/4.jpg",
    },
    {
      text: "Skies burnt, oceans boiled, Earth itself split open under the weight of their conflict.",
      speaker: "AGENT 8",
      audio: "/audios/Agent8/5-Agent8.mp3",
      duration: 1500,
      image: "Images/5.jpg",
    },
    {
      text: "Neither alien, nor human would claim true victory. Only ruins remained to whisper of the Radianite wars",
      speaker: "AGENT 8",
      audio: "/audios/Agent8/6-Agent8.mp3",
      duration: 1500,
      image: "Images/6.jpg",
    },
  ];
  
  // Predefined durations (in milliseconds)
  const typingSpeed = 40;
  const phaseTransitionDelay = 500; // Delay between phase transitions

  // State variables
  const [currentText, setCurrentText] = useState("");
  const [currentSpeaker, setCurrentSpeaker] = useState(
    preShiftDialogues[0].speaker,
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [dialogueComplete, setDialogueComplete] = useState(false);
  const [yearCount, setYearCount] = useState(2024);
  const targetYear = 3187;
  const [showYearSkip, setShowYearSkip] = useState(false);
  const [timeJumpPhase, setTimeJumpPhase] = useState(0);
  const [currentDate, setCurrentDate] = useState("02.14.2024");
  const targetDate = "06.12.2187";
  const [showNewCoordinates, setShowNewCoordinates] = useState(false);
  const [showShift, setShowShift] = useState(false);
  const [narrationMode, setNarrationMode] = useState(false);
  const [fadeState, setFadeState] = useState("in");

  // Audio reference
  const audioRef = useRef(null);

  // Lighting effects with enhanced visibility
  const [lights, setLights] = useState([
    { x: 20, y: 30, opacity: 0.08, size: 240, color: "rgba(204,204,255,0.25)" },
    { x: 70, y: 60, opacity: 0.09, size: 260, color: "rgba(255,204,204,0.25)" },
    { x: 40, y: 80, opacity: 0.08, size: 250, color: "rgba(204,204,255,0.25)" },
    { x: 80, y: 20, opacity: 0.09, size: 270, color: "rgba(255,204,204,0.25)" },
    { x: 10, y: 70, opacity: 0.1, size: 255, color: "rgba(204,204,255,0.25)" },
    { x: 60, y: 40, opacity: 0.08, size: 245, color: "rgba(255,204,204,0.25)" },
  ]);

  // Get current dialogue data
  const getCurrentDialogue = useCallback(() => {
    if (narrationMode) {
      return postWarpNarrations[currentIndex];
    } else {
      return preShiftDialogues[currentIndex];
    }
  }, [currentIndex, narrationMode]);

  useEffect(() => {
    playAudio("/corn.mp3", 0, 0.3)
    if (currentIndex > 0 || narrationMode) {
      const currentDialogue = getCurrentDialogue();
      console.log(
        `${narrationMode ? "Narration" : "Dialogue"} ${currentIndex}: ${currentDialogue.speaker} - "${currentDialogue.text}"`,

        playAudio(currentDialogue.audio, 1, 0.9

        )
      );
    }
  }, [currentIndex, narrationMode, getCurrentDialogue]);

  // Function to progress to next dialogue
  const progressToNextDialogue = useCallback(() => {
    if (currentIndex < preShiftDialogues.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setCurrentText("");
      setTextIndex(0);
      setCurrentSpeaker(preShiftDialogues[currentIndex + 1].speaker);
    } else if (!narrationMode) {
      // Last dialogue, transition to time jump sequence
      setDialogueComplete(true);

      setTimeout(() => {
        setTimeJumpPhase(1);

        setTimeout(() => {
          setTimeJumpPhase(2);
          setShowYearSkip(true);
          setShowShift(true);

          const yearInterval = setInterval(() => {
            setYearCount((prev) => {
              const newValue = prev + Math.ceil((targetYear - prev) / 20);
              if (newValue >= targetYear) {
                clearInterval(yearInterval);
                setTimeout(() => {
                  setShowNewCoordinates(true);

                  setTimeout(() => {
                    setShowShift(false);
                    setTimeJumpPhase(3);

                    setTimeout(() => {
                      // Transition to narration mode
                      setNarrationMode(true);
                      setCurrentIndex(0);
                      setCurrentText("");
                      setTextIndex(0);
                      setCurrentSpeaker(postWarpNarrations[0].speaker);
                    }, phaseTransitionDelay);
                  }, phaseTransitionDelay);
                }, 1000);
                return targetYear;
              }
              return newValue;
            });
          }, 50);
        }, phaseTransitionDelay);
      }, phaseTransitionDelay);
    }
  }, [currentIndex, narrationMode, preShiftDialogues, postWarpNarrations]);

  // Function to progress to next narration
  const progressToNextNarration = useCallback(() => {
    if (currentIndex < postWarpNarrations.length - 1) {
      setFadeState("out");

      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setCurrentText("");
        setTextIndex(0);
        setCurrentSpeaker(postWarpNarrations[currentIndex + 1].speaker);
        setFadeState("in");
      }, 1000);
    }
  }, [currentIndex, postWarpNarrations]);

  // Initial console log and audio for first dialogue
  useEffect(() => {
    const firstDialogue = preShiftDialogues[0];
    console.log(
      `Dialogue ${currentIndex}: ${firstDialogue.speaker} - "${firstDialogue.text}"`,
    );
    playAudio(firstDialogue.audio);
  }, []);

  // Typing animation effect
  useEffect(() => {
    const currentDialogue = getCurrentDialogue();

    if (textIndex < currentDialogue.text.length) {
      const typingTimer = setTimeout(() => {
        setCurrentText((prev) => prev + currentDialogue.text[textIndex]);
        setTextIndex((prev) => prev + 1);

        if (textIndex + 1 === currentDialogue.text.length) {
          // Text is fully typed, wait for the specified duration before progressing
          setTimeout(() => {
            if (narrationMode) {
              progressToNextNarration();
            } else {
              progressToNextDialogue();
            }
          }, currentDialogue.duration);
        }
      }, typingSpeed);

      return () => clearTimeout(typingTimer);
    }
  }, [
    currentIndex,
    textIndex,
    narrationMode,
    getCurrentDialogue,
    progressToNextDialogue,
    progressToNextNarration,
  ]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorTimer);
  }, []);

  // Ambient light movement effect with enhanced parameters
  useEffect(() => {
    const lightTimer = setInterval(() => {
      setLights((prevLights) =>
        prevLights.map((light) => ({
          ...light,
          x: light.x + (Math.random() - 0.5) * 0.2,
          y: light.y + (Math.random() - 0.5) * 0.2,
          opacity: Math.max(
            0.07,
            Math.min(0.12, light.opacity + (Math.random() - 0.5) * 0.005),
          ),
          size: Math.max(
            240,
            Math.min(280, light.size + (Math.random() - 0.5) * 2),
          ),
        })),
      );
    }, 200);

    return () => clearInterval(lightTimer);
  }, []);

  // Get current image for narration mode
  const getCurrentImage = useCallback(() => {
    if (narrationMode && currentIndex < postWarpNarrations.length) {
      return postWarpNarrations[currentIndex].image;
    }
    return "";
  }, [narrationMode, currentIndex, postWarpNarrations]);

  const [audioInstances, setAudioInstances] = useState([]);
  
      const playAudio = (src, repeat = 1, volume = 1, forceShut = 0) => {
        
          const key = Date.now() + Math.random(); // safer unique key
        
          setAudioInstances((prevInstances) => [
            ...prevInstances,
            <AutoPlayAudio
              key={key}
              src={src}
              repeat={repeat}
              volume={volume}
              onEnd={() => handleAudioEnd(key)} // cleanup
              duration={forceShut}
            />,
          ]);
        };
        
      const handleAudioEnd = (key) => {
          setAudioInstances((prevInstances) =>
            prevInstances.filter((audio) => audio.key !== key)
          );
      };

  return (
    <>
    {audioInstances}
      <section className={styles.container}>
        {/* Hidden audio element for sound playback */}
        <audio ref={audioRef} style={{ display: "none" }} />

        {/* Ambient light effects */}
        {lights.map((light, index) => (
          <div
            key={`light-${index}`}
            className={styles.lightEffect}
            style={{
              left: `${light.x}%`,
              top: `${light.y}%`,
              opacity: light.opacity,
              width: `${light.size}px`,
              height: `${light.size}px`,
              backgroundColor: light.color,
            }}
          />
        ))}

        {/* Scanline effect */}
        <div
          className={styles.scanlineEffect}
          style={{
            opacity: timeJumpPhase === 1 ? 0.15 : 0,
            background:
              "repeating-linear-gradient(180deg, #000 0%, rgba(204,204,204,0.2) 50%, #000 100%)",
          }}
        />

        {/* Narration image */}
        {narrationMode && (
          <div
            className={styles.imageContainer}
            style={{ opacity: fadeState === "in" ? 1 : 0 }}
          >
            <img
              src={postWarpNarrations[currentIndex].image}
              alt={`Scene ${currentIndex + 1}`}
              className={styles.fullImage}
            />
          </div>
        )}

        {/* Coordinates panel */}
        <header
          className={styles.coordinatesPanel}
          style={{ opacity: timeJumpPhase >= 1 ? 1 : 0 }}
        >
          <h2 className={styles.coordinatesLabel}>TEMPORAL COORDINATES</h2>
          <p className={styles.coordinatesValue}>
            {showNewCoordinates ? targetDate : currentDate}
          </p>
          {showShift && (
            <p
              className={styles.yearShift}
              style={{ opacity: showShift ? 1 : 0 }}
            >
              +163 YEARS
            </p>
          )}
        </header>

        {/* Gradient overlay for narration mode */}
        {narrationMode && <div className={styles.gradientOverlay} />}

        {/* Main content container */}
        <main className={styles.contentContainer}>
          {/* Dialogue section */}
          {!dialogueComplete && !narrationMode && (
            <article className={styles.dialogueContainer}>
              <h3 className={styles.speakerLabel}>{currentSpeaker}</h3>
              <div className={styles.textContainer}>
                <p className={styles.dialogueText}>{currentText}</p>
                <span
                  className={styles.cursor}
                  style={{ opacity: cursorVisible ? 1 : 0 }}
                >
                  _
                </span>
              </div>
            </article>
          )}

          {/* Time jump section */}
          {timeJumpPhase >= 1 && !narrationMode && (
            <div className={styles.timeJumpContainer}>
              {showYearSkip && (
                <div
                  className={styles.yearSkipContainer}
                  style={{ opacity: timeJumpPhase === 3 ? 0 : 1 }}
                >
                  <h3 className={styles.timeJumpLabel}>
                    TEMPORAL DISPLACEMENT
                  </h3>
                  <p className={styles.yearCounter}>{yearCount}</p>
                  <div className={styles.divider} />
                </div>
              )}
            </div>
          )}
        </main>

        {/* Narration text container */}
        {narrationMode && (
          <footer
            className={styles.narrationContainer}
            style={{ opacity: fadeState === "in" ? 1 : 0 }}
          >
            <h3 className={styles.speakerLabel}>{currentSpeaker}</h3>
            <div className={styles.textContainer}>
              <p className={styles.dialogueText}>{currentText}</p>
              <span
                className={styles.cursor}
                style={{ opacity: cursorVisible ? 1 : 0 }}
              >
                _
              </span>
            </div>
          </footer>
        )}
      </section>

      {/* Font loading */}
      <link
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap"
        rel="stylesheet"
      />
    </>
  );
};

export default InputDesign;
