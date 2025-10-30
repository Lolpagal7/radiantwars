import { Canvas } from '@react-three/fiber'
import React from 'react'

import { CameraControls } from '@react-three/drei'

// Capital "T" for the component
import Tejo from './tejo'
import Omen from './omen'


function Agents() {
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

        {/* Capitalized Component */}
        <Tejo />

        <CameraControls/>
      </Canvas>
    </div>
  )
}

export default Agents
