import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Omen(props) {
  const { nodes, materials, animations } = useGLTF('/agents/omen/scene.gltf')

  // 🛑 Kill any broken animations on load
  useEffect(() => {
    if (animations && animations.length > 0) {
      animations.length = 0
    }
  }, [animations])

  return (
    <group {...props} dispose={null}>
      <group position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <group rotation={[-Math.PI, 0, 0]}>
          <primitive object={nodes._rootJoint} />
          <skinnedMesh
            geometry={nodes.Object_7.geometry}
            material={materials.TP_Wraith_V5_S0_MI}
            skeleton={nodes.Object_7.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Object_8.geometry}
            material={materials.TP_Wraith_Head_S0_MI}
            skeleton={nodes.Object_8.skeleton}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/agents/omen/scene.gltf')

