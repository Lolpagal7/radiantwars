// blackHoleShader.js
export const BlackHoleShader = {
    uniforms: {
      tDiffuse: { value: null },
      uCenter: { value: [0.5, 0.5] }, // will be dynamically updated
      uRadius: { value: 0.25 },
      uStrength: { value: 0.5 }
    },
    vertexShader: /* glsl */`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */`
      uniform sampler2D tDiffuse;
      uniform vec2 uCenter;
      uniform float uRadius;
      uniform float uStrength;
      varying vec2 vUv;
  
      void main() {
        vec2 dir = vUv - uCenter;
        float dist = length(dir);
  
        // Only distort if we're within the radius
        float falloff = smoothstep(uRadius, 0.0, dist) * uStrength;
        vec2 offset = normalize(dir) * falloff * 0.03;
  
        vec2 uv = vUv + offset;
        gl_FragColor = texture2D(tDiffuse, uv);
      }
    `
  }

export function BlackHoleLensingPass({ blackHolePosition = new THREE.Vector3(0, 2, 0) }) {
    const { camera } = useThree()
    const passRef = useRef()
    const shaderPass = useMemo(() => new ShaderPass(BlackHoleShader), [])
  
    useFrame(() => {
      const screenPos = blackHolePosition.clone().project(camera)
      const ndc = [(screenPos.x + 1) / 2, (screenPos.y + 1) / 2]
  
      if (passRef.current?.uniforms?.uCenter) {
        passRef.current.uniforms.uCenter.value = ndc
      }
    })
  
    return <primitive ref={passRef} object={shaderPass} />
  }