import { Canvas } from '@react-three/fiber'
import { Stars, CameraControls } from '@react-three/drei'
import React from 'react'
import { Leva, useControls } from 'leva'

import Jupiter from './objects/jupiter.jsx'
import Saturn from "./objects/saturn.jsx"
import Earth from './objects/earth.jsx'

function SolarSystem3D() {
  const { x, y, z, rotX, rotY, rotZ } = useControls('Jupiter', {
    x: { value: 2, min: -10, max: 10, step: 0.1 },
    y: { value: 0, min: -10, max: 10, step: 0.1 },
    z: { value: 0, min: -10, max: 10, step: 0.1 },
    rotX: { value: -Math.PI / 1, min: -Math.PI, max: Math.PI, step: 0.01 },
    rotY: { value: 4, min: -10, max: 10, step: 0.1 },
    rotZ: { value: 0, min: -10, max: 10, step: 0.1 },
  })

  return (
    <div style={{ width: '100vw', height: '100vh', background: 'black' }}>
      <Leva collapsed={false} /> {/* UI Panel */}
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Stars radius={100} depth={50} count={5000} factor={4} fade />

        <Jupiter position={[x, y, z]} rotation={[rotX, rotY, rotZ]} />
        <Saturn position={[x, y, z]} rotation={[rotX, rotY, rotZ]} size={0.007}/>
        <Earth position={[x, y, z]} rotation={[rotX, rotY, rotZ]}/>
        

        <CameraControls />
      </Canvas>
    </div>
  )
}

export default SolarSystem3D
