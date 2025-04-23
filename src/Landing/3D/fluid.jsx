import { useFrame, useThree, extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'


const GlowMaterial = shaderMaterial(
    { time: 0, color: new THREE.Color('#00a2ff') },
    `
      uniform float time;
      varying float vStrength;
  
      void main() {
        vec3 pos = position;
        float distortion = sin(time + position.x * 5.0) * 0.1  + cos(time + position.y * 5.0) * 0.1;
        pos += normalize(position) * distortion;
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        gl_PointSize = 3.0;
        vStrength = 1.0 - length(distortion);
      }
    `,
    `
      uniform vec3 color;
      varying float vStrength;
  
      void main() {
        float dist = distance(gl_PointCoord, vec2(0.9));
        float alpha = 1.0 - smoothstep(0.2, 0.5, dist);
        gl_FragColor = vec4(color, alpha * vStrength);
      }
    `
  )
  
  extend({ GlowMaterial })
  
  function GlowingFluidSphere({ count = 3000 }) {
    const ref = useRef()
    const materialRef = useRef()
    const { camera } = useThree()
  
    // Particle state: spherical base, plus chaos offsets
    const particles = useMemo(() => {
      const arr = []
      for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        const r = 1 + Math.random() * 0.2
  
        arr.push({
          theta,
          phi,
          r,
          spinSpeed: 0.2 + Math.random() * 0.4,
          chaosFreq: 0.5 + Math.random() * 1.5,
          chaosAmp: 0.1 + Math.random() * 0.15,
          chaosOffset: Math.random() * 1000,
        })
      }
      return arr
    }, [count])
  
    const positions = useMemo(() => new Float32Array(count * 3), [count])
  
    useFrame(({ clock }) => {
      const t = clock.getElapsedTime()
  
      for (let i = 0; i < count; i++) {
        const p = particles[i]
  
        const theta = p.theta + t * p.spinSpeed
        const phi = p.phi + Math.sin(t * 0.1 + p.chaosOffset) * 0.05
  
        const chaos = p.chaosAmp * Math.sin(t * p.chaosFreq + p.chaosOffset)
        const r = p.r + chaos
  
        const x = r * Math.sin(phi) * Math.cos(theta)
        const y = r * Math.sin(phi) * Math.sin(theta)
        const z = r * Math.cos(phi)
  
        positions[i * 3] = x
        positions[i * 3 + 1] = y
        positions[i * 3 + 2] = z
      }
  
      ref.current.geometry.attributes.position.array = positions
      ref.current.geometry.attributes.position.needsUpdate = true
  
      if (materialRef.current) {
        materialRef.current.uniforms.time.value = t
      }
  
      const distance = camera.position.distanceTo(ref.current.position)
      const scaleFactor = Math.max(1, 10 / distance)
      ref.current.scale.set(scaleFactor, scaleFactor, scaleFactor)
    })
  
    return (
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <glowMaterial
          ref={materialRef}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    )
  }

  export default GlowingFluidSphere();