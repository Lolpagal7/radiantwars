import { Canvas } from '@react-three/fiber'
import { CameraControls, Stars } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Suspense, useState } from 'react'
import BlackHole from './blakhole'

function SpaceScene() {
  const [potato] = useState(true) // Correctly destructured

  return (
    <div style={{ width: '100vw', height: '100vh', background: 'black' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}> 
        <Suspense fallback={null}>
          {/* Lights */}
          <ambientLight intensity={0.3} />
          {!potato && <pointLight position={[10, 10, 10]} intensity={1.5} />}
          {!potato && <pointLight position={[0, 0, 0]} intensity={5} color={'white'} />}

          {/* Stars */}
          <Stars radius={100} depth={50} count={5000} factor={4} fade />


          {/* Black Hole */}
          <BlackHole
            position={[0, 2, 0]}
            rotation={[0.5, 0, 0]}
            rotationRate={[0, 0.005, 0]} // slow Y rotation
          />

          {/* Bloom */}
          {!potato && (
            <EffectComposer>
              <Bloom
                intensity={1.2}
                luminanceThreshold={0.2}
                luminanceSmoothing={0.9}
                mipmapBlur
              />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}

export default SpaceScene
