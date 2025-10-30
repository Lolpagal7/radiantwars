"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./BlackHoleObserver.module.css";

import AutoPlayAudio from "../audioPlayer/audioPlayer.jsx";

import SpaceScene from "./3D/spaceScene.jsx";

const BlackHoleObserver = ({onCompletion}) => {

    const [handedOver, setHandedOver] = useState(false);

    // Loading state
    const [loading, setLoading] = useState(true);
    const [typewriterComplete, setTypewriterComplete] = useState(false);

    // TARS subtitles state
    const [currentSubtitle, setCurrentSubtitle] = useState("");
    const [showSubtitles, setShowSubtitles] = useState(false);
    const [speaker, setSpeaker] = useState("TARS");
    
    const [playingMain, setPlayingMain] = useState(false);
    const [shouldSpiralIn, setShouldSpiralIn] = useState(false);


    // Event sequence states
    const [eventSequenceActive, setEventSequenceActive] = useState(false);
    const [currentEventStep, setCurrentEventStep] = useState(0);
    const [eventLogs, setEventLogs] = useState([
        "SYSTEM READY",
        "AWAITING INPUT",
    ]);
    const [glitchLevel, setGlitchLevel] = useState(0); // 0-5, 0 = no glitch, 5 = severe
    const [buttonDisabled, setButtonDisabled] = useState(true);

    // Error popup state
    const [errorPopups, setErrorPopups] = useState([]);
    const [showRedFlash, setShowRedFlash] = useState(false);

    // Emergency failsafe state
    const [showEmergencyFailsafe, setShowEmergencyFailsafe] = useState(false);
    const [failsafeProgress, setFailsafeProgress] = useState(0);
    const [failsafeStatus, setFailsafeStatus] = useState("");
    const [failsafeError, setFailsafeError] = useState("");

    // Solar system loader state
    const [showSolarSystemLoader, setShowSolarSystemLoader] = useState(false);


    const [destabilizationAudioSquence, setDestabilizationAduioSequence] = useState([

        "/audios/VoiceLines/error1.mp3",
        "/audios/VoiceLines/error2.mp3",
        "/audios/VoiceLines/error3.mp3",
        "/audios/VoiceLines/error4.mp3",
        "/audios/VoiceLines/error5.mp3",
        "/audios/VoiceLines/error6.mp3",
        "/audios/VoiceLines/error7.mp3"

    ]);

    const [alarmAudios, setAlarmAudios] = useState([

        "/audios/alarm2.mp3",
        "/audios/alarm1.mp3",
        "/audios/alarm3.mp3",
        "/audios/alarm4.mp3",
    ]);

    // State management (replacing Alpine.js functionality)
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

    // UI disappearance states
    const [disappearingElements, setDisappearingElements] = useState({
        locationPanel: false,
        systemStatusPanel: false,
        eventStatusPanel: false,
        metricsPanel: false,
        header: false,
        footer: false,
        allElements: false,
    });

    // State to track when UI should be completely blank
    const [showBlankScreen, setShowBlankScreen] = useState(false);

    // TARS dialogue sequence
    const tarsDialogue = useRef([
        {
            text: "Welcome to the Black Hole Observer interface. I am TARS, your observation assistant.",
            timing: 2000,
            audio: "/audios/VoiceLines/tars1.mp3",
            speaker: "TARS",
            
        },
        {
            text: "We are currently monitoring a supermassive black hole in sector N-GC-4258.",
            timing: 9000,
            audio: "/audios/VoiceLines/tars2.mp3",
            speaker: "TARS",
        },
        {
            text: "Gravitational metrics steady. Quantum lens operational. Begin stellar survey, Commander.",
            timing: 16000,
            audio: "/audios/VoiceLinesMix/2-case.mp3",
            speaker: "CASE",
        },
        {
            text: "The quantum bridge is active and stable. All systems are functioning normally.",
            timing: 23000,
            audio: "/audios/VoiceLines/tars3.mp3",
            speaker: "TARS",
        },
        {
            text: "Warning: extreme gravitational field detected. Maintaining safe observation distance.",
            timing: 28000,
            audio: "/audios/VoiceLines/tars4.mp3",
            speaker: "TARS",
        },
        {
            text: "This singularity is ancient… and angry. Readings are unstable, keep your claws ready.",
            timing: 36000,
            audio: "/audios/VoiceLinesMix/4-kaela.mp3",
            speaker: "KAELA",
        },
    ]);

    // Destabilization sequence events
    const destabilizationSequence = useRef([
        {
            log: "QUANTUM BRIDGE DEACTIVATED",
            tarsMessage:
                "Quantum bridge deactivated. Switching to conventional observation mode.",
            delay: 8000,
            glitchLevel: 0,
            showError: false,
        },
        {
            log: "RECALIBRATING SENSORS",
            tarsMessage:
                "Recalibrating sensors for direct observation. Please stand by.",
            delay: 4000,
            glitchLevel: 0,
            showError: false,
        },
        {
            log: "WARNING: GRAVITATIONAL ANOMALY DETECTED",
            tarsMessage:
                "Warning: Detecting unusual gravitational fluctuations. Analyzing...",
            delay: 4000,
            glitchLevel: 1,
            showError: false,
        },
        {
            log: "ERROR: ORBITAL TRAJECTORY SHIFTING",
            tarsMessage:
                "Alert: Our orbital trajectory is shifting. Attempting to compensate.",
            delay: 2000,
            glitchLevel: 2,
            showError: true,
            errorData: {
                title: "ORBITAL TRAJECTORY ERROR",
                code: "ERR-1138",
                message:
                    "Orbital trajectory deviation detected. Gravitational forces exceeding compensation thresholds.",
                details:
                    "Deviation: 12.8°\nThrust compensation: FAILED\nStabilizers: OFFLINE\nBackup systems: INITIALIZING",
            },
        },
        {
            log: "CRITICAL: GRAVITATIONAL PULL INCREASING",
            tarsMessage:
                "Critical alert: Gravitational pull increasing beyond safe parameters. Attempting emergency quantum bridge reactivation.",
            delay: 3000,
            glitchLevel: 3,
            showError: true,
            errorData: {
                title: "CRITICAL SYSTEM FAILURE",
                code: "ERR-3720",
                message:
                    "Gravitational forces exceeding structural integrity limits. Multiple systems failing.",
                details:
                    "Hull integrity: 68%\nShield systems: CRITICAL\nLife support: COMPROMISED\nEvacuation protocols: INITIATED",
            },
        },
        {
            log: "EMERGENCY: QUANTUM BRIDGE FAILURE",
            tarsMessage:
                "Emergency: Quantum bridge reactivation failed. We are being pulled toward the event horizon.",
            delay: 3000,
            glitchLevel: 4,
            showError: true,
            errorData: {
                title: "EMERGENCY ALERT",
                code: "ERR-5150",
                message:
                    "Quantum bridge reactivation failed. Event horizon proximity warning.",
                details:
                    "Distance to event horizon: 1.2e6 km\nEscape velocity required: 0.97c\nCurrent velocity: 0.93c\nProbability of escape: 0.02%",
            },
        },
        {
            log: "CRITICAL: EVENT HORIZON APPROACH IMMINENT",
            tarsMessage:
                "Critical: Event horizon approach imminent. Prepare for spaghettification. It has been an honor serving with you.",
            delay: 2000,
            glitchLevel: 5,
            showError: true,
            errorData: {
                title: "TERMINAL SYSTEM FAILURE",
                code: "ERR-9999",
                message: "EVENT HORIZON BREACH IMMINENT. ALL SYSTEMS FAILING.",
                details:
                    "Time to event horizon: 00:00:47\nHull integrity: 23%\nTime dilation factor: 437.8\nTransmission status: FINAL",
            },
        },
    ]);


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
    
    
    // Timer effect (replacing Alpine.js setInterval)
    useEffect(() => {
        if (!loading) {
            const timer = setInterval(() => {
                setRuntime((prev) => prev + 1);
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [loading]);

    // TARS dialogue effect - starts after loading completes
    useEffect(() => {
        playAudio('DayOne.mp3', 0, 0.8); // Play audio once with full volume
        
        if (!loading && !eventSequenceActive) {
            setShowSubtitles(true);
            
            let dialogueTimers = [];

            tarsDialogue.current.forEach((dialogue) => {
                const timer = setTimeout(() => {
                    setCurrentSubtitle(dialogue.text);
                    playAudio(dialogue.audio, 1, 1)
                    setSpeaker(dialogue.speaker)
                }, dialogue.timing);

                dialogueTimers.push(timer);
            });

            // Hide subtitles after last dialogue
            const hideTimer = setTimeout(
                () => {
                    setShowSubtitles(false);
                    setButtonDisabled(false);
                },
                tarsDialogue.current[tarsDialogue.current.length - 1].timing + 6500,
            );

            dialogueTimers.push(hideTimer);

            return () => {
                setSpeaker("TARS")
                dialogueTimers.forEach((timer) => clearTimeout(timer));
            };
        }
    }, [loading, eventSequenceActive]);

    // Emergency failsafe effect
    useEffect(() => {
        if (showEmergencyFailsafe) {
            // Simulate failsafe progress
            setFailsafeStatus("INITIALIZING EMERGENCY TELEPORT SEQUENCE");

            const progressInterval = setInterval(() => {
                setFailsafeProgress((prev) => {
                    if (prev < 60) {
                        return prev + 1;
                    } else {
                        clearInterval(progressInterval);
                        return prev;
                    }
                });
            }, 50);

            // Update status messages
            setTimeout(() => {
                setFailsafeStatus("CALCULATING RETURN COORDINATES");
            }, 1000);

            setTimeout(() => {
                setFailsafeStatus("ESTABLISHING QUANTUM LINK TO HOME BASE");
            }, 2000);

            setTimeout(() => {
                setFailsafeStatus("ATTEMPTING TO LOCK SIGNAL");
            }, 3000);

            // Fail at 60%
            setTimeout(() => {
                setFailsafeStatus("ERROR: QUANTUM LINK UNSTABLE");
                setFailsafeError("TELEPORT SEQUENCE FAILED - LINK BROKEN");

                // Clear progress interval if it's still running
                clearInterval(progressInterval);

                // Show final error message
                setTimeout(() => {
                    setShowEmergencyFailsafe(false);
                    setShowBlankScreen(true);

                    // Show solar system loader after 5-6 seconds
                    setTimeout(() => {
                        setShowBlankScreen(false);
                        setShowSolarSystemLoader(true);
                    }, 5500);
                }, 2500);
            }, 3500);

            return () => {
                clearInterval(progressInterval);
            };
        }
    }, [showEmergencyFailsafe]);

    // Destabilization sequence effect
    useEffect(() => {

        if (
            eventSequenceActive &&
            currentEventStep < destabilizationSequence.current.length
        ) {
            setTimeout(() => {
                setShouldSpiralIn(true)
                setTimeout(() => {
                    playAudio("/audios/crash.mp3", 1, 1)
                }, 7000);
            }, 20000);

            const currentEvent = destabilizationSequence.current[currentEventStep];

            console.log(currentEvent)
            console.log(currentEventStep)

            playAudio(destabilizationAudioSquence[currentEventStep], 1, 0.7)

            // Add log entry
            setEventLogs((prev) => [currentEvent.log, ...prev.slice(0, 4)]);

            // Show TARS message
            setShowSubtitles(true);
            setCurrentSubtitle(currentEvent.tarsMessage);
            

            // Set glitch level
            setGlitchLevel(currentEvent.glitchLevel);

            // Start disappearing UI elements based on event step
            if (currentEventStep >= 3) {
                // Start disappearing at ERROR: ORBITAL TRAJECTORY SHIFTING
                // Start with location panel
                setDisappearingElements((prev) => ({
                    ...prev,
                    locationPanel: true,
                }));
            }

            if (currentEventStep >= 4) {
                // At CRITICAL: GRAVITATIONAL PULL INCREASING
                // Disappear system status panel
                setTimeout(() => {
                    setDisappearingElements((prev) => ({
                        ...prev,
                        systemStatusPanel: true,
                    }));
                }, 2000);
            }

            if (currentEventStep >= 5) {
                // At EMERGENCY: QUANTUM BRIDGE FAILURE
                // Disappear event status panel
                setTimeout(() => {
                    setDisappearingElements((prev) => ({
                        ...prev,
                        eventStatusPanel: true,
                    }));
                }, 2000);

                // Disappear metrics panel shortly after
                setTimeout(() => {
                    setDisappearingElements((prev) => ({
                        ...prev,
                        metricsPanel: true,
                    }));
                }, 4000);
            }

            if (currentEventStep >= 6) {
                // At CRITICAL: EVENT HORIZON APPROACH IMMINENT (final step)
                // Disappear header and footer
                setTimeout(() => {
                    setDisappearingElements((prev) => ({
                        ...prev,
                        header: true,
                        footer: true,
                    }));
                }, 3000);

                // Finally disappear everything
                setTimeout(() => {
                    setDisappearingElements((prev) => ({
                        ...prev,
                        allElements: true,
                    }));
                }, 6000);

                // After everything disappears, show emergency failsafe
                setTimeout(() => {
                    // Clear all error popups
                    setErrorPopups([]);
                    // Hide subtitles
                    setShowSubtitles(false);
                    // Show emergency failsafe
                    setShowEmergencyFailsafe(true);
                }, 8000);
            }

            // Show error popup if needed
            if (currentEvent.showError) {
                // Add red flash for errors
                setShowRedFlash(true);
                setTimeout(() => setShowRedFlash(false), 1000);

                // Generate a new error popup with random position
                const newPopup = {
                    ...currentEvent.errorData,
                    id: Date.now(),
                    position: {
                        top: `${Math.floor(Math.random() * 70) + 10}%`,
                        left: `${Math.floor(Math.random() * 70) + 10}%`,
                    },
                };

                console.log("erroringg")
                setTimeout(() => {
                    if (true) {
                      playAudio(alarmAudios[Math.floor(Math.random() * 3)], 0, 0.1, 6000);
                    }
                }, Math.random() * 200 + 100); // small random delay between 100ms-300ms
                
                setErrorPopups((prev) => [...prev, newPopup]);
                
                // For higher glitch levels, add multiple error popups
                if (currentEvent.glitchLevel >= 4) {
                    // Add 2-3 additional error popups with slight variations
                    for (let i = 0; i < (currentEvent.glitchLevel === 5 ? 3 : 2); i++) {
                        setTimeout(
                            () => {
                                const additionalPopup = {
                                    ...currentEvent.errorData,
                                    id: Date.now() + i + 1,
                                    title: `${currentEvent.errorData.title} - SECTOR ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 10)}`,
                                    position: {
                                        top: `${Math.floor(Math.random() * 70) + 10}%`,
                                        left: `${Math.floor(Math.random() * 70) + 10}%`,
                                    },
                                };
                                console.log("smol erroring")
                                setTimeout(() => {
                                    if (true) {
                                      playAudio(alarmAudios[Math.floor(Math.random() * 3)], 0, 0.1, 6000);
                                    }
                                }, Math.random() * 200 + 100); // small random delay between 100ms-300ms
                                setErrorPopups((prev) => [...prev, additionalPopup]);
                            },
                            500 * (i + 1),
                        );
                    }
                }

                // Hide errors after a delay (except for the final error)
                if (currentEventStep < destabilizationSequence.current.length - 1) {
                    setTimeout(() => {
                        setErrorPopups([]);
                    }, currentEvent.delay - 1000);
                }
            }

            // Add random error logs for higher glitch levels
            if (currentEvent.glitchLevel >= 3) {
                const randomErrors = [
                    "ERROR: MEMORY CORRUPTION IN SECTOR 7G",
                    "WARNING: QUANTUM FLUCTUATIONS DETECTED",
                    "ALERT: TEMPORAL ANOMALY INCREASING",
                    "ERROR: NAVIGATION SYSTEMS OFFLINE",
                    "CRITICAL: HULL INTEGRITY COMPROMISED",
                    "ALERT: RADIATION LEVELS EXCEEDING SAFETY PARAMETERS",
                ];

                // Add random errors periodically
                const errorInterval = setInterval(() => {
                    const randomError =
                        randomErrors[Math.floor(Math.random() * randomErrors.length)];
                    setEventLogs((prev) => [randomError, ...prev.slice(0, 4)]);
                }, 2000);

                // Clear interval when moving to next step
                setTimeout(() => {
                    clearInterval(errorInterval);
                }, currentEvent.delay - 100);
            }

            // Update metrics and coordinates to simulate destabilization
            if (currentEventStep > 2) {
                setMetrics((prev) => ({
                    ...prev,
                    velocity: `-${(0.89 + currentEventStep * 0.02).toFixed(2)}c`,
                    entropy: `${(4.2 + currentEventStep * 0.5).toFixed(1)}e15`,
                    field: `${(6.7 + currentEventStep * 1.2).toFixed(1)}e8`,
                }));

                // Update coordinates to simulate falling
                setCoordinates((prev) => ({
                    x: `${(parseFloat(prev.x.replace("e", "")) - currentEventStep * 0.5).toFixed(2)}e6`,
                    y: `${(parseFloat(prev.y.replace("e", "")) - currentEventStep * 0.3).toFixed(2)}e5`,
                    z: `${(parseFloat(prev.z.replace("e", "")) - currentEventStep * 0.2).toFixed(2)}e4`,
                }));

                // Update frequency and signal
                setFrequency((128.4 + currentEventStep * 10).toFixed(1));
                setSignal(Math.max(0, 76 - currentEventStep * 15).toString());
            }

            // Schedule next event
            const nextEventTimer = setTimeout(() => {
                if (currentEventStep < destabilizationSequence.current.length - 1) {
                    setCurrentEventStep((prev) => prev + 1);
                } else {
                    // End of sequence - keep subtitles visible
                    setTimeout(() => {
                        setShowSubtitles(false);
                    }, 8000);
                }
            }, currentEvent.delay);

            // Hide current subtitle before next one (except for the last one)
            if (currentEventStep < destabilizationSequence.current.length - 1) {
                const hideSubtitleTimer = setTimeout(() => {
                    setShowSubtitles(false);
                }, currentEvent.delay - 500);

                return () => {
                    clearTimeout(nextEventTimer);
                    clearTimeout(hideSubtitleTimer);
                };
            } else {
                return () => clearTimeout(nextEventTimer);
            }
        }
    }, [eventSequenceActive, currentEventStep]);

    // Initialize system function
    const initSystem = () => {
        // Toggle quantum bridge
        const newBridgeStatus = !systemStatus.quantumBridge;

        setSystemStatus((prev) => ({
            ...prev,
            quantumBridge: newBridgeStatus,
        }));

        // If turning off the bridge, start the destabilization sequence
        if (!newBridgeStatus) {
            setButtonDisabled(true);
            setEventSequenceActive(true);
            setCurrentEventStep(0);
        } else {
            // Add TARS response to button click for reactivation (though this won't happen in the sequence)
            setShowSubtitles(true);
            setCurrentSubtitle(
                "Reactivating quantum bridge. Establishing connection.",
            );

            // Hide subtitle after 3 seconds
            setTimeout(() => {
                setShowSubtitles(false);
            }, 3000);
        }
    };

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

    // Handle typewriter completion
    const handleTypewriterComplete = () => {
        setTypewriterComplete(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    // Determine glitch class based on glitch level
    const getGlitchClass = () => {
        if (glitchLevel === 0) return "";
        return `${styles.glitch} ${styles[`glitchLevel${glitchLevel}`]}`;
    };

    // Helper function to get disappearing class
    const getDisappearingClass = (elementName) => {
        if (disappearingElements.allElements) return styles.disappearingFast;
        if (disappearingElements[elementName]) return styles.disappearing;
        return "";
    };

    // Error Popup Component
    const ErrorPopup = ({ error }) => {
        return (
            <div
                className={styles.errorPopup}
                style={{
                    top: error.position.top,
                    left: error.position.left,
                    transform: "none", // Override the default transform
                }}
            >
                <div className={styles.errorHeader}>
                    <h3 className={styles.errorTitle}>{error.title}</h3>
                    <span className={styles.errorCode}>{error.code}</span>
                </div>
                <p className={styles.errorMessage}>{error.message}</p>
                <pre className={styles.errorDetails}>{error.details}</pre>
            </div>
        );
    };

    // Emergency Failsafe Component
    const EmergencyFailsafe = () => {
        return (
            <div className={styles.emergencyFailsafe}>
                <h2 className={styles.emergencyTitle}>EMERGENCY PROTOCOL ACTIVATED</h2>
                <p className={styles.emergencyMessage}>
                    INITIATING EMERGENCY QUANTUM TELEPORT TO HOME BASE
                </p>
                <div className={styles.emergencyProgress}>
                    <div
                        className={styles.emergencyProgressBar}
                        style={{ width: `${failsafeProgress}%` }}
                    />
                </div>
                <div className={styles.emergencyStatus}>{failsafeStatus}</div>
                {failsafeError && (
                    <div className={styles.emergencyError}>{failsafeError}</div>
                )}
            </div>
        );
    };

    // Solar System Loader Component
    const SolarSystemLoader = () => {
        // Generate random stars
        const stars = [];
        for (let i = 0; i < 100; i++) {
            const size = Math.random() * 2 + 1;
            stars.push({
                id: i,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                size: `${size}px`,
                opacity: Math.random() * 0.5 + 0.5,
            });
        }
        
        onCompletion()
        setHandedOver(true)
        
        return (
            <div className={styles.solarSystemLoader}>
                <h2 className={styles.solarSystemTitle}>
                    LOCATING SOLAR SYSTEM COORDINATES
                </h2>
                <div className={styles.solarSystemMap}>
                    <div className={styles.solarSystemGrid} />
                    {stars.map((star) => (
                        <div
                            key={star.id}
                            className={styles.solarSystemStar}
                            style={{
                                top: star.top,
                                left: star.left,
                                width: star.size,
                                height: star.size,
                                opacity: star.opacity,
                            }}
                        />
                    ))}
                    <div className={styles.solarSystemSun} />
                    <div className={styles.solarSystemEarth} />
                    <div className={styles.solarSystemMarker} />
                </div>
                <div className={styles.solarSystemCoordinates}>
                    MILKY WAY GALAXY • ORION ARM • SOL SYSTEM
                </div>
                <div className={styles.solarSystemDistance}>
                    DISTANCE FROM EVENT HORIZON: <span>2.7e19 km</span>
                </div>
            </div>
        );
    };

    // If showing solar system loader
    if (showSolarSystemLoader) {
        return <SolarSystemLoader />;
    }

    // If showing blank screen
    if (showBlankScreen) {
        return <div className={styles.blankScreen} />;
    }

    // If showing emergency failsafe
    if (showEmergencyFailsafe) {
        return <EmergencyFailsafe />;
    }

    return (
        <div className={`${styles.container} ${getGlitchClass()}`}>
            {loading && (
                <TypewriterLoading
                    coordinates={coordinates}
                    onComplete={handleTypewriterComplete}
                    isComplete={typewriterComplete}
                />
            )}
            {showSubtitles && <TarsSubtitles currentSubtitle={currentSubtitle} speaker={speaker} />}
            {errorPopups.map((popup) => (
                <ErrorPopup key={popup.id} error={popup} />
            ))}
            {showRedFlash && <div className={styles.redFlash} />}
            <div id="backgroundCanvas" className={styles.backgroundCanvas}>
                <SpaceScene shouldSpiralIn={shouldSpiralIn}/>
            </div>
            <div
                className={`${styles.interface} ${disappearingElements.allElements ? styles.disappearingFast : ""}`}
            >
                <div className={getDisappearingClass("header")}>
                    <Header />
                </div>
                <main className={styles.main}>
                    <div className={styles.leftPanel}>
                        <div className={getDisappearingClass("metricsPanel")}>
                            <MetricsPanel metrics={metrics} coordinates={coordinates} />
                        </div>
                        <div className={getDisappearingClass("eventStatusPanel")}>
                            <EventStatusPanel eventLogs={eventLogs} />
                        </div>
                    </div>
                    <div className={styles.spacer} />
                    <div className={styles.rightPanel}>
                        <div className={getDisappearingClass("systemStatusPanel")}>
                            <SystemStatusPanel
                                systemStatus={systemStatus}
                                frequency={frequency}
                                signal={signal}
                            />
                        </div>
                        <div className={getDisappearingClass("locationPanel")}>
                            <LocationPanel />
                        </div>
                    </div>
                </main>
                <div className={getDisappearingClass("footer")}>
                    <Footer
                        runtime={formatRuntime()}
                        initSystem={initSystem}
                        buttonDisabled={buttonDisabled}
                        playAudio={playAudio}
                    />
                </div>
            </div>

            {audioInstances}

        </div>
    );
};

// TARS Subtitles Component
const TarsSubtitles = ({ currentSubtitle, speaker }) => {
    if (!currentSubtitle) return null;

    return (
        <div className={styles.subtitlesContainer}>
            <div className={styles.subtitlesHeader}>
                <span className={styles.subtitlesSource}>{speaker}:</span>
            </div>
            <p className={styles.subtitlesText}>{currentSubtitle}</p>
        </div>
    );
};

// Typewriter Loading Component
const TypewriterLoading = ({ coordinates, onComplete, isComplete }) => {
    const [text, setText] = useState("");
    const [progress, setProgress] = useState(0);

    const fullText = useRef(`
> INITIALIZING BLACK HOLE OBSERVER SYSTEM v3.1.415
> CALIBRATING GRAVITATIONAL LENS...
> SCANNING EVENT HORIZON PARAMETERS...
> LOCATION IDENTIFIED:
  - SECTOR: NGC-4258
  - QUADRANT: ALPHA-7
  - COORDINATES: X=${coordinates.x}, Y=${coordinates.y}, Z=${coordinates.z}
> CALCULATING MASS: 1.2e38 kg
> MEASURING VELOCITY: -0.89c
> ENTROPY LEVELS: 4.2e15 J/K
> WARNING: EXTREME GRAVITATIONAL FIELD DETECTED
> DENSITY READINGS: 2.8e12 kg/m³
> ESTABLISHING SAFE OBSERVATION DISTANCE...
> SYSTEM READY
> PRESS ANY KEY TO CONTINUE...
  `);

    useEffect(() => {
        let currentIndex = 0;
        let timer;

        const typeNextCharacter = () => {
            if (currentIndex < fullText.current.length) {
                setText(fullText.current.substring(0, currentIndex + 1));
                setProgress((currentIndex / fullText.current.length) * 100);
                currentIndex++;

                // Random typing speed between 10ms and 50ms
                const randomSpeed = Math.floor(Math.random() * 40) + 10;
                timer = setTimeout(typeNextCharacter, randomSpeed);
            } else {
                // Typing complete
                setProgress(100);
                onComplete();
            }
        };

        timer = setTimeout(typeNextCharacter, 500);

        return () => clearTimeout(timer);
    }, [onComplete]);

    // Handle keyboard press to skip
    useEffect(() => {
        const handleKeyPress = () => {
            if (progress < 100) {
                setProgress(100);
                onComplete();
            }
        };

        window.addEventListener("keydown", handleKeyPress);

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [progress, onComplete]);

    return (
        <div
            className={styles.loadingScreen}
            style={{ opacity: isComplete ? 0 : 1, transition: "opacity 1s ease" }}
        >
            <div className={styles.typewriterContainer}>
        <pre className={styles.typewriterText}>
          {text}
            <span className={styles.cursor}></span>
        </pre>
                <div className={styles.loadingProgress}>
                    <div
                        className={styles.loadingBar}
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <div className={styles.loadingInfo}>
                    LOADING: {Math.floor(progress)}%
                </div>
            </div>
            <div className={styles.skipPrompt}>PRESS ANY KEY TO SKIP</div>
        </div>
    );
};

// Header Component
const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.headerLeft}>
                <div className={styles.indicator} />
                <span className={styles.systemName}>BLACK.HOLE.OBSERVER</span>
            </div>
            <div className={styles.headerCenter}>
                <span className={styles.title}>EVENT HORIZON OBSERVER</span>
            </div>
            <div className={styles.headerRight}>
                <span className={styles.status}>ACTIVE</span>
                <span className={styles.kernelVersion}>KERNEL.3.1.415</span>
            </div>
        </header>
    );
};

// Metrics Panel Component
const MetricsPanel = ({ metrics, coordinates }) => {
    return (
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
    );
};

// Event Status Panel Component
const EventStatusPanel = ({ eventLogs }) => {
    return (
        <section className={styles.panel}>
            <h2 className={styles.panelTitle}>EVENT STATUS</h2>
            <div className={styles.panelContent}>
                {eventLogs.map((log, index) => (
                    <div
                        key={index}
                        className={`${styles.dataRow} ${log.includes("CRITICAL") ? styles.criticalEvent : log.includes("ERROR") || log.includes("WARNING") || log.includes("EMERGENCY") ? styles.warningEvent : ""}`}
                    >
                        <span className={styles.dataLabel}>{log}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

// System Status Panel Component
const SystemStatusPanel = ({ systemStatus, frequency, signal }) => {
    return (
        <section className={styles.panel}>
            <h2 className={styles.panelTitle}>SYSTEM STATUS</h2>
            <div className={styles.panelContent}>
                <div className={styles.dataRow}>
                    <span className={styles.dataLabel}>QUANTUM_BRIDGE</span>
                    <div
                        className={styles.statusIndicator}
                        style={{ background: systemStatus.quantumBridge ? "#CCC" : "#666" }}
                    />
                </div>
                <div className={styles.dataRow}>
                    <span className={styles.dataLabel}>EVENT_HORIZON</span>
                    <div
                        className={styles.statusIndicator}
                        style={{ background: systemStatus.eventHorizon ? "#CCC" : "#666" }}
                    />
                </div>
                <div className={styles.dataRow}>
                    <span className={styles.dataLabel}>GRAV_LENS</span>
                    <div
                        className={styles.statusIndicator}
                        style={{
                            background: systemStatus.gravitationalLens ? "#CCC" : "#666",
                        }}
                    />
                </div>
            </div>
            <div className={styles.additionalMetrics}>
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
    );
};

// Location Panel Component
const LocationPanel = () => {
    return (
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
    );
};

// Footer Component
const Footer = ({ runtime, initSystem, buttonDisabled, playAudio }) => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerLeft}>
                <span className={styles.runtimeLabel}>RUNTIME:</span>
                <span className={styles.runtimeValue}>{runtime}</span>
            </div>
            <button
                onClick={initSystem}
                className={`${styles.initButton} ${buttonDisabled ? styles.buttonDisabled : ""}`}
                disabled={buttonDisabled}
                onMouseEnter={() => {playAudio("/audios/mouseIn.wav", 1, 0.1)}}
            >
                INITIALIZE QUANTUM BRIDGE
            </button>
            <div className={styles.footerRight}>
                <span className={styles.memoryStatus}>MEM: 42.7 TB</span>
                <span className={styles.tempStatus}>TEMP: 38°C</span>
            </div>
        </footer>
    );
};

export default BlackHoleObserver;
