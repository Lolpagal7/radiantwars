
import React, { useRef, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from 'react-three-fiber'



export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/solar_system_360.glb')
  const { actions } = useAnimations(animations, group)


  const [time, setTime] = useState(0)

  
  const [sunRadius, setSunRadius] = useState()
  const [mercuryRadius, setMercuryRadius] = useState(9769.78)
  const [venusRadius, setVenusRadius] = useState(15262.693)
  const [earthRadius, setEarthRadius] = useState(21032.74)
  const [marsRadius, setMarsRadius] = useState(28133.236)
  const [jupiterRadius, setJupiterRadius] = useState(36642.492)
  const [saturnRadius, setSaturnRadius] = useState(51768.129)
  const [uranusRadius, setUranusRadius] = useState(66184.875)
  const [neptuneRadius, setNeptuneRadius] = useState(79942.305)
  
  const [mercuryAngularVelocity, setMercuryAngularVelocity] = useState(5)
  const [venusAngularVelocity, setVenusAngularVelocity] = useState(4)
  const [earthAngularVelocity, setEarthAngularVelocity] = useState(2)
  const [marsAngularVelocity, setMarsAngularVelocity] = useState(3)
  const [jupiterAngularVelocity, setJupiterAngularVelocity] = useState(2)
  const [saturnAngularVelocity, setSaturnAngularVelocity] = useState(1)
  const [uranusAngularVelocity, setUranusAngularVelocity] = useState(0.9)
  const [neptuneAngularVelocity, setNeptuneAngularVelocity] = useState(2.1)
  
  const [sunPosition, setSunPosition] = useState([0, 0, 0])
  const [mercuryPosition, setMercuryPosition] = useState([Math.sin(mercuryAngularVelocity * time) * mercuryRadius, 0, Math.cos(mercuryAngularVelocity * time) * mercuryRadius])
  const [venusPosition, setVenusPosition] = useState([Math.sin(venusAngularVelocity * time) * venusRadius, 0, Math.cos(venusAngularVelocity * time) * venusRadius])
  const [earthPosition, setEarthPosition] = useState([Math.sin(earthAngularVelocity * time) * earthRadius, 0, Math.cos(earthAngularVelocity * time) * earthRadius])
  const [marsPosition, setMarsPosition] = useState([Math.sin(marsAngularVelocity * time) * marsRadius, 0, Math.cos(marsAngularVelocity * time) * marsRadius])
  const [jupiterPosition, setJupiterPosition] = useState([Math.sin(jupiterAngularVelocity * time) * jupiterRadius, 0, Math.cos(jupiterAngularVelocity * time) * jupiterRadius])
  const [saturnPosition, setSaturnPosition] = useState([Math.sin(saturnAngularVelocity * time) * saturnRadius, 0, Math.cos(saturnAngularVelocity * time) * saturnRadius])
  const [uranusPosition, setUranusPosition] = useState([Math.sin(uranusAngularVelocity * time) * uranusRadius, 0, Math.cos(uranusAngularVelocity * time) * uranusRadius])
  const [neptunePosition, setNeptunePosition] = useState([Math.sin(neptuneAngularVelocity * time) * neptuneRadius, 0, Math.cos(neptuneAngularVelocity * time) * neptuneRadius])

  useFrame((state) => {
    setTime(state.clock.getElapsedTime()/10)

    setMercuryPosition([Math.sin(mercuryAngularVelocity * time) * mercuryRadius, 0, Math.cos(mercuryAngularVelocity * time) * mercuryRadius])
    setVenusPosition([Math.sin(venusAngularVelocity * time) * venusRadius, 0, Math.cos(venusAngularVelocity * time) * venusRadius])
    setEarthPosition([Math.sin(earthAngularVelocity * time) * earthRadius, 0, Math.cos(earthAngularVelocity * time) * earthRadius])
    setMarsPosition([Math.sin(marsAngularVelocity * time) * marsRadius, 0, Math.cos(marsAngularVelocity * time) * marsRadius])
    setJupiterPosition([Math.sin(jupiterAngularVelocity * time) * jupiterRadius, 0, Math.cos(jupiterAngularVelocity * time) * jupiterRadius])
    setSaturnPosition([Math.sin(saturnAngularVelocity * time) * saturnRadius, 0, Math.cos(saturnAngularVelocity * time) * saturnRadius])
    setUranusPosition([Math.sin(uranusAngularVelocity * time) * uranusRadius, 0, Math.cos(uranusAngularVelocity * time) * uranusRadius])
    setNeptunePosition([Math.sin(neptuneAngularVelocity * time) * neptuneRadius, 0, Math.cos(neptuneAngularVelocity * time) * neptuneRadius])
  })
  

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={0.024}>
          <group
            name="eac8aed15f45477886404f2650a65854fbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}>
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="Light"
                  position={[74.506, 90.825, 87.47]}
                  rotation={[-1.642, 0.113, 2.966]}
                  scale={100}>
                  <group name="Object_5" rotation={[Math.PI / 2, 0, 0]}>
                    <group name="Object_6" />
                  </group>
                </group>
                <group
                  name="Earth"
                  position={earthPosition}
                  rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                  scale={100}>
                  <mesh
                    name="Earth_Earth_Diffuse_6K_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Earth_Earth_Diffuse_6K_0.geometry}
                    material={materials.Earth_Diffuse_6K}
                  />
                  <group
                    name="Clouds"
                    position={[-0.091, 0.001, 0]}
                    rotation={[-1.014, 1.04, -1.945]}
                    scale={42.031}>
                    <mesh
                      name="Clouds_Clouds_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Clouds_Clouds_0.geometry}
                      material={materials.Clouds}
                    />
                  </group>
                </group>
                <group
                  name="Jupiter"
                  position={jupiterPosition}
                  rotation={[-Math.PI / 2, 0, -1.578]}
                  scale={-100}>
                  <mesh
                    name="Jupiter_Jupiter_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Jupiter_Jupiter_0.geometry}
                    material={materials.Jupiter}
                  />
                </group>
                <group
                  name="Neptune"
                  position={neptunePosition}
                  rotation={[-Math.PI / 2, 0, -1.547]}
                  scale={-100}>
                  <mesh
                    name="Neptune_Neptune_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Neptune_Neptune_0.geometry}
                    material={materials.Neptune}
                  />
                </group>
                <group
                  name="Uranus"
                  position={uranusPosition}
                  rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                  scale={100}>
                  <mesh
                    name="Uranus_Uranus_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Uranus_Uranus_0.geometry}
                    material={materials.Uranus}
                  />
                </group>
                <group
                  name="Mars"
                  position={marsPosition}
                  rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                  scale={100}>
                  <mesh
                    name="Mars_Mars_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Mars_Mars_0.geometry}
                    material={materials.Mars}
                  />
                </group>
                <group
                  name="Mercury"
                  position={mercuryPosition}
                  rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                  scale={100}>
                  <mesh
                    name="Mercury_Mercury_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Mercury_Mercury_0.geometry}
                    material={materials.Mercury}
                  />
                </group>
                <group
                  name="Venus"
                  position={venusPosition}
                  rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                  scale={100}>
                  <mesh
                    name="Venus_Venus_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Venus_Venus_0.geometry}
                    material={materials.Venus}
                  />
                </group>
                <group
                  name="Saturn"
                  position={saturnPosition}
                  rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                  scale={100}>
                  <mesh
                    name="Saturn_Saturnus_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Saturn_Saturnus_0.geometry}
                    material={materials.Saturnus}
                  />
                  <group
                    name="Plane"
                    position={[-0.1, -0.02, -0.003]}
                    rotation={[0.248, -0.091, -0.629]}
                    scale={230.602}>
                    <mesh
                      name="Plane_Saturn_Rings_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Plane_Saturn_Rings_0.geometry}
                      material={materials.Saturn_Rings}
                    />
                  </group>
                </group>
                <group
                  name="Sun"
                  rotation={[-2.585, 1.04, -1.945]}
                  scale={[19999.998, 20000, 20000.002]}>
                  <mesh
                    name="Sun_Sun_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Sun_Sun_0.geometry}
                    material={materials.material}
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

useGLTF.preload('/solar_system_360.glb')