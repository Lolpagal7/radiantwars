"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./BlackHoleObserver.module.css";

const BlackHoleObserver = () => {
    // Loading state
    const [loading, setLoading] = useState(true);
    const [typewriterComplete, setTypewriterComplete] = useState(false);

    // TARS subtitles state
    const [currentSubtitle, setCurrentSubtitle] = useState("");
    const [showSubtitles, setShowSubtitles] = useState(false);

    // Event sequence states
    const [eventSequenceActive, setEventSequenceActive] = useState(false);
    const [currentEventStep, setCurrentEventStep] = useState(0);
    const [eventLogs, setEventLogs] = useState([
        "SYSTEM READY",
        "AWAITING INPUT",
    ]);
    const [glitchLevel, setGlitchLevel] = useState(0); // 0-5, 0 = no glitch, 5 = severe
    const [buttonDisabled, setButtonDisabled] = useState(false);

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

    // TARS dialogue sequence
    const tarsDialogue = useRef([
        {
            text: "Welcome to the Black Hole Observer interface. I am TARS, your observation assistant.",
            timing: 1000,
        },
        {
            text: "We are currently monitoring a supermassive black hole in sector NGC-4258.",
            timing: 5000,
        },
        {
            text: "The quantum bridge is active and stable. All systems are functioning normally.",
            timing: 9000,
        },
        {
            text: "Warning: extreme gravitational field detected. Maintaining safe observation distance.",
            timing: 13000,
        },
        {
            text: "You may initialize or deactivate the quantum bridge using the control panel below.",
            timing: 17000,
        },
        {
            text: "I will remain on standby for further instructions. Enjoy your observation.",
            timing: 21000,
        },
    ]);

    // Destabilization sequence events
    const destabilizationSequence = useRef([
        {
            log: "QUANTUM BRIDGE DEACTIVATED",
            tarsMessage:
                "Quantum bridge deactivated. Switching to conventional observation mode.",
            delay: 0,
            glitchLevel: 0,
        },
        {
            log: "RECALIBRATING SENSORS",
            tarsMessage:
                "Recalibrating sensors for direct observation. Please stand by.",
            delay: 3000,
            glitchLevel: 0,
        },
        {
            log: "WARNING: GRAVITATIONAL ANOMALY DETECTED",
            tarsMessage:
                "Warning: Detecting unusual gravitational fluctuations. Analyzing...",
            delay: 6000,
            glitchLevel: 1,
        },
        {
            log: "ERROR: ORBITAL TRAJECTORY SHIFTING",
            tarsMessage:
                "Alert: Our orbital trajectory is shifting. Attempting to compensate.",
            delay: 9000,
            glitchLevel: 2,
        },
        {
            log: "CRITICAL: GRAVITATIONAL PULL INCREASING",
            tarsMessage:
                "Critical alert: Gravitational pull increasing beyond safe parameters. Attempting emergency quantum bridge reactivation.",
            delay: 12000,
            glitchLevel: 3,
        },
        {
            log: "EMERGENCY: QUANTUM BRIDGE FAILURE",
            tarsMessage:
                "Emergency: Quantum bridge reactivation failed. We are being pulled toward the event horizon.",
            delay: 15000,
            glitchLevel: 4,
        },
        {
            log: "CRITICAL: EVENT HORIZON APPROACH IMMINENT",
            tarsMessage:
                "Critical: Event horizon approach imminent. Prepare for spaghettification. It has been an honor serving with you.",
            delay: 18000,
            glitchLevel: 5,
        },
    ]);

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
        if (!loading && !eventSequenceActive) {
            setShowSubtitles(true);

            let dialogueTimers = [];

            tarsDialogue.current.forEach((dialogue) => {
                const timer = setTimeout(() => {
                    setCurrentSubtitle(dialogue.text);
                }, dialogue.timing);

                dialogueTimers.push(timer);
            });

            // Hide subtitles after last dialogue
            const hideTimer = setTimeout(
                () => {
                    setShowSubtitles(false);
                },
                tarsDialogue.current[tarsDialogue.current.length - 1].timing + 5000,
            );

            dialogueTimers.push(hideTimer);

            return () => {
                dialogueTimers.forEach((timer) => clearTimeout(timer));
            };
        }
    }, [loading, eventSequenceActive]);

    // Destabilization sequence effect
    useEffect(() => {
        if (
            eventSequenceActive &&
            currentEventStep < destabilizationSequence.current.length
        ) {
            const currentEvent = destabilizationSequence.current[currentEventStep];

            // Add log entry
            setEventLogs((prev) => [currentEvent.log, ...prev.slice(0, 4)]);

            // Show TARS message
            setShowSubtitles(true);
            setCurrentSubtitle(currentEvent.tarsMessage);

            // Set glitch level
            setGlitchLevel(currentEvent.glitchLevel);

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

    return (
        <div className={`${styles.container} ${getGlitchClass()}`}>
            {loading && (
                <TypewriterLoading
                    coordinates={coordinates}
                    onComplete={handleTypewriterComplete}
                    isComplete={typewriterComplete}
                />
            )}
            {showSubtitles && <TarsSubtitles currentSubtitle={currentSubtitle} />}
            <div id="backgroundCanvas" className={styles.backgroundCanvas} />
            <div className={styles.interface}>
                <Header />
                <main className={styles.main}>
                    <div className={styles.leftPanel}>
                        <MetricsPanel metrics={metrics} coordinates={coordinates} />
                        <EventStatusPanel eventLogs={eventLogs} />
                    </div>
                    <div className={styles.spacer} />
                    <div className={styles.rightPanel}>
                        <SystemStatusPanel
                            systemStatus={systemStatus}
                            frequency={frequency}
                            signal={signal}
                        />
                        <LocationPanel />
                    </div>
                </main>
                <Footer
                    runtime={formatRuntime()}
                    initSystem={initSystem}
                    buttonDisabled={buttonDisabled}
                />
            </div>
        </div>
    );
};

// TARS Subtitles Component
const TarsSubtitles = ({ currentSubtitle }) => {
    if (!currentSubtitle) return null;

    return (
        <div className={styles.subtitlesContainer}>
            <div className={styles.subtitlesHeader}>
                <span className={styles.subtitlesSource}>TARS:</span>
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
> ESTABLISHING QUANTUM BRIDGE CONNECTION...
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
const Footer = ({ runtime, initSystem, buttonDisabled }) => {
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
