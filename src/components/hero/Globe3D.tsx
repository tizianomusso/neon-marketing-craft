import { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { Sphere, Points, PointMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';

const GlobePoints = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Generate points on a sphere surface
  const particles = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      
      const x = Math.cos(theta) * Math.sin(phi) * 2;
      const y = Math.sin(theta) * Math.sin(phi) * 2;
      const z = Math.cos(phi) * 2;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001;
    }
  });

  return (
    <Points ref={pointsRef} positions={particles} stride={3}>
      <PointMaterial
        transparent
        color="#a855f7"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};

const GlobeWireframe = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <Sphere ref={meshRef} args={[2, 32, 32]}>
      <meshBasicMaterial
        color="#22d3ee"
        wireframe
        transparent
        opacity={0.1}
      />
    </Sphere>
  );
};

const ConnectionArcs = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  const arcs = useMemo(() => {
    const arcData = [];
    const arcCount = 8;
    
    for (let i = 0; i < arcCount; i++) {
      const startPhi = Math.random() * Math.PI;
      const startTheta = Math.random() * Math.PI * 2;
      const endPhi = Math.random() * Math.PI;
      const endTheta = Math.random() * Math.PI * 2;
      
      const start = new THREE.Vector3(
        Math.sin(startPhi) * Math.cos(startTheta) * 2,
        Math.cos(startPhi) * 2,
        Math.sin(startPhi) * Math.sin(startTheta) * 2
      );
      
      const end = new THREE.Vector3(
        Math.sin(endPhi) * Math.cos(endTheta) * 2,
        Math.cos(endPhi) * 2,
        Math.sin(endPhi) * Math.sin(endTheta) * 2
      );
      
      const mid = new THREE.Vector3(
        (start.x + end.x) / 2 * 1.5,
        (start.y + end.y) / 2 * 1.5,
        (start.z + end.z) / 2 * 1.5
      );
      
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(50);
      
      arcData.push(points);
    }
    return arcData;
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {arcs.map((points, i) => (
        <Line
          key={i}
          points={points}
          color="#a855f7"
          lineWidth={1}
          transparent
          opacity={0.4}
        />
      ))}
    </group>
  );
};

const Pings = () => {
  const pingsRef = useRef<THREE.Points>(null);
  
  const pingPositions = useMemo(() => {
    const count = 15;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const phi = Math.random() * Math.PI;
      const theta = Math.random() * Math.PI * 2;
      
      positions[i * 3] = Math.sin(phi) * Math.cos(theta) * 2.05;
      positions[i * 3 + 1] = Math.cos(phi) * 2.05;
      positions[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * 2.05;
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (pingsRef.current) {
      pingsRef.current.rotation.y += 0.001;
      const material = pingsRef.current.material as THREE.PointsMaterial;
      material.opacity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.5;
    }
  });

  return (
    <Points ref={pingsRef} positions={pingPositions} stride={3}>
      <PointMaterial
        transparent
        color="#22d3ee"
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};

const Globe3D = () => {
  return (
    <div className="w-full h-[500px] md:h-[600px] relative">
      {/* Glow effect behind globe */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-purple-500/20 rounded-full blur-[100px]" />
      </div>
      
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <GlobePoints />
        <GlobeWireframe />
        <ConnectionArcs />
        <Pings />
      </Canvas>
    </div>
  );
};

export default Globe3D;
