import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Suspense, useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import BlackHole from './blakhole'



function AnimatedCameraControls() {
  const controlsRef = useRef()
  const targetRef = useRef(new THREE.Vector3(0, 0, 0)) // top-left look target
  const [isUserControlling, setIsUserControlling] = useState(false)

  useEffect(() => {
    const controls = controlsRef.current
    if (!controls) return

    const handleStart = () => setIsUserControlling(true)
    const handleEnd = () => setIsUserControlling(false)

    controls.addEventListener('start', handleStart)
    controls.addEventListener('end', handleEnd)

    return () => {
      controls.removeEventListener('start', handleStart)
      controls.removeEventListener('end', handleEnd)
    }
  }, [])

  useFrame(() => {
    const controls = controlsRef.current
    const theta = performance.now() * 0.00002
    const center = new THREE.Vector3(0, 0, 0) // black hole pos

    if (!isUserControlling && controls) {
      const radius = 5
      const x = center.x + radius * -Math.sin(theta)
      const z = center.z + radius * -Math.cos(theta)
      const y = center.y - 2 + theta * 0.07
      const desiredPos = new THREE.Vector3(x, y, z)

      controls.object.position.lerp(desiredPos, 0.05)
      controls.target.lerp(targetRef.current, 0.05)
      controls.update()
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={false}
      enablePan={false}
      rotateSpeed={0.3}
      center = {[0, 0, 0]}
    />
  )
}

function SpaceScene() {
  const [potato] = useState(true )

  return (
    <div style={{ width: '100%', height: '100%', background: 'black' }}>
      <Canvas camera={{ position: [0, 0, 0], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          {!potato && <pointLight position={[10, 10, 10]} intensity={1.5  } />}
          {!potato && <pointLight position={[0, 0, 0]} intensity={5} color={'white'} />}

          <Stars radius={100} depth={50} count={5000} factor={4} fade />

          <AnimatedCameraControls />

          <BlackHole
            position={[1, 1, 1]}
            rotation={[-0.5, 3, 0]}
            rotationRate={[0, 0.005, 0]}
          />

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
