import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

function Stars({ count = 800, spread = 20, rotationSpeed = 0.001 }) {
  const pointsRef = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i += 3) {
      arr[i] = (Math.random() - 0.5) * spread
      arr[i + 1] = (Math.random() - 0.5) * spread
      arr[i + 2] = (Math.random() - 0.5) * spread
    }
    return arr
  }, [count, spread])

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += rotationSpeed
    }
  })

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        sizeAttenuation
        color="#8ab4ff"
        opacity={0.65}
        transparent
        depthWrite={false}
      />
    </points>
  )
}

function EarthMoon() {
  const earth = useRef()
  const clouds = useRef()
  const moonGroup = useRef()
  const moon = useRef()

  useFrame((state, delta) => {
    if (earth.current) earth.current.rotation.y += delta * 0.05
    if (clouds.current) clouds.current.rotation.y += delta * 0.06
    if (moonGroup.current) moonGroup.current.rotation.y += delta * 0.22
    if (moon.current) moon.current.rotation.y += delta * 0.1
  })

  return (
    <group>
      <directionalLight position={[4, 2, 2]} intensity={1.05} color={'#fff0d0'} />
      <ambientLight intensity={0.22} />
      <EarthMoonTextured earthRef={earth} cloudsRef={clouds} moonGroupRef={moonGroup} moonRef={moon} />
    </group>
  )
}

function EarthMoonTextured({ earthRef, cloudsRef, moonGroupRef, moonRef }) {
  const [earthMap, earthSpec, cloudsMap, moonMap] = useLoader(THREE.TextureLoader, [
    'https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg',
    'https://threejs.org/examples/textures/planets/earth_specular_2048.jpg',
    'https://threejs.org/examples/textures/planets/earth_clouds_1024.png',
    'https://threejs.org/examples/textures/planets/moon_1024.jpg',
  ])
  if (earthMap) earthMap.anisotropy = 4
  if (cloudsMap) cloudsMap.anisotropy = 2
  if (moonMap) moonMap.anisotropy = 2

  return (
    <group>
      <mesh ref={earthRef} castShadow receiveShadow position={[0, 0, 0]}>
        <sphereGeometry args={[0.9, 64, 64]} />
        <meshPhongMaterial map={earthMap} specularMap={earthSpec} shininess={18} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.95, 64, 64]} />
        <meshBasicMaterial color={'#77b7ff'} transparent opacity={0.08} side={THREE.BackSide} />
      </mesh>
      <mesh ref={cloudsRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.92, 64, 64]} />
        <meshStandardMaterial map={cloudsMap} transparent opacity={0.3} depthWrite={false} />
      </mesh>
      <group ref={moonGroupRef} rotation={[0.2, 0, 0]}>
        <mesh ref={moonRef} position={[2.2, 0, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.24, 48, 48]} />
          <meshStandardMaterial map={moonMap} roughness={1} metalness={0} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.19, 2.21, 64]} />
          <meshBasicMaterial color={'#ffffff'} opacity={0.12} transparent />
        </mesh>
      </group>
    </group>
  )
}

function Scene({ mouseRef, reducedMotion }) {
  const group = useRef()
  const { camera } = useThree()
  const target = useRef(new THREE.Vector3())
  const scrollRef = useRef(0)

  useEffect(() => {
    camera.position.set(0, 0, 6)
  }, [camera])

  useEffect(() => {
    const onScroll = () => {
      const s = window.scrollY
      const max = Math.max(document.body.scrollHeight - window.innerHeight, 1)
      scrollRef.current = THREE.MathUtils.clamp(s / max, 0, 1)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useFrame(() => {
    if (!reducedMotion) {
      if (group.current) group.current.rotation.y += 0.0008
      const m = mouseRef.current || { x: 0, y: 0 }
      target.current.set(m.x * 0.6, m.y * 0.4, 6)
      camera.position.x += (target.current.x - camera.position.x) * 0.04
      camera.position.y += (target.current.y - camera.position.y) * 0.04
      camera.lookAt(0, 0, 0)
    }
  })

  return (
    <group ref={group}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[-5, -2, -4]} intensity={0.35} color={new THREE.Color('#6da0ff')} />
      <Stars count={650} spread={24} rotationSpeed={0.0006} />
      <group position={[0, 0, 0]}>
        <EarthMoon />
      </group>
    </group>
  )
}

export default function FixedBackground() {
  const mouseRef = useRef({ x: 0, y: 0 })
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      mouseRef.current = { x, y }
    }
    const handleLeave = () => {
      mouseRef.current = { x: 0, y: 0 }
    }
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseleave', handleLeave)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 60 }}
        frameloop={reducedMotion ? 'demand' : 'always'}
      >
        <color attach="background" args={[0, 0, 0, 0]} />
        <Scene mouseRef={mouseRef} reducedMotion={reducedMotion} />
        <EffectComposer multisampling={0}>
          <Bloom mipmapBlur intensity={0.6} luminanceThreshold={0.15} luminanceSmoothing={0.2} radius={0.8} />
        </EffectComposer>
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.08)_100%)]" />
    </div>
  )
}
