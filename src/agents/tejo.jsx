import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Tejo(props) {
  const { nodes, materials, animations } = useGLTF('/agents/tejo/scene.gltf')

  // 🛑 Kill any broken animations on load
  useEffect(() => {
    if (animations && animations.length > 0) {
      animations.length = 0
    }
  }, [animations])

  return (
    <group {...props} dispose={null}>
      <group position={[0, -4, 0]} rotation={[-Math.PI, 1.57, -Math.PI]}>
        <primitive object={nodes.GLTF_created_0_rootJoint} />
        <skinnedMesh
          geometry={nodes.Object_6.geometry}
          material={materials.TP_Cashew_S0_Glass_MI}
          skeleton={nodes.Object_6.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_7.geometry}
          material={materials.TP_Cashew_S0_Drone_MI}
          skeleton={nodes.Object_7.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_8.geometry}
          material={materials.ABTP_Cashew_S0_Semtex_MI}
          skeleton={nodes.Object_8.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_9.geometry}
          material={materials.TP_Cashew_S0_Hair_MI}
          skeleton={nodes.Object_9.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_10.geometry}
          material={materials.TP_Cashew_S0_MI}
          skeleton={nodes.Object_10.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_11.geometry}
          material={materials.AB_Cashew_S0_E_Rocket_MI_Tejo}
          skeleton={nodes.Object_11.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_12.geometry}
          material={materials.TP_Cashew_S0_GauntletGlass_MI}
          skeleton={nodes.Object_12.skeleton}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/agents/tejo/scene.gltf')
