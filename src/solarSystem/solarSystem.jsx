import { Canvas } from '@react-three/fiber'
import { Stars, CameraControls } from '@react-three/drei'
import React from 'react'
import { Leva, useControls } from 'leva'

import { EffectComposer, Bloom } from '@react-three/postprocessing'

import Model from './system.jsx'


function SolarSystem3D() {
  const jupiterControls = useControls('Jupiter', {
    x: { value: 2, min: -10, max: 10, step: 0.1 },
    y: { value: 0, min: -10, max: 10, step: 0.1 },
    z: { value: 0, min: -10, max: 10, step: 0.1 },
    rotX: { value: -Math.PI / 1, min: -Math.PI, max: Math.PI, step: 0.01 },
    rotY: { value: 4, min: -10, max: 10, step: 0.1 },
    rotZ: { value: 0, min: -10, max: 10, step: 0.1 },
  })

  const saturnControls = useControls('Saturn', {
    x: { value: -4, min: -10, max: 10, step: 0.1 },
    y: { value: 0, min: -10, max: 10, step: 0.1 },
    z: { value: 0, min: -10, max: 10, step: 0.1 },
    rotX: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    rotY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    rotZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
  })

  const earthControls = useControls('Earth', {
    x: { value: 0, min: -10, max: 10, step: 0.1 },
    y: { value: 0, min: -10, max: 10, step: 0.1 },
    z: { value: 4, min: -10, max: 10, step: 0.1 },
    rotX: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    rotY: { value: 1, min: -Math.PI, max: Math.PI, step: 0.01 },
    rotZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
  })

  return (
    <div style={{ width: '100vw', height: '100vh', background: 'black' }}>
      <Leva collapsed={false} />
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Stars radius={100} depth={50} count={5000} factor={4} fade />

        

        <Model/>

        <CameraControls />

        <EffectComposer>
          <Bloom
              intensity={1.2}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              mipmapBlur
          />
          </EffectComposer>
      </Canvas>
    </div>
  )
}

export default SolarSystem3D
