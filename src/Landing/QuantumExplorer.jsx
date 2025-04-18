"use client";
import React, { useState, useEffect } from "react";
import styles from "./QuantumExplorer.module.css";

const Header = ({ initialized }) => (
    <header className={styles.header}>
        <div className={styles.headerLogoSection}>
            <div className={`${styles.headerDot} ${styles.blinkSlow}`} />
            <h1 className={styles.headerTitle}>QUANTUM.EXPLORER</h1>
        </div>
        <nav className={styles.headerNav}>
            <span className={styles.headerNavItem}>PARAMETERS</span>
            <span className={styles.headerNavItem}>DATA</span>
        </nav>
        <div className={styles.headerStatus}>
      <span
          className={`${styles.headerStatusText} ${initialized ? styles.blinkFast : ""}`}
      >
        {initialized ? "ACTIVE" : "STANDBY"}
      </span>
            <span className={styles.headerVersion}>
        KERNEL.2.4.891
        <span className={styles.blinkCursor}>_</span>
      </span>
        </div>
    </header>
);

const MetricsPanel = ({ metrics, coordinates }) => (
    <section className={styles.metricsPanel}>
        <h2 className={styles.panelTitle}>METRICS</h2>
        <div className={styles.metricsContainer}>
            {Object.entries(metrics).map(([key, value]) => (
                <div key={key} className={styles.metricItem}>
                    <span className={styles.metricLabel}>{key.toUpperCase()}</span>
                    <span className={styles.metricValue}>{value}</span>
                </div>
            ))}
        </div>
        <div className={styles.divider} />
        <h2 className={styles.panelTitle}>COORDINATES</h2>
        <div className={styles.metricsContainer}>
            {Object.entries(coordinates).map(([key, value]) => (
                <div key={key} className={styles.metricItem}>
                    <span className={styles.metricLabel}>{key.toUpperCase()}</span>
                    <span className={styles.metricValue}>{value}</span>
                </div>
            ))}
        </div>
    </section>
);

const MainDisplay = ({ initialized }) => (
    <section className={styles.mainDisplay}>
        <div className={styles.mainDisplayTitle}>
            <h2 className={styles.mainTitle}>
                EVENT HORIZON EXPLORER
                {initialized && <span className={styles.blinkSlow}>■</span>}
            </h2>
        </div>
        {initialized && (
            <div className={styles.mainDisplayContent}>
                <div className={`${styles.scanLine} ${styles.blinkScan}`}></div>
            </div>
        )}
    </section>
);

const SystemStatusPanel = ({ systemStatus }) => (
    <section className={styles.systemStatusPanel}>
        <h2 className={styles.panelTitle}>
            SYSTEM STATUS
            <span className={styles.blinkCursor}>_</span>
        </h2>
        <div className={styles.statusContainer}>
            <div className={styles.statusItem}>
                <span className={styles.statusLabel}>QUANTUM_BRIDGE</span>
                <div
                    className={`${styles.statusIndicator} ${systemStatus.quantum ? styles.active : ""} ${systemStatus.quantum ? styles.blinkRandom : ""}`}
                />
            </div>
            <div className={styles.statusItem}>
                <span className={styles.statusLabel}>GRAVITY_SENSORS</span>
                <div
                    className={`${styles.statusIndicator} ${systemStatus.gravity ? styles.active : ""} ${systemStatus.gravity ? styles.blinkSlow : ""}`}
                />
            </div>
            <div className={styles.statusItem}>
                <span className={styles.statusLabel}>TEMPORAL_MATRIX</span>
                <div
                    className={`${styles.statusIndicator} ${systemStatus.temporal ? styles.active : ""} ${systemStatus.temporal ? styles.blinkFast : ""}`}
                />
            </div>
            <div className={styles.statusMetrics}>
                <div className={styles.statusItem}>
                    <span className={styles.statusLabel}>FREQUENCY</span>
                    <span
                        className={`${styles.statusValue} ${systemStatus.frequency > 43 ? styles.blinkSlow : ""}`}
                    >
            {systemStatus.frequency} Hz
          </span>
                </div>
                <div className={styles.statusItem}>
                    <span className={styles.statusLabel}>SIGNAL</span>
                    <span
                        className={`${styles.statusValue} ${systemStatus.signal > 90 ? styles.blinkFast : ""}`}
                    >
            {systemStatus.signal}%
          </span>
                </div>
            </div>
        </div>
    </section>
);

const ControlPanel = ({
                          initialized,
                          onInitialize,
                          systemStatus,
                          setSystemStatus,
                      }) => {
    const [hover, setHover] = useState(false);
    const [initializing, setInitializing] = useState(false);

    const handleInitialize = () => {
        if (initialized || initializing) return;

        setInitializing(true);

        // Sequence of activating indicators
        setTimeout(() => {
            setSystemStatus((prev) => ({ ...prev, quantum: true }));

            setTimeout(() => {
                setSystemStatus((prev) => ({ ...prev, gravity: true }));

                setTimeout(() => {
                    setSystemStatus((prev) => ({ ...prev, temporal: true }));

                    setTimeout(() => {
                        onInitialize();
                        setInitializing(false);
                    }, 800);
                }, 600);
            }, 400);
        }, 200);
    };

    return (
        <section className={styles.controlPanel}>
            <div className={styles.systemReadyPanel}>
                <h3 className={styles.systemReadyTitle}>
                    SYSTEM READY
                    <span
                        className={`${styles.statusIndicator} ${styles.smallDot} ${styles.blinkSlow}`}
                    ></span>
                </h3>
                <p
                    className={`${styles.systemReadyStatus} ${initializing ? styles.blinkFast : ""}`}
                >
                    {initialized
                        ? "SYSTEM INITIALIZED"
                        : initializing
                            ? "INITIALIZING..."
                            : "AWAITING INITIALIZATION"}
                </p>
            </div>
            <div className={styles.initButtonContainer}>
                <button
                    className={`${styles.initButton} ${hover ? styles.initButtonHover : ""} ${initializing ? styles.initializing : ""}`}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    onClick={handleInitialize}
                    disabled={initialized || initializing}
                    aria-label="Initialize Quantum Bridge"
                >
          <span className={styles.initButtonText}>
            {initialized
                ? "QUANTUM BRIDGE ACTIVE"
                : initializing
                    ? "INITIALIZING..."
                    : "INITIALIZE QUANTUM BRIDGE"}
          </span>
                    {initializing && <span className={styles.blinkCursor}>_</span>}
                </button>
            </div>
            <div className={styles.locationPanel}>
                <p className={styles.locationText}>
                    LAT: 51.5074° N
                    <span className={`${styles.blinkRandom} ${styles.tinyDot}`}>•</span>
                </p>
                <p className={styles.locationTextSecondary}>LONG: 0.1278° W</p>
            </div>
        </section>
    );
};

const Footer = ({ runtime, memory, temp }) => (
    <footer className={styles.footer}>
        <div className={styles.footerSection}>
            <span className={styles.footerLabel}>RUNTIME:</span>
            <span
                className={`${styles.footerValue} ${runtime > 10 ? styles.blinkSlow : ""}`}
            >
        {String(Math.floor(runtime / 3600)).padStart(2, "0")}:
                {String(Math.floor((runtime % 3600) / 60)).padStart(2, "0")}:
                {String(runtime % 60).padStart(2, "0")}
      </span>
        </div>
        <div className={styles.footerSection}>
            <span className={styles.footerValue}>MEM: {memory} TB</span>
            <span
                className={`${styles.footerLabel} ${temp > 44 ? styles.blinkFast : ""}`}
            >
        TEMP: {temp.toFixed(1)}°C
      </span>
        </div>
    </footer>
);

const QuantumExplorer = () => {
    const [metrics, setMetrics] = useState({
        mass: "2.4e43",
        velocity: "-0.67c",
        entropy: "3.8e12",
        density: "1.2e9",
        field: "8.3e4",
    });

    const [coordinates, setCoordinates] = useState({
        x: "-2.45e4",
        y: "1.87e3",
        z: "9.12e2",
    });

    const [systemStatus, setSystemStatus] = useState({
        quantum: false,
        gravity: false,
        temporal: false,
        frequency: 42.8,
        signal: 89,
    });

    const [runtime, setRuntime] = useState(0);
    const [memory, setMemory] = useState(16.8);
    const [temp, setTemp] = useState(42);
    const [initialized, setInitialized] = useState(false);

    const initializeSystem = () => {
        setInitialized(true);
    };

    useEffect(() => {
        let interval;
        if (initialized) {
            interval = setInterval(() => {
                setRuntime((prev) => prev + 1);
                setTemp(40 + Math.random() * 5);
                setMemory(parseFloat((16 + Math.random() * 2).toFixed(1)));
                setSystemStatus((prev) => ({
                    ...prev,
                    frequency: parseFloat((40 + Math.random() * 5).toFixed(1)),
                    signal: Math.floor(85 + Math.random() * 15),
                }));
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [initialized]);

    return (
        <main className={styles.container}>


            <div className={styles.backgroundElement}></div>



            <Header initialized={initialized} />
            <div className={styles.content}>
                <MetricsPanel metrics={metrics} coordinates={coordinates} />
                <MainDisplay initialized={initialized} />
                <SystemStatusPanel systemStatus={systemStatus} />
            </div>
            <ControlPanel
                initialized={initialized}
                onInitialize={initializeSystem}
                systemStatus={systemStatus}
                setSystemStatus={setSystemStatus}
            />
            <Footer runtime={runtime} memory={memory} temp={temp} />
        </main>
    );
};

export default QuantumExplorer;
