import { Canvas } from '@react-three/fiber'
import { Stars, CameraControls } from '@react-three/drei'
import React, { useState } from 'react'
import GlobeWithMarkers from './GlobeWithMarkers.jsx'
import Sun from './sun.jsx'
import Earth from './earth.jsx'

import { EffectComposer, Bloom } from '@react-three/postprocessing'

import "./solarSystem.css"



import { motion } from "framer-motion";
import InputDesign from './agentSelector/InputDesign.jsx'
import SolarSystemObserver from './uiOverlay/solarSystemExplorer.jsx'


import Marker from "./markerOverlay/marker.jsx"


function SolarSystem3D({handover}) {
  
  const [potato, setPotato] = useState(false)
  
  const [agentSelectorVisible, setAgentSelectorVisible] = useState(false)
  const [visibleAgentsList, setVisibleAgentsList] = useState([])
  const [agentSelectHeadBanner, setAgentSelectHeadBanner] = useState("https://placehold.co/1000x280")

  const [ascentVisible, setAscentVisible] = useState(false)
  const [screenSpaceascent, setSreenSpaceascent] = useState([0, 0])

  const [breezeVisible, setBreezeVisible] = useState(false)
  const [screenSpacebreeze, setSreenSpacebreeze] = useState([0, 0])

  const [lotusVisible, setLotusVisible] = useState(false)
  const [screenSpacelotus, setScreenSpacelotus] = useState([0, 0])

  const [pearlVisible, setPearlVisible] = useState(false)
  const [screenSpacepearl, setScreenSpacepearl] = useState([0, 0])

  const [bindVisible, setBindVisible] = useState(false)
  const [screenSpacebind, setScreenSpacebind] = useState([0, 0])

  const [fractureVisible, setFractureVisible] = useState(false)
  const [screenSpacefracture, setScreenSpacefracture] = useState([0, 0])
  
  const markers = [
    {
      lat: 20.4128,
      lon: -10.0060,
      label: 'Ascent',
      setIsVisible: setAscentVisible,
      setSSpace: setSreenSpaceascent
    },
    {
      lat: 30.4128,
      lon: 10.0060,
      label: 'Breeze',
      setIsVisible: setBreezeVisible,
      setSSpace: setSreenSpacebreeze
    },
    {
      lat: 10.0,
      lon: -60.0,
      label: 'Lotus',
      setIsVisible: setLotusVisible,
      setSSpace: setScreenSpacelotus
    },
    {
      lat: 20.0,
      lon: 170.0,
      label: 'Pearl',
      setIsVisible: setPearlVisible,
      setSSpace: setScreenSpacepearl
    },
    {
      lat: -20.0,
      lon: 210.0,
      label: 'Bind',
      setIsVisible: setBindVisible,
      setSSpace: setScreenSpacebind
    },
    {
      lat: 50.0,
      lon: -90.0,
      label: 'Fracture',
      setIsVisible: setFractureVisible,
      setSSpace: setScreenSpacefracture
    },
  ]

  const variantsAscent = {
    default: {
      x: screenSpaceascent.x,
      y: screenSpaceascent.y,
      transition: {
        x: { type: "tween", duration: 0.4 },
        y: { type: "tween", duration: 0.4 },
      }
    }
  }

  const variantsBreeze = {
    default: {
      x: screenSpacebreeze.x,
      y: screenSpacebreeze.y,
      transition: {
        x: { type: "tween", duration: 0.4 },
        y: { type: "tween", duration: 0.4 },
      }
    }
  }

  const variantsLotus = {
    default: {
      x: screenSpacelotus.x,
      y: screenSpacelotus.y,
      transition: {
        x: { type: "tween", duration: 0.4 },
        y: { type: "tween", duration: 0.4 },
      }
    }
  }

  const variantsPearl = {
    default: {
      x: screenSpacepearl.x,
      y: screenSpacepearl.y,
      transition: {
        x: { type: "tween", duration: 0.4 },
        y: { type: "tween", duration: 0.4 },
      }
    }
  }

  const variantsBind = {
    default: {
      x: screenSpacebind.x,
      y: screenSpacebind.y,
      transition: {
        x: { type: "tween", duration: 0.4 },
        y: { type: "tween", duration: 0.4 },
      }
    }
  }

  const variantsFracture = {
    default: {
      x: screenSpacefracture.x,
      y: screenSpacefracture.y,
      transition: {
        x: { type: "tween", duration: 0.1 },
        y: { type: "tween", duration: 0.1 },
      }
    }
  }
  
  const agentSelectCloseCallback = () => {
    setVisibleAgentsList([""])
    setAgentSelectHeadBanner("https://placehold.co/1000x280")
    setAgentSelectorVisible(false) 
  }

  const inspectAscent = () =>{
    setVisibleAgentsList(["clove", "reyna", "jett", "neon"])
    setAgentSelectHeadBanner("/maps/ascent.png")
    setAgentSelectorVisible(true)
  }
  const inspectBind = () =>{
    setVisibleAgentsList([""])
    setAgentSelectHeadBanner("/maps/bind.png") 
    setAgentSelectorVisible(true)
  }
  const inspectBreeze = () =>{
    setVisibleAgentsList(["omen", "yoru"])
    setAgentSelectHeadBanner("/maps/breeze.png") 
    setAgentSelectorVisible(true)
  }
  const inspectFracture = () =>{
    setVisibleAgentsList(["chamber", "tejo"])
    setAgentSelectHeadBanner("/maps/fracture.png") 
    //setbanner to heaven banner 
    setAgentSelectorVisible(true)
  }
  const inspectLotus = () =>{
    setVisibleAgentsList(["omen", "yoru"])
    setAgentSelectHeadBanner("/maps/lotus.png") 
    setAgentSelectorVisible(true)
  }
  const inspectPearl = () =>{
    setVisibleAgentsList([])
    
    setAgentSelectorVisible(true)
  }

  return (
    <div style={{ width: '100vw', height: '100vh', background: 'black', color: "white" }}>


      {agentSelectorVisible && <InputDesign visibleAgents={visibleAgentsList} onClose={agentSelectCloseCallback} headBanner={agentSelectHeadBanner} />}


      {ascentVisible && <motion.div variants={variantsAscent} animate="default" style={{
        height: "40px", width: "40px", position: "absolute", zIndex: 1, opacity: ascentVisible? 1: 0
      }}>
        <Marker click={inspectAscent} banner={"/maps/ascent.png"} agentsList={[
            { name: "Reyna", status: "Online" },
            { name: "Clove", status: "Online" },
            { name: "Neon", status: "Online" },
            { name: "Jett", status: "Online" },
          ]}/>
      </motion.div>}

      {bindVisible && <motion.div variants={variantsBind} animate="default" style={{
        height: "40px", width: "40px", position: "absolute", zIndex: 1, opacity: bindVisible? 1: 0
      }}>
        <Marker click={inspectBind} banner={"/maps/bind.png"} agentsList={[
            { name: "Brimstone", status: "Offline" },
            { name: "Vyse", status: "Offline" },
          ]}/>
      </motion.div>}

      {breezeVisible && <motion.div variants={variantsBreeze} animate="default" style={{
        height: "40px", width: "40px", position: "absolute", zIndex: 1, opacity: breezeVisible? 1: 0
      }}>
        <Marker click={inspectBreeze} banner={"/maps/breezze.png"} agentsList={[
            { name: "Waylay", status: "Offline" },
            { name: "Sage", status: "Offline" },
          ]}/>
      </motion.div>}

      {fractureVisible && <motion.div variants={variantsFracture} animate="default" style={{
        height: "40px", width: "40px", position: "absolute", zIndex: 1, opacity: fractureVisible? 1: 0
      }}>
        <Marker click={inspectFracture} banner={"/maps/fracture.png"} agentsList={[
            { name: "Chamber", status: "Online" },
            { name: "Tejo", status: "Online" },
          ]}/>
      </motion.div>}

      {lotusVisible && <motion.div variants={variantsLotus} animate="default" style={{
        height: "40px", width: "40px", position: "absolute", zIndex: 1, opacity: lotusVisible? 1: 0
      }}>
        <Marker click={inspectLotus} banner={"/maps/lotus.png"} agentsList={[
            { name: "Yoru", status: "Online" },
            { name: "Omen", status: "Online" },
          ]}/>
      </motion.div>}

      {ascentVisible && <motion.div variants={variantsPearl} animate="default" style={{
        height: "40px", width: "40px", position: "absolute", zIndex: 1, opacity: pearlVisible? 1: 0
      }}>
        <Marker click={inspectPearl} banner={"/maps/pearl.png"} agentsList={[
            { name: "Killjoy", status: "Offline" },
            { name: "Skye", status: "Offline" },
          ]}/>
      </motion.div>}


      {/* ================================================================================================ */}

      {/* 3D Canvas */}
      <Canvas shadows camera={{ position: [0, 0, 25], fov: 50 }}>
        <directionalLight
          position={[-90, 0, -90]}
          intensity={2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <Stars radius={100} depth={50} count={5000} factor={4} fade />

        <GlobeWithMarkers markers={markers}/>
        <Earth/>
        <CameraControls />
        <Sun position={[-100, 0, -100]} />

        {!potato && <EffectComposer>
          <Bloom
            intensity={1.2} // strength of bloom
            luminanceThreshold={0.3} // brighten only objects above this luminance
            luminanceSmoothing={0.9} // smooth transition
          />
        </EffectComposer>}

      </Canvas>

      <SolarSystemObserver onCompletion={handover}/>

    </div>
  )
}

export default SolarSystem3D
  
