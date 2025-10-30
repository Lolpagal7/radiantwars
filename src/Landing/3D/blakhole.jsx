import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function BlackHole({
    position = [0, 0, 0],
    rotation = [1, 0, 0],
    rotationRate = [0, 0.01, 0], // radians per frame
    ...props
  }) {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF('/blackhole.glb')
    useAnimations(animations, group)
  
    
    // Rotate the black hole group every frame
    useFrame(() => {
      if (group.current) {
        group.current.rotation.x += rotationRate[0]
        group.current.rotation.y += rotationRate[1]
        group.current.rotation.z += rotationRate[2]
      }
    })

  return (
    <group ref={group} {...props} dispose={null} rotation={rotation}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={0.01555599}>
          <group name="415c209837844e7b91255101a7c3eb67fbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Blackhole_core" rotation={[-Math.PI / 2, 0, 0]} scale={0.96799999}>
                  <mesh
                    name="Blackhole_core_Blackhole_core_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Blackhole_core_Blackhole_core_0.geometry}
                    material={materials.Blackhole_core}
                    
                  />
                </group>
                <group name="Blackhole_ring" rotation={[-Math.PI / 2, 0, 0]}>
                  <mesh
                    name="Blackhole_ring_Blackhole_ring_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Blackhole_ring_Blackhole_ring_0.geometry}
                    material={materials.Blackhole_ring}
                    
                  />
                </group>
                <group name="Blackhole_skin_001" rotation={[-Math.PI / 2, 0, 0]} scale={0.95934796}>
                  <mesh
                    name="Blackhole_skin_001_Blackhole_skin_0"
                    castShadow
                    
                    receiveShadow
                    geometry={nodes.Blackhole_skin_001_Blackhole_skin_0.geometry}
                    material={materials.Blackhole_skin}
                  />
                </group>
                <group name="Blackhole_skin_002" rotation={[-Math.PI / 2, 0, 0]} scale={0.9573859}>
                  <mesh
                    name="Blackhole_skin_002_Blackhole_core_0"
                    castShadow
                    
                    receiveShadow
                    geometry={nodes.Blackhole_skin_002_Blackhole_core_0.geometry}
                    material={materials.Blackhole_core}
                  />
                </group>
                <group name="Blackhole_skin_003" rotation={[-Math.PI / 2, 0, 0]} scale={0.91042119}>
                  <mesh
                    name="Blackhole_skin_003_Blackhole_skin_0"
                    castShadow
                    
                    receiveShadow
                    geometry={nodes.Blackhole_skin_003_Blackhole_skin_0.geometry}
                    material={materials.Blackhole_skin}
                  />
                </group>
                <group name="Blackhole_skin_004" rotation={[-Math.PI / 2, 0, 0]} scale={0.90842372}>
                  <mesh
                    name="Blackhole_skin_004_Blackhole_core_0"
                    castShadow
                    
                    receiveShadow
                    geometry={nodes.Blackhole_skin_004_Blackhole_core_0.geometry}
                    material={materials.Blackhole_core}
                  />
                </group>
                <group
                  name="Blackhole_skin_005"
                  rotation={[-Math.PI / 2, 0, 0.95993098]}
                  scale={0.90044695}>
                  <mesh
                    name="Blackhole_skin_005_Blackhole_skin_0"
                    castShadow
                    
                    receiveShadow
                    geometry={nodes.Blackhole_skin_005_Blackhole_skin_0.geometry}
                    material={materials.Blackhole_skin}
                  />
                </group>
                <group
                  name="Blackhole_skin_006"
                  rotation={[-Math.PI / 2, 0, -2.00712848]}
                  scale={0.86424893}>
                  <mesh
                    name="Blackhole_skin_006_Blackhole_skin_inner_0"
                    castShadow
                    
                    receiveShadow
                    geometry={nodes.Blackhole_skin_006_Blackhole_skin_inner_0.geometry}
                    material={materials.Blackhole_skin_inner}
                  />
                </group>
                <group
                  name="Blackhole_skin_007"
                  rotation={[-Math.PI / 2, 0, -2.00712848]}
                  scale={0.86632305}>
                  <mesh
                    name="Blackhole_skin_007_Blackhole_core_0"
                    castShadow
                    
                    receiveShadow
                    geometry={nodes.Blackhole_skin_007_Blackhole_core_0.geometry}
                    material={materials.Blackhole_core}
                  />
                </group>
                <group name="Blackhole_core001" rotation={[-Math.PI / 2, 0, 0]}>
                  <mesh
                    name="Blackhole_core001_Blackhole_core_0"
                    castShadow
                    
                    receiveShadow
                    geometry={nodes.Blackhole_core001_Blackhole_core_0.geometry}
                    material={materials.Blackhole_core}
                  />
                </group>
                <group
                  name="Blackhole_skin_008"
                  rotation={[-Math.PI / 2, 0, 0.08726614]}
                  scale={0.844643}>
                  <mesh
                    name="Blackhole_skin_008_Blackhole_skin_inner_0"
                    castShadow
                    
                    receiveShadow
                    geometry={nodes.Blackhole_skin_008_Blackhole_skin_inner_0.geometry}
                    material={materials.Blackhole_skin_inner}
                  />
                </group>
                <group
                  name="Blackhole_skin_009"
                  rotation={[-Math.PI / 2, 0, -0.61086564]}
                  scale={0.88712025}>
                  <mesh
                    name="Blackhole_skin_009_Blackhole_skin_0"
                    castShadow
                    
                    receiveShadow
                    geometry={nodes.Blackhole_skin_009_Blackhole_skin_0.geometry}
                    material={materials.Blackhole_skin}
                  />
                </group>
                <group
                  name="Blackhole_skin_010"
                  rotation={[-Math.PI / 2, 0, -2.53072746]}
                  scale={0.92894113}>
                  <mesh
                    name="Blackhole_skin_010_Blackhole_skin_0"
                    castShadow
                    
                    receiveShadow
                    geometry={nodes.Blackhole_skin_010_Blackhole_skin_0.geometry}
                    material={materials.Blackhole_skin}
                  />
                </group>
                <group
                  name="Blackhole_skin_011"
                  rotation={[-Math.PI / 2, 0, -2.53072743]}
                  scale={0.92819077}>
                  <mesh
                    name="Blackhole_skin_011_Blackhole_core_0"
                    castShadow
                    
                    receiveShadow
                    geometry={nodes.Blackhole_skin_011_Blackhole_core_0.geometry}
                    material={materials.Blackhole_core}
                  />
                </group>
                <group
                  name="Blackhole_skin_012"
                  rotation={[-Math.PI / 2, 0, 2.09439519]}
                  scale={0.85586697}>
                  <mesh
                    name="Blackhole_skin_012_Blackhole_skin_inner_0"
                    castShadow
                    
                    receiveShadow
                    geometry={nodes.Blackhole_skin_012_Blackhole_skin_inner_0.geometry}
                    material={materials.Blackhole_skin_inner}
                  />
                </group>
                <group
                  name="Blackhole_skin_013"
                  rotation={[-Math.PI / 2, 0, -2.9670599]}
                  scale={0.83483315}>
                  <mesh
                    name="Blackhole_skin_013_Blackhole_ring2_0"
                    castShadow
                    
                    receiveShadow
                    geometry={nodes.Blackhole_skin_013_Blackhole_ring2_0.geometry}
                    material={materials.Blackhole_ring2}
                  />
                </group>
                <group name="Blackhole_core002" rotation={[-Math.PI / 2, 0, 0]} scale={0.92802161}>
                  <mesh
                    name="Blackhole_core002_Blackhole_ring2_0"
                    castShadow
                    
                    receiveShadow
                    geometry={nodes.Blackhole_core002_Blackhole_ring2_0.geometry}
                    material={materials.Blackhole_ring2}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/blackhole.glb')


