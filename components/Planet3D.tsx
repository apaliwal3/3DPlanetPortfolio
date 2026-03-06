"use client";

import { useRef, useState, Suspense, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { motion } from "framer-motion";
import type { Project } from "@/lib/data";
import * as THREE from "three";

// Preload the GLTF model immediately
useGLTF.preload("/models/scene.gltf");

type Props = {
  project: Project;
  large?: boolean;
  onClick?: () => void;
};

function PlanetModel({ project, hovered }: { project: Project; hovered: boolean }) {
  const meshRef = useRef<THREE.Group>(null);
  
  // Load the GLTF model using useGLTF from drei (better error handling)
  const gltf = useGLTF("/models/scene.gltf");

  // Clone and prepare the scene once
  const clonedScene = useMemo(() => {
    if (!gltf?.scene) return null;
    
    const scene = gltf.scene.clone(true);
    const projectColor = new THREE.Color(project.colors[2] || project.colors[0]);
    
    // Setup materials once
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          // Clone the material to avoid modifying the original
          const originalMaterial = mesh.material as THREE.MeshStandardMaterial;
          const newMaterial = originalMaterial.clone();
          
          // Set emissive properties
          if (newMaterial.emissive !== undefined) {
            newMaterial.emissive = projectColor;
            newMaterial.emissiveIntensity = 0.15;
          }
          
          mesh.material = newMaterial;
        }
      }
    });
    
    return scene;
  }, [gltf, project.colors]);

  // Update emissive intensity on hover
  useEffect(() => {
    if (!clonedScene) return;
    
    const intensity = hovered ? 0.3 : 0.15;
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const material = mesh.material as THREE.MeshStandardMaterial;
          if (material.emissiveIntensity !== undefined) {
            material.emissiveIntensity = intensity;
          }
        }
      }
    });
  }, [hovered, clonedScene]);

  // Just handle rotation in useFrame
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (hovered ? 0.4 : 0.15);
    }
  });

  return (
    <group ref={meshRef} scale={hovered ? 1.15 : 1}>
      {clonedScene ? (
        <primitive object={clonedScene} scale={2.45} />
      ) : (
        // Fallback: Beautiful textured sphere
        <mesh>
          <sphereGeometry args={[1.26, 64, 64]} />
          <meshStandardMaterial
            color={project.colors[2] || project.colors[0]}
            roughness={0.7}
            metalness={0.3}
            emissive={project.colors[1] || project.colors[0]}
            emissiveIntensity={hovered ? 0.3 : 0.15}
          />
        </mesh>
      )}
    </group>
  );
}

export default function Planet3D({ project, large = false, onClick }: Props) {
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sizeClass = large ? "w-56 h-56 md:w-64 md:h-64" : project.size;

  return (
    <motion.div
      className={`${sizeClass} relative cursor-pointer flex-shrink-0 overflow-visible`}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      style={{ overflow: 'visible' }}
    >
      {mounted && (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: "transparent", width: "100%", height: "100%" }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />
            <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#4a90e2" />
            <PlanetModel project={project} hovered={hovered} />
          </Suspense>
        </Canvas>
      )}
    </motion.div>
  );
}
