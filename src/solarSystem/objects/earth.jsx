import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Earth({ position = [0, 0, 0], rotation = [0, 0, 0], ...props }) {
  const { nodes, materials } = useGLTF('/earth.glb')

  return (
    <group {...props} dispose={null} position={position} rotation={rotation}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes?.Object_2?.geometry}
        material={materials?.Earth || materials?.moon}
      />
    </group>
  )
}

useGLTF.preload('/earth.glb')
