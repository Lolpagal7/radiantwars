import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Saturn({ position, rotation, size, ...props}) {
  const { nodes, materials } = useGLTF('/saturno_v1.1.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={size}>
        <group position={[-0.484, -3.627, 0]} rotation={[-1.571, -1.386, 0.001]} scale={220.595}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_5.geometry}
            material={materials.material}
            position={[0.017, 0, 0.001]}
            rotation={[1.571, -0.002, -1.386]}
            scale={0.005}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_8.geometry}
            material={materials.material}
            position={[0.017, 0, 0.001]}
            rotation={[1.571, -0.002, -1.386]}
            scale={0.005}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_11.geometry}
            material={materials.material}
            position={[0.017, 0, 0.001]}
            rotation={[1.571, -0.002, -1.386]}
            scale={0.005}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_14.geometry}
            material={materials.material}
            position={[0.017, 0, 0.001]}
            rotation={[1.571, -0.002, -1.386]}
            scale={0.005}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_16.geometry}
            material={materials.material}
            position={[0.017, 0, 0.001]}
            rotation={[1.571, -0.002, -1.386]}
            scale={0.005}
          />
        </group>
        <group scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_20.geometry}
            material={materials.material_0}
            scale={0.01}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_23.geometry}
            material={materials.material_0}
            scale={0.01}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_25.geometry}
            material={materials.material_0}
            scale={0.01}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/saturno_v1.1.glb')