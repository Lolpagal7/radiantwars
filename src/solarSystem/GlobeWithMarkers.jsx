import React, { useRef, useMemo } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import { Vector3, Raycaster, Color } from 'three'

function latLonToCartesian(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  const x = -radius * Math.sin(phi) * Math.cos(theta)
  const z = radius * Math.sin(phi) * Math.sin(theta)
  const y = radius * Math.cos(phi)
  return new Vector3(x, y, z)
}

function getRandomColor() {
  const color = new Color()
  color.setHSL(0.25, 0.8, 0.6)
  return color
}

const PulsingAura = ({ position, color, visible }) => {
  const meshRef = useRef()
  const startTime = useRef(performance.now())

  useFrame(() => {
    const elapsed = (performance.now() - startTime.current) / 1000
    const speed = 2
    const t = (elapsed % speed) / speed
    const scale = 0.05 + t * 0.2
    const opacity = (1 - t) * 0.4

    if (meshRef.current) {
      meshRef.current.scale.set(scale, scale, scale)
      meshRef.current.material.opacity = opacity
    }
  })

  return (
    <Sphere args={[1, 32, 32]} ref={meshRef} position={position} visible={visible}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.2}
        transparent
        opacity={0.4}
        depthWrite={false}
      />
    </Sphere>
  )
}

const GlobeWithMarkers = ({ radius = 7.5, markers }) => {
  const { camera, size } = useThree()
  const raycaster = useMemo(() => new Raycaster(), [])
  const globeRef = useRef()

  const markerData = useMemo(() => {
    return markers.map(marker => ({
      ...marker,
      color: getRandomColor(), // Optional: move this outside if you want consistent colors
    }))
  }, [markers.length])

  useFrame(() => {
    markerData.forEach(marker => {
      const worldPosition = latLonToCartesian(marker.lat, marker.lon, radius)

      const dir = worldPosition.clone().sub(camera.position).normalize()
      raycaster.set(camera.position, dir)

      const intersects = globeRef.current ? raycaster.intersectObject(globeRef.current) : []
      let visible = true

      if (intersects.length > 0) {
        const distToGlobe = intersects[0].distance
        const distToMarker = camera.position.distanceTo(worldPosition)
        if (distToGlobe < distToMarker - 0.01) visible = false
      }

      const vector = worldPosition.clone().project(camera)
      const screenSpace = {
        x: (vector.x * 0.5 + 0.5) * size.width,
        y: (vector.y * -0.5 + 0.5) * size.height,
      }

      // Call the setter to update screen-space position in the parent
      marker.setSSpace(screenSpace)
      marker.setIsVisible(visible)
    })
  })

  return (
    <>
      <Sphere args={[radius, 64, 64]} ref={globeRef}>
        <meshStandardMaterial color="#444" wireframe transparent opacity={0.01} />
      </Sphere>

      {markerData.map((marker, index) => {
        const worldPosition = latLonToCartesian(marker.lat, marker.lon, radius)
        return (
          <React.Fragment key={index}>
            <Sphere
              position={worldPosition}
              args={[0.07]}
              visible={marker.visible}
            >
              <meshStandardMaterial
                color={marker.color}
                emissive={marker.color}
                emissiveIntensity={1.5}
                transparent
                opacity={0.6}
              />
            </Sphere>

            <PulsingAura
              position={worldPosition}
              color={marker.color}
              visible={marker.visible}
            />
          </React.Fragment>
        )
      })}
    </>
  )
}

export default GlobeWithMarkers
