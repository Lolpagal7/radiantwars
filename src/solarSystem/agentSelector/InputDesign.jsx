"use client";
import React, { useState, useEffect } from "react";
import styles from "./InputDesign.module.css";

import AutoPlayAudio from "../../audioPlayer/audioPlayer";

// StatCard Component (internal)
const StatCard = ({ label, value }) => {
  return (
    <article className={styles.statCard}>
      <h3 className={styles.statLabel}>{label}</h3>
      <p className={styles.statValue}>{value}</p>
    </article>
  );
};

// AgentDetails Component (internal)
const AgentDetails = ({ agent }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "ACTIVE":
        return "#4CAF50";
      case "STANDBY":
        return "#FFC107";
      case "DEPLOYED":
        return "#2196F3";
      default:
        return "#F44336";
    }
  };

  // Apply banner zoom and offset styles
  const bannerStyle = {
    transform: `scale(${agent.bannerZoom || 1})`,
    objectPosition: agent.bannerOffset || "center",
  };

  // Apply video zoom and offset styles
  const videoStyle = {
    transform: `scale(${agent.videoZoom || 1})`,
    objectPosition: agent.videoOffset || "center",
  };

  return (
    <section className={styles.agentDetailsCard}>
      <div className={styles.agentSidebar}>
        <div className={styles.mediaContainer}>
          <img
            className={styles.agentBanner}
            src={agent.banner}
            alt={`${agent.name} banner`}
            style={bannerStyle}
          />
        </div>
        <div className={styles.agentInfo}>
          <h2 className={styles.agentName}>{agent.name}</h2>
          <p
            className={styles.agentStatus}
            style={{ color: getStatusColor(agent.status) }}
          >
            {agent.status}
          </p>
        </div>
      </div>
      <div className={styles.agentContent}>
        <div className={styles.mediaContainer}>
          <video
            className={styles.agentVideo}
            src={agent.video}
            style={videoStyle}
            autoPlay
            loop
            muted
            playsInline
            aria-label={`${agent.name} video feed`}
          />
        </div>
        <div className={styles.videoOverlay}></div>
        <div className={styles.agentStats}>
          <div className={styles.statsHeader}>
            <h2 className={styles.statsTitle}>
              {agent.name} //{" "}
              <span className={styles.statsRole}>{agent.role}</span>
            </h2>
          </div>
          <div className={styles.statsContent}>
            <div className={styles.statItem}>
              <span className={styles.statItemLabel}>STATUS</span>
              <span
                className={styles.statItemValue}
                style={{ color: getStatusColor(agent.status) }}
              >
                {agent.status}
              </span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statItemLabel}>EFFICIENCY</span>
              <span className={styles.statItemValue}>{agent.efficiency}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statItemLabel}>MISSIONS</span>
              <span className={styles.statItemValue}>{agent.missions}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statItemLabel}>LOCATION</span>
              <span className={styles.statItemValue}>{agent.location}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// AgentButton Component (internal)
const AgentButton = ({
  agentId,
  agentName,
  image,
  isActive,
  isSelected,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  return (
    <button
      className={styles.agentButton}
      onMouseEnter={() => onMouseEnter(agentId)}
      onMouseLeave={onMouseLeave}
      onClick={() => onClick(agentId)}
      style={{
        borderColor: isActive || isSelected ? "#333333" : "#1a1a1a",
      }}
      aria-label={`Select ${agentName}`}
      aria-pressed={isSelected}
    >
      <img
        src={image}
        alt={`${agentName} avatar`}
        className={styles.agentAvatar}
      />
    </button>
  );
};

// Main Component
const InputDesign = ({
  initialOpen = true,
  visibleAgents = null, // Array of agent IDs to show, null means show all
  onAgentSelect = null, // Optional callback when agent is selected
  onClose = null, // Optional callback when panel is closed
  customAgents = null, // Optional custom agent data
  headBanner = "https://placehold.co/1000x280"
}) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationState, setAnimationState] = useState(
    initialOpen ? "open" : "closed",
  );
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
















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
      
















  // Define all available agents
  const [agents] = useState(() => {
    // Use custom agents if provided, otherwise use default agents
    if (customAgents) return customAgents;

    return {
      reyna: {
        name: "Reyna",
        role: "Empress",
        status: "ACTIVE",
        efficiency: "96%",
        missions: "189",
        location: "Pearl",
        image: "Reyna_icon.webp",
        banner: "/agentsDetails/reyna/card.jpg",
        video:
        "/agentsDetails/reyna/video.mp4",
        bannerZoom: 1,
        bannerOffset: "center",
        videoZoom: 1,
        videoOffset: "center",
        voiceLine: "/agentsDetails/reyna/inrto.mp3"
      },
      chamber: {
        name: "Chamber",
        role: "Arms Dealer",
        status: "ACTIVE",
        efficiency: "96%",
        missions: "189",
        location: "Fracture",
        image: "/agentsDetails/Chamber/Chamber_Icon.webp",
        banner: "/agentsDetails/Chamber/Chamber_Playercard.webp",
        video:
        "/agentsDetails/reyna/video.mp4",
        bannerZoom: 1,
        bannerOffset: "center top",
        videoZoom: 1,
        videoOffset: "center",
        voiceLine: "/agentsDetails/Chamber/Chamber_Voiceline.mp3"
      },
      tejo: {
        name: "Tejo",
        role: "Eastern Bomber",
        status: "ACTIVE",
        efficiency: "96%",
        missions: "189",
        location: "Fracture",
        image: "/agentsDetails/Tejo/Tejo_Icon.png",
        banner: "/agentsDetails/Tejo/Tejo_Playercard.webp",
        video:
        "/agentsDetails/reyna/video.mp4",
        bannerZoom: 1,
        bannerOffset: "center top",
        videoZoom: 1,
        videoOffset: "center",
        voiceLine: "/agentsDetails/Tejo/Tejo_Voiceline.mp3"
      },
      clove: {
        name: "Clove",
        role: "Immortal",
        status: "ACTIVE",
        efficiency: "96%",
        missions: "189",
        location: "Pearl",
        image: "/agentsDetails/Clove/Clove_Icon.png",
        banner: "/agentsDetails/Clove/Clove_Playercard.jpg",
        video:
        "/agentsDetails/reyna/video.mp4",
        bannerZoom: 1,
        bannerOffset: "center top",
        videoZoom: 1,
        videoOffset: "center",
        voiceLine: "/agentsDetails/Clove/Clove_Voiceline.mp3"
      },
      jett: {
        name: "Jett",
        role: "Airbender",
        status: "ACTIVE",
        efficiency: "86%",
        missions: "189",
        location: "Lotus",
        image: "/agentsDetails/Jett/Jett_Icon.png",
        banner: "/agentsDetails/Jett/Jett_Playercard.jpg",
        video:
        "/agentsDetails/reyna/video.mp4",
        bannerZoom: 1,
        bannerOffset: "center top",
        videoZoom: 1,
        videoOffset: "center",
        voiceLine: "/agentsDetails/Jett/Jett_Voiceline.mp3"
      },
      neon: {
        name: "Neon",
        role: "Electrician",
        status: "ACTIVE",
        efficiency: "82%",
        missions: "189",
        location: "Lotus",
        image: "/agentsDetails/Neon/Neon_Icon.png",
        banner: "/agentsDetails/Neon/Neon_Playercard.jpg",
        video:
        "/agentsDetails/reyna/video.mp4",
        bannerZoom: 1,
        bannerOffset: "center top",
        videoZoom: 1,
        videoOffset: "center",
        voiceLine: "/agentsDetails/Neon/Neon_Voiceline.mp3"
      },
      omen: {
        name: "Omen",
        role: "Shadow Killer",
        status: "ACTIVE",
        efficiency: "82%",
        missions: "189",
        location: "Lotus",
        image: "/agentsDetails/Omen/Omen_Icon.png",
        banner: "/agentsDetails/Omen/Omen_Playercard.jpg",
        video:
        "/agentsDetails/reyna/video.mp4",
        bannerZoom: 1,
        bannerOffset: "center top",
        videoZoom: 1,
        videoOffset: "center",
        voiceLine: "/agentsDetails/Omen/Omen_Voicline.mp3"
      },
      yoru: {
        name: "Yoru",
        role: "Rift Walker",
        status: "ACTIVE",
        efficiency: "100%",
        missions: "189",
        location: "Lotus",
        image: "/agentsDetails/Yoru/Yoru_Icon.png",
        banner: "/agentsDetails/Yoru/Yoru_Playercard.jpg",
        video:
        "/agentsDetails/reyna/video.mp4",
        bannerZoom: 1,
        bannerOffset: "center top",
        videoZoom: 1,
        videoOffset: "center",
        voiceLine: "/agentsDetails/Yoru/Yoru_Voiceline.mp3"
      },
    };
  });

  // Reset selected agent if it's no longer visible
  useEffect(() => {
    if (
      selectedAgent &&
      visibleAgents &&
      !visibleAgents.includes(selectedAgent)
    ) {
      setSelectedAgent(null);
    }
  }, [visibleAgents, selectedAgent]);

  // Handle animation end
  useEffect(() => {
    if (isAnimating && animationState === "closing") {
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setAnimationState("closed");
        setIsOpen(false);
        // Call the onClose callback if provided

        console.log("closed")

        if (onClose) {
          console.log("bitchah")
        }
      }, 1000); // Match this with the CSS animation duration

      return () => clearTimeout(timer);
    }
  }, [isAnimating, animationState, onClose]);

  const handleAgentSelect = (agentId) => {
    setSelectedAgent(agentId);
    if (onAgentSelect) {
      onAgentSelect(agentId, agents[agentId]);
    }
    playAudio(agents[agentId].voiceLine)
  };

  const handleMouseEnter = (buttonId) => {
    setActiveButton(buttonId);
  };

  const handleMouseLeave = () => {
    setActiveButton(null);
  };

  const handleClose = () => {
    setIsAnimating(true);
    setAnimationState("closing");

    setTimeout(() => {
      onClose()
    }, 300);
  };

  // Method to open the panel (can be called externally via ref)
  const openPanel = () => {
    if (animationState === "closed" || animationState === "closing") {
      setIsOpen(true);
      setIsAnimating(true);
      setAnimationState("opening");

      // Set to open after animation completes
      setTimeout(() => {
        setIsAnimating(false);
        setAnimationState("open");
      }, 500); // Match this with the CSS animation duration
    }
  };

  // Filter agents based on visibleAgents prop
  const getVisibleAgentEntries = () => {
    if (!visibleAgents) {
      // If no visibleAgents specified, show all agents
      return Object.entries(agents);
    }

    // Filter agents based on the provided IDs
    return Object.entries(agents).filter(([agentId]) =>
      visibleAgents.includes(agentId),
    );
  };

  const visibleAgentEntries = getVisibleAgentEntries();
  const hasVisibleAgents = visibleAgentEntries.length > 0;

  // Determine animation class
  const getPanelAnimationClass = () => {
    if (!isAnimating && animationState === "open") return styles.panelOpen;
    if (isAnimating && animationState === "opening") return styles.panelOpening;
    if (isAnimating && animationState === "closing") return styles.panelClosing;
    return "";
  };

  return (
    <>

      {audioInstances}
      
      <main className={styles.container}>
        {(isOpen || isAnimating) && (
          <section
            className={`${styles.agentPanel} ${getPanelAnimationClass()}`}
          >
            <header className={styles.bannerContainer}>
              <img
                src={headBanner}
                alt="Mission control banner"
                className={styles.bannerImage}
              />
              <button
                className={styles.closeButton}
                onClick={handleClose}
                onMouseEnter={() => handleMouseEnter("close")}
                onMouseLeave={handleMouseLeave}
                style={{
                  background: activeButton === "close" ? "#1A1A1A" : "#0A0A0A",
                }}
                aria-label="Close agent selection panel"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 1L13 13M1 13L13 1"
                    stroke="#666666"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </header>

            <section className={styles.detailsContainer}>
              {!selectedAgent ? (
                <p className={styles.selectionPrompt}>
                  {hasVisibleAgents
                    ? "SELECT AN AGENT TO VIEW DETAILS"
                    : "NO AGENTS AVAILABLE"}
                </p>
              ) : (
                <AgentDetails agent={agents[selectedAgent]} />
              )}
            </section>

            <footer className={styles.agentSelectionBar}>
              <nav className={styles.agentButtonsContainer}>
                {visibleAgentEntries.map(([agentId, agent]) => (
                  <AgentButton
                    key={agentId}
                    agentId={agentId}
                    agentName={agent.name}
                    image={agent.image}
                    isActive={activeButton === agentId}
                    isSelected={selectedAgent === agentId}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleAgentSelect}
                  />
                ))}
              </nav>
            </footer>
          </section>
        )}
      </main>

      {/* Font import for JetBrains Mono */}
      <div>
        <div
          dangerouslySetInnerHTML={{
            __html:
              '<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap" rel="stylesheet">',
          }}
        />
      </div>
    </>
  );
};

export default InputDesign;
