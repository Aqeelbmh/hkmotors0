import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshWobbleMaterial, OrbitControls, PerspectiveCamera, Sparkles, Stars, Float as DreiFloat } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function TechBackground() {
  return (
    <>
      <Sparkles count={50} scale={10} size={1} speed={0.5} opacity={0.2} color="#F97316" />
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
    </>
  );
}

function PremiumWheel() {
  const group = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    group.current.rotation.z = time * 0.4;
    group.current.rotation.x = Math.sin(time * 0.2) * 0.1;
  });

  const spokeCount = 12;

  return (
    <group ref={group} rotation={[0.4, 0.4, 0]}>
      {/* Outer Rim - Massive & Technical */}
      <mesh>
        <torusGeometry args={[3, 0.15, 32, 100]} />
        <meshStandardMaterial color="#334155" metalness={1} roughness={0.05} />
      </mesh>

      {/* Tire / Outer Guard */}
      <mesh>
        <torusGeometry args={[3.2, 0.05, 16, 100]} />
        <meshStandardMaterial color="#0f172a" metalness={0.5} roughness={0.8} />
      </mesh>

      {/* Turbine Blades */}
      {[...Array(spokeCount)].map((_, i) => (
        <group key={i} rotation={[0, 0, (i * Math.PI * 2) / spokeCount]}>
          <mesh position={[1.5, 0, 0]} rotation={[0.5, 0, 0]}>
            <boxGeometry args={[2.8, 0.4, 0.05]} />
            <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[1.5, 0.05, 0.05]} rotation={[0.5, 0, 0]}>
            <boxGeometry args={[2.8, 0.05, 0.02]} />
            <meshStandardMaterial color="#F97316" emissive="#F97316" emissiveIntensity={2} />
          </mesh>
        </group>
      ))}

      {/* Central Core - High Energy */}
      <mesh>
        <cylinderGeometry args={[0.6, 0.6, 0.6, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#1e293b" metalness={1} roughness={0.1} />
      </mesh>

      {/* Inner Glow Core */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.7, 32]} />
        <MeshWobbleMaterial color="#F97316" factor={0.5} speed={2} factor={0.2} emissive="#F97316" emissiveIntensity={5} />
      </mesh>

      {/* Bolts / Details */}
      {[...Array(6)].map((_, i) => (
        <mesh key={`bolt-${i}`} position={[
          Math.cos((i * Math.PI * 2) / 6) * 0.8,
          Math.sin((i * Math.PI * 2) / 6) * 0.8,
          0.3
        ]}>
          <cylinderGeometry args={[0.08, 0.08, 0.1, 16]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#94a3b8" metalness={1} roughness={0} />
        </mesh>
      ))}
    </group>
  );
}

export function ThreeDHero() {
  return (
    <div className="absolute inset-0 z-0 opacity-60 lg:opacity-100">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />

        {/* Cinematic Lighting */}
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={1000} color="#fff" castShadow />
        <pointLight position={[-10, 5, 5]} intensity={500} color="#F97316" />
        <pointLight position={[0, -10, 0]} intensity={200} color="#3b82f6" />

        <TechBackground />

        <DreiFloat speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <PremiumWheel />
        </DreiFloat>

        {/* Post-processing effects simulated by Bloom via emissive intensity if Canvas supported, 
            but for now we stick to high intensity materials */}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
