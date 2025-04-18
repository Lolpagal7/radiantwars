import { useRef, useMemo } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import * as THREE from 'three'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Canvas } from '@react-three/fiber'

// Custom shader material
class LensingMaterial extends THREE.ShaderMaterial {
    constructor() {
        super({
            uniforms: {
                time: { value: 0 },
                intensity: { value: 1.5 }
            },
            vertexShader: `
        varying vec3 vPosition;
        varying vec2 vUv;
        void main() {
          vPosition = position;
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        uniform float time;
        uniform float intensity;
        varying vec3 vPosition;
        varying vec2 vUv;
        
        void main() {
          vec2 uv = vUv - 0.5;
          float dist = length(uv);
          
          float distortion = intensity * 0.3 / (dist + 0.05);
          float angle = distortion * 2.0 + time * 0.5;
          uv.x = uv.x * cos(angle) - uv.y * sin(angle);
          uv.y = uv.x * sin(angle) + uv.y * cos(angle);
          
          vec3 color = vec3(
            0.5 + 0.3 * sin(time + uv.x * 10.0),
            0.3 + 0.2 * cos(time * 0.7 + uv.y * 12.0),
            0.7 + 0.1 * sin(time * 0.3 + (uv.x + uv.y) * 15.0)
          );
          
          float alpha = smoothstep(0.5, 0.3, dist);
          gl_FragColor = vec4(color * alpha, alpha * 0.7);
        }
      `,
            transparent: true,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending
        })
    }
}

extend({ LensingMaterial })

const BlackHole = ({
                       intensity = 1.5,
                       scale = 1,
                       position = [0, 0, 0]
                   }) => {
    const blackHoleRef = useRef("")
    const diskRef = useRef("")
    const lensingRef = useRef("")

    // Create accretion disk texture
    const diskTexture = useMemo(() => {
        const canvas = document.createElement('canvas')
        const size = 1024
        canvas.width = size
        canvas.height = size
        const ctx = canvas.getContext('2d')

        const gradient = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2)
        gradient.addColorStop(0, 'rgba(0,0,0,0)')
        gradient.addColorStop(0.1, 'rgba(100,0,255,0.9)')
        gradient.addColorStop(0.3, 'rgba(255,50,0,0.8)')
        gradient.addColorStop(0.6, 'rgba(255,200,0,0.5)')
        gradient.addColorStop(1, 'rgba(255,255,200,0.2)')

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, size, size)

        ctx.strokeStyle = 'rgba(255,255,255,0.4)'
        ctx.lineWidth = 3
        const arms = 3
        for (let i = 0; i < 50; i++) {
            ctx.beginPath()
            for (let a = 0; a < arms; a++) {
                const angle = (a / arms) * Math.PI * 2 + (i / 50) * Math.PI * 4
                const radius = 20 + i * 15
                const x = size/2 + Math.cos(angle) * radius
                const y = size/2 + Math.sin(angle) * radius
                if (i === 0) ctx.moveTo(x, y)
                else ctx.lineTo(x, y)
            }
            ctx.stroke()
        }

        return new THREE.CanvasTexture(canvas)
    }, [])

    // Animation loop
    useFrame(({ clock }) => {
        const t = clock.getElapsedTime()

        if (diskRef.current) {
            diskRef.current.rotation.y = t * 0.15
            diskRef.current.rotation.x = Math.PI/2 + Math.sin(t * 0.3) * 0.1
        }

        if (blackHoleRef.current) {
            const pulse = 1 + Math.sin(t * 2) * 0.02 * intensity
            blackHoleRef.current.scale.set(pulse, pulse, pulse)
        }

        if (lensingRef.current) {
            lensingRef.current.uniforms.time.value = t
            lensingRef.current.uniforms.intensity.value = intensity
        }
    })

    return (
        <group position={position} scale={[scale, scale, scale]}>
            <mesh ref={blackHoleRef}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshBasicMaterial color="black" />
            </mesh>

            <mesh ref={diskRef}>
                <ringGeometry args={[1.05, 5, 128]} />
                <meshBasicMaterial
                    map={diskTexture}
                    side={THREE.DoubleSide}
                    transparent
                    opacity={0.9}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            <mesh>
                <sphereGeometry args={[1.8, 64, 64]} />
                <lensingMaterial ref={lensingRef} />
            </mesh>
        </group>
    )
}

const BlackHoleScene = () => {
    return (
        <Canvas
            dpr={Math.max(window.devicePixelRatio, 2)}
            camera={{ position: [0, 0, 8], fov: 45 }}
            style={{ position: 'fixed', inset: 0 }}
        >
            <color attach="background" args={['black']} />
            <ambientLight intensity={0.1} />
            <pointLight position={[10, 10, 5]} intensity={2} color="#5500ff" />
            <pointLight position={[-10, -10, -5]} intensity={1} color="#ff0055" />
            <BlackHole intensity={1.8} scale={1.2} />
            <EffectComposer>
                <Bloom intensity={1.2} luminanceThreshold={0} luminanceSmoothing={0.9} height={500} />
            </EffectComposer>
        </Canvas>
    )
}

export { BlackHole as default, BlackHoleScene }