import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Suspense, useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import BlackHole from './blakhole'

function AnimatedCameraControls({ shouldSpiralIn = false }) {
  const controlsRef = useRef()
  const targetRef = useRef(new THREE.Vector3(0, 0, 0))
  const [isUserControlling, setIsUserControlling] = useState(false)

  const tiltAngle = Math.PI / 5 // Tilt angle (~36 degrees)

  const thetaRef = useRef(Math.PI / 2) // Starting theta
  const angularVelocityRef = useRef(0.00002) // Angular speed (radians per ms)
  const angularAccel = 0.00000005 // Angular acceleration (radians per ms²)

  const radiusRef = useRef(5) // Starting radius
  const radialVelocityRef = useRef(0) // Radial shrinking speed
  const radialAccel = -0.00000005 // Radial acceleration

  const spiralTimeRef = useRef(0) // How long we’ve been spiraling (for shaking strength)

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

  useFrame((state, delta) => {
    const controls = controlsRef.current
    const center = targetRef.current

    if (!controls) return

    if (!isUserControlling) {
      const elapsedMs = delta * 1000

      if (shouldSpiralIn) {
        angularVelocityRef.current += angularAccel * elapsedMs
        radialVelocityRef.current += radialAccel * elapsedMs
        radiusRef.current += radialVelocityRef.current * elapsedMs

        radiusRef.current = Math.max(radiusRef.current, 1)

        spiralTimeRef.current += delta // accumulate time during spiral
      }

      thetaRef.current += angularVelocityRef.current * elapsedMs

      const radius = radiusRef.current
      const theta = thetaRef.current

      let x = center.x + radius * Math.cos(theta)
      let y = center.y + radius * Math.sin(theta) * Math.sin(tiltAngle)
      let z = center.z + radius * Math.sin(theta) * Math.cos(tiltAngle)

      // Apply growing camera shake during spiral
      if (shouldSpiralIn) {
        const shakeStrength = Math.min(spiralTimeRef.current * 0, 0.8) // Grow shake over time, cap at 1.5 units
        x += (Math.random() - 0.5) * shakeStrength
        y += (Math.random() - 0.5) * shakeStrength
        z += (Math.random() - 0.5) * shakeStrength
      }

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
      center={[0, 0, 0]}
    />
  )
}


function SpaceScene({shouldSpiralIn}) {
  const [potato] = useState(false )

  return (
    <div style={{ width: '100%', height: '100%', background: 'black' }}>
      <Canvas camera={{ position: [0, 0, 0], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          {!potato && <pointLight position={[10, 10, 10]} intensity={1.5  } />}
          {!potato && <pointLight position={[0, 0, 0]} intensity={5} color={'white'} />}

          <Stars radius={100} depth={50} count={5000} factor={4} fade />

          <AnimatedCameraControls shouldSpiralIn={shouldSpiralIn}/>

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
