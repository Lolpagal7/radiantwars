import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Earth({rotation, position, props}) {
    const { nodes, materials } = useGLTF('/earth.glb')
    return (
        <group {...props} dispose={null} position={position} rotation={rotation}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_4.geometry}
                material={materials.material_0}
                position={[0, 0, 0]}
                scale={14.79}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_6.geometry}
                material={materials.material_1}
                position={[0, 0, 0]}
                scale={15.128}
            />
        </group>
    )
}

useGLTF.preload('/earth.glb')
