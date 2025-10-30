"use client";
import React, { useState, useEffect } from "react";
import styles from "./SolarSystemObserver.module.css";

import AutoPlayAudio from "../../audioPlayer/audioPlayer";

// Sample voicelines for demonstration with delay and duration in milliseconds
const SAMPLE_VOICELINES = [
  {
    speaker: "CASE",
    text: "Rebooting consciousness protocols... Welcome back, Operator. You’ve been unconscious for approximately 87 Earth hours.",
    duration: 9000,
    voiceLine: "/audios/SolarSystemVoiceLines/1-Case.mp3"
  },
  {
    speaker: "CASE",
    text: "Commander Zy’Rokk initiated atmospheric orbit and began surface scanning.",
    duration: 11000,
    voiceLine: "/audios/SolarSystemVoiceLines/2-Case.mp3"
  },
  {
    speaker: "CASE",
    text: "Surface analysis revealed a troubling anomaly. Earth is rich in Radianite — but the knowledge is… contained.",
    duration: 11000,
    voiceLine: "/audios/SolarSystemVoiceLines/3-Case.mp3"
  },
  {
    speaker: "CASE",
    text: "Protected zones match known tactical strongholds. Heavily shielded. Guarded by enhanced humans. They call themselves: Radiants.",
    duration: 11000,
    voiceLine: "/audios/SolarSystemVoiceLines/4-Case.mp3"
  },
  {
    speaker: "SLITHERA",
    text: "This planet, it breathes like it remembers.",
    duration: 11000,
    voiceLine: "/audios/SolarSystemVoiceLines/5-Slith.mp3"
  },
];

const SolarSystemObserver = ({
  className = "",
  showSubtitles = true,
  customVoicelines = null,
  onCompletion = null
}) => {
  // State management (converted from Alpine.js)
  const [metrics, setMetrics] = useState({
    mass: "1.2e38",
    velocity: "-0.89c",
    entropy: "4.2e15",
    density: "2.8e12",
    field: "6.7e8",
  });

  const [coordinates, setCoordinates] = useState({
    x: "-3.14e6",
    y: "8.92e5",
    z: "1.45e4",
  });

  const [systemStatus, setSystemStatus] = useState({
    quantumBridge: true,
    eventHorizon: true,
    gravitationalLens: true,
  });

  const [frequency, setFrequency] = useState("128.4");
  const [signal, setSignal] = useState("76");
  const [runtime, setRuntime] = useState(0);

  // Loading state for fade effect
  const [loading, setLoading] = useState(true);

  // Simplified subtitle state
  const [currentSubtitle, setCurrentSubtitle] = useState(null);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [currentVoicelineIndex, setCurrentVoicelineIndex] = useState(0);
  const [voicelineSequenceStarted, setVoicelineSequenceStarted] =
    useState(false);
  const voicelines = customVoicelines || SAMPLE_VOICELINES;


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

  // Timer effect (equivalent to Alpine.js setInterval)
  useEffect(() => {
    const timer = setInterval(() => {
      setRuntime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Loading screen fade effect
  useEffect(() => {

    // Start fading after a short delay
    const fadeTimer = setTimeout(() => {
      setLoading(false);
      
      // Start voiceline sequence after loading completes
      setTimeout(() => {
        playAudio("/earth.mp3", 0, 0.6)

        setVoicelineSequenceStarted(true);
      }, 5000);
    }, 4000);

    return () => clearTimeout(fadeTimer);
  }, []);

  // Voiceline sequence effect - handles automatic progression
  useEffect(() => {
    if (!showSubtitles || !voicelineSequenceStarted || voicelines.length === 0)
      return;

    // Function to display a voiceline by index
    const displayVoiceline = (index) => {
      if (index >= voicelines.length) return;

      console.log(
        `Displaying voiceline ${index}: ${voicelines[index].speaker} - ${voicelines[index].text}`,
      );

      playAudio(voicelines[index].voiceLine, 1, 0.8)

      // Show the voiceline
      setCurrentVoicelineIndex(index);
      setCurrentSubtitle(voicelines[index]);
      setSubtitleVisible(true);

      // Schedule hiding this voiceline and showing the next one
      const duration = voicelines[index].duration || 4000;
      setTimeout(() => {
        // Hide current voiceline
        setSubtitleVisible(false);

        // Wait a moment before showing the next one
        setTimeout(() => {
          // Move to next voiceline if available
          if (index + 1 < voicelines.length) {
            displayVoiceline(index + 1);
          }
        }, 1000); // 1 second gap between voicelines
      }, duration);
    };

    // Start with the first voiceline
    displayVoiceline(0);

    // No cleanup needed as the timeouts manage themselves
  }, [showSubtitles, voicelineSequenceStarted, voicelines]);

  // Format runtime as HH:MM:SS
  const formatRuntime = () => {
    const hours = Math.floor(runtime / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((runtime % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (runtime % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  // Restart voiceline sequence
  const restartVoicelineSequence = () => {
    setSubtitleVisible(false);
    setCurrentVoicelineIndex(0);
    setVoicelineSequenceStarted(false);

    // Short delay before restarting
    setTimeout(() => {
      setVoicelineSequenceStarted(true);
    }, 500);
  };

  // Initialize system function (toggle quantum bridge)
  const initSystem = () => {
    onCompletion();
  };

  return (
    <section className={`${styles.container} ${className}`}>
      {audioInstances}

      {/* Loading overlay that fades out */}
      <div
        className={`${styles.loadingOverlay} ${loading ? "" : styles.fadeOut}`}
      />

      {/* Subtitle box - Simplified and more visible */}
      {showSubtitles && (
        <div
          className={`${styles.subtitleContainer} ${subtitleVisible ? styles.subtitleVisible : ""}`}
        >
          {currentSubtitle && (
            <>
              <span className={styles.speakerName}>
                {currentSubtitle.speaker}:
              </span>
              <p className={styles.subtitleText}>{currentSubtitle.text}</p>
            </>
          )}
        </div>
      )}

      <div className={styles.interface}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.statusIndicator} />
            <span className={styles.systemName}>SOLAR.SYSTEM.OBSERVER</span>
          </div>

          <div className={styles.headerCenter}>
            <span className={styles.mainTitle}>PLANETARY SYSTEM OBSERVER</span>
          </div>

          <div className={styles.headerRight}>
            <span className={styles.statusText}>ACTIVE</span>
            <span className={styles.kernelVersion}>KERNEL.3.1.415</span>
          </div>
        </header>

        <main className={styles.mainContent}>
          <div className={styles.leftPanels}>
            <section className={styles.panel}>
              <h2 className={styles.panelTitle}>METRICS</h2>
              <div className={styles.panelContent}>
                <div className={styles.dataRow}>
                  <span className={styles.dataLabel}>mass</span>
                  <span className={styles.dataValue}>{metrics.mass}</span>
                </div>
                <div className={styles.dataRow}>
                  <span className={styles.dataLabel}>velocity</span>
                  <span className={styles.dataValue}>{metrics.velocity}</span>
                </div>
                <div className={styles.dataRow}>
                  <span className={styles.dataLabel}>entropy</span>
                  <span className={styles.dataValue}>{metrics.entropy}</span>
                </div>
                <div className={styles.dataRow}>
                  <span className={styles.dataLabel}>density</span>
                  <span className={styles.dataValue}>{metrics.density}</span>
                </div>
                <div className={styles.dataRow}>
                  <span className={styles.dataLabel}>field</span>
                  <span className={styles.dataValue}>{metrics.field}</span>
                </div>
              </div>

              <div className={styles.divider} />

              <h2 className={styles.panelTitle}>COORDINATES</h2>
              <div className={styles.panelContent}>
                <div className={styles.dataRow}>
                  <span className={styles.dataLabel}>X</span>
                  <span className={styles.dataValue}>{coordinates.x}</span>
                </div>
                <div className={styles.dataRow}>
                  <span className={styles.dataLabel}>Y</span>
                  <span className={styles.dataValue}>{coordinates.y}</span>
                </div>
                <div className={styles.dataRow}>
                  <span className={styles.dataLabel}>Z</span>
                  <span className={styles.dataValue}>{coordinates.z}</span>
                </div>
              </div>
            </section>

            <section className={styles.panel}>
              <h2 className={styles.panelTitle}>EVENT STATUS</h2>
              <div className={styles.panelContent}>
                <div className={styles.dataRow}>
                  <span className={styles.dataLabel}>SYSTEM READY</span>
                </div>
                <div className={styles.dataRow}>
                  <span className={styles.dataLabel}>AWAITING INPUT</span>
                </div>
              </div>
            </section>
          </div>

          <div className={styles.spacer} />

          <div className={styles.rightPanels}>
            <section className={styles.panel}>
              <h2 className={styles.panelTitle}>SYSTEM STATUS</h2>
              <div className={styles.panelContent}>
                <div className={styles.dataRow}>
                  <span className={styles.dataLabel}>QUANTUM_BRIDGE</span>
                  <div
                    className={styles.statusIndicatorSmall}
                    style={{
                      background: systemStatus.quantumBridge ? "#CCC" : "#666",
                    }}
                  />
                </div>
                <div className={styles.dataRow}>
                  <span className={styles.dataLabel}>EVENT_HORIZON</span>
                  <div
                    className={styles.statusIndicatorSmall}
                    style={{
                      background: systemStatus.eventHorizon ? "#CCC" : "#666",
                    }}
                  />
                </div>
                <div className={styles.dataRow}>
                  <span className={styles.dataLabel}>GRAV_LENS</span>
                  <div
                    className={styles.statusIndicatorSmall}
                    style={{
                      background: systemStatus.gravitationalLens
                        ? "#CCC"
                        : "#666",
                    }}
                  />
                </div>
              </div>

              <div className={styles.panelContent}>
                <div className={styles.dataRow}>
                  <span className={styles.dataLabel}>FREQUENCY</span>
                  <span className={styles.dataValue}>{frequency}Hz</span>
                </div>
                <div className={styles.dataRow}>
                  <span className={styles.dataLabel}>SIGNAL</span>
                  <span className={styles.dataValue}>{signal}%</span>
                </div>
              </div>
            </section>

            <section className={styles.panel}>
              <h2 className={styles.panelTitle}>LOCATION</h2>
              <div className={styles.panelContent}>
                <div className={styles.dataRow}>
                  <span className={styles.dataLabel}>LAT: 42.3601° N</span>
                </div>
                <div className={styles.dataRow}>
                  <span className={styles.dataLabel}>LONG: 71.0589° W</span>
                </div>
              </div>
            </section>
          </div>
        </main>

        <footer className={styles.footer}>
          <div className={styles.footerLeft}>
            <span className={styles.runtimeLabel}>RUNTIME:</span>
            <span className={styles.runtimeValue}>{formatRuntime()}</span>
          </div>

          <button onClick={initSystem} className={styles.initButton}>
            INITIALIZE QUANTUM BRIDGE
          </button>

          <div className={styles.footerRight}>
            <span className={styles.memoryStatus}>MEM: 42.7 TB</span>
            <span className={styles.temperatureStatus}>TEMP: 38°C</span>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default SolarSystemObserver;
