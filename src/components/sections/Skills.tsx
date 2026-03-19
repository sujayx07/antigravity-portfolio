"use client";

import * as THREE from "three";
import { useRef, useState, useMemo, Suspense } from "react";
import { motion, useInView } from "framer-motion";
import { marqueeText } from "@/lib/data";
import Marquee from "@/components/ui/Marquee";
import SectionTransition from "@/components/ui/SectionTransition";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useTexture } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

const imageUrls = [
  "/images/react.webp",
  "/images/next.webp",
  "/images/node.webp",
  "/images/express.webp",
  "/images/mysql.webp",
  "/images/typescript.webp",
  "/images/javascript.webp",
];

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const spheres = [...Array(30)].map(() => ({
  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

function TechStackInner({ isActive }: { isActive: boolean }) {
  // useTexture handles suspense and prevents SSR window/document issues
  const textures = useTexture(imageUrls);
  
  const materials = useMemo(() => {
    return textures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 0.3,
          metalness: 0.5,
          roughness: 1,
          clearcoat: 0.1,
        })
    );
  }, [textures]);

  return (
    <Physics gravity={[0, 0, 0]}>
      <Pointer isActive={isActive} />
      {spheres.map((props, i) => (
        <SphereGeo
          key={i}
          {...props}
          material={materials[Math.floor(Math.random() * materials.length)]}
          isActive={isActive}
        />
      ))}
    </Physics>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section-black relative py-20 md:py-32 overflow-hidden flex flex-col justify-center"
    >
      <div className="relative w-full h-[70vh] min-h-[500px] md:h-screen md:min-h-[700px] flex items-center justify-center">
        
        {/* Subtle Background Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] md:w-[250px] md:h-[250px] bg-[#d3a1ff]/30 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

        {/* Center Title */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] z-0 pointer-events-none text-center w-full px-4">
          <motion.h2
            className="text-[10vw] md:text-[7vw] font-display text-white whitespace-nowrap uppercase tracking-wider font-light"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            My Techstack
          </motion.h2>
        </div>

        {/* 3D Tech Stack Canvas (Interactive overlay) */}
        <div 
          className="absolute inset-0 z-10 w-full h-full cursor-grab active:cursor-grabbing mt-10 md:mt-20"
          data-cursor-expand
        >
          <Canvas
            shadows
            gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
            camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
            onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
            className="w-full h-full"
          >
            <ambientLight intensity={1} />
            <spotLight
              position={[20, 20, 25]}
              penumbra={1}
              angle={0.2}
              color="white"
              castShadow
              shadow-mapSize={[512, 512]}
            />
            <directionalLight position={[0, 5, -4]} intensity={2} />
            
            <Suspense fallback={null}>
              <TechStackInner isActive={inView} />
              <Environment
                files="/models/char_enviorment.hdr"
                environmentIntensity={0.5}
                environmentRotation={[0, 4, 2]}
              />
            </Suspense>
            
            <EffectComposer enableNormalPass={false}>
              <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
            </EffectComposer>
          </Canvas>
        </div>
      </div>

      {/* Full-width Marquee at bottom */}
      <div className="border-t border-b border-white/10 py-5 pointer-events-none mt-auto">
        <Marquee text={marqueeText} velocityBased className="text-white" />
      </div>

      <SectionTransition from="black" to="white" />
    </section>
  );
}
