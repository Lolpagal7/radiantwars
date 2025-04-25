import { Line, Html, useFrame, useThree } from '@react-three/drei'
import * as THREE from 'three'
import { useRef } from 'react'

function sphericalToCartesian(radius, theta, phi) {
    return [
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta),
    ]
}

function SphereLabel({ radius = 1, theta, phi, label }) {
    const groupRef = useRef()
    const { camera } = useThree()

    const anchor = sphericalToCartesian(radius, theta, phi)
    const labelOffset = sphericalToCartesian(0.2, theta, phi)
    const labelPos = new THREE.Vector3(...anchor).add(new THREE.Vector3(...labelOffset))

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.lookAt(camera.position)
        }
    })

    return (
        <>
            <group ref={groupRef} position={labelPos}>
                <Html center distanceFactor={10}>
                    <div style={{
                        background: 'rgba(0,0,0,0.7)',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: 6,
                        fontSize: '14px',
                        whiteSpace: 'nowrap',
                    }}>
                        {label}
                    </div>
                </Html>
            </group>

            <Line
                points={[anchor, labelPos.toArray()]}
                color="white"
                lineWidth={1}
                dashed={false}
            />
        </>
    )
}

export default function sphereLabels({ radius = 1, labels = [], ...props }) {
    return (
        <group {...props}>
            {/* The Sphere */}
            <mesh>
                <sphereGeometry args={[radius, 64, 64]} />
                <meshStandardMaterial color="royalblue" />
            </mesh>

            {/* Labels from props */}
            {labels.map(({ theta, phi, label }, i) => (
                <SphereLabel key={i} radius={radius} theta={theta} phi={phi} label={label} />
            ))}
        </group>
    )
}
