import { Canvas } from '@react-three/fiber'
import { Stars, CameraControls } from '@react-three/drei'
import React from 'react'
import { EffectComposer, Bloom } from '@react-three/postprocessing'


import Earth from './earth.jsx'
import Sun from "./sun.jsx";

function SolarSystem3D() {
  return (
      <div style={{ width: '100vw', height: '100vh', background: 'black' }}>
        <Canvas shadows camera={{ position: [0, 0, 8], fov: 50 }}>

          {/* Brighter directional light with shadows */}
          <directionalLight
              position={[-90, 0, -90]}
              intensity={2}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
          />

          {/* Stars and objects */}
          <Stars radius={100} depth={50} count={5000} factor={4} fade />
          <Earth rotation={[0, 1, 0]}/>


          <CameraControls />
            <Sun position={[-100, 0 ,-100]}/>



          {/* Postprocessing: Bloom */}
          <EffectComposer>
            <Bloom
                intensity={1.2}
                luminanceThreshold={0.1}
                luminanceSmoothing={0.9}
            />
          </EffectComposer>
        </Canvas>
      </div>
  )
}

export default SolarSystem3D
