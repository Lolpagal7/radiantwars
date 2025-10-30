"use client";
import * as React from "react";
import styles from "./Marker.module.css";

// Marker Component with decorative elements
const QuantumMarker = ({ onHover, onBlur, click }) => (
  <div
    className={styles.decorativeContainer}
    onMouseEnter={onHover}
    onMouseLeave={onBlur}
    onFocus={onHover}
    onBlur={onBlur}
    tabIndex={0}
    role="button"
    aria-label="Show active agents"
    onClick={click}
  >
    <div className={styles.outerCircle}></div>
    <div className={styles.innerCircle}></div>
    <div className={styles.verticalLine}></div>
    <div className={styles.horizontalLine}></div>
    <div className={styles.centerDot}></div>
    <div className={styles.verticalGradient}></div>
    <div className={styles.horizontalGradient}></div>
  </div>
);

// Agent Item Component
const AgentItem = ({ name, status }) => (
  <li className={styles.agentItem}>
    <span className={styles.agentName}>{name}</span>
    <span
      className={styles.agentStatus}
      style={{ color: status === "Online" ? "#32CD32" : "#FF6347" }}
    >
      {status}
    </span>
  </li>
);

// Card Component (FIXED: correctly receives both props)
const AgentsCard = ({ bannerSrc, agents }) => (
  <article className={styles.card} style={{ transform: "translate(10px, 40px)" }}>
    <img
      src={bannerSrc}
      alt="Active Agents"
      className={styles.cardImage}
    />
    <div className={styles.cardContent}>
      <h2 className={styles.cardTitle}>Active Agents</h2>
      <ul className={styles.agentsList}>
        {agents.map((agent, index) => (
          <AgentItem key={index} name={agent.name} status={agent.status} />
        ))}
      </ul>
    </div>
  </article>
);

// Marker Wrapper Component
function Marker({
  click,
  banner = "https://cdn.builder.io/api/v1/image/assets/TEMP/70df8d3814edb4097766d5274f7f1f08d4fb314a?placeholderIfAbsent=true",
  agentsList = [
    { name: "Agent Smith", status: "Online" },
    { name: "Agent Johnson", status: "Online" },
    { name: "Agent Brown", status: "Offline" },
    { name: "Agent Jones", status: "Online" },
  ],
}) {
  const [isCardVisible, setIsCardVisible] = React.useState(false);
  const timeoutRef = React.useRef(null);

  const handleMarkerHover = () => {
    clearTimeout(timeoutRef.current);
    setIsCardVisible(true);
  };

  const handleMarkerBlur = () => {
    timeoutRef.current = setTimeout(() => {
      setIsCardVisible(false);
    }, 200); // allows hover onto card
  };

  return (
    <div
      className={styles.markerWrapper}
      style={{ transform: "translate(-20px, -30px)" }}
    >
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
      />
      <div
        className={styles.markerContainer}
        onMouseEnter={handleMarkerHover}
        onMouseLeave={handleMarkerBlur}
      >
        <QuantumMarker
          onHover={handleMarkerHover}
          onBlur={handleMarkerBlur}
          click={click}
        />
        {isCardVisible && (
          <AgentsCard bannerSrc={banner} agents={agentsList} />
        )}
      </div>
    </div>
  );
}

export default Marker;
