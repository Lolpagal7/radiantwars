import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Jupiter({ position = [0, 0, 0], rotation = [0, 0, 0], ...props }) {
  const { nodes, materials } = useGLTF('/jupiter.glb')

  return (
    <group {...props} dispose={null}>
      <group position={position} rotation={rotation}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere_1.geometry}
          material={materials.jupiter}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/jupiter.glb')
