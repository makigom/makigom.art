"use client";

import * as THREE from "three";
import { useMemo, useRef } from "react";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { extend, Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { easing } from "maath";
import { CherryBlossom } from "./CherryBlossom";
import { randomIntFromInterval } from "@/utils";
import { OrbitControls } from "@react-three/drei";

extend({ MeshLineGeometry, MeshLineMaterial });

const Rig = ({ radius = 10 }: { radius?: number }) => {
  useFrame((state, delta) => {
    state.camera.lookAt(
      Math.sin(state.pointer.x) * radius,
      Math.atan(state.pointer.y) * radius,
      -40
    );
  });

  return <></>;
};

export const Hero = () => {
  return (
    <Canvas
      shadows
      camera={{
        position: [5, 10, 100],
        fov: 15,
      }}
    >
      {/* <axesHelper args={[5]} /> */}
      <ambientLight intensity={2} />
      <Flowers count={randomIntFromInterval(200, 250)} />
      <Rig />
      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={1} radius={0.6} />
      </EffectComposer>
    </Canvas>
  );
};

function Flowers({ count }: { count: number }) {
  const flowers = useMemo(() => {
    return Array.from({ length: count }, () => {
      const x = randomIntFromInterval(-25, 25);
      const y = Math.random() * 50;

      const rotX = Math.random() * 100;
      const rotY = Math.random() * 100;
      const rotZ = Math.random() * 100;

      const scale = randomIntFromInterval(0.1, 1.5);

      return { position: [x, y, 0], rotation: [rotX, rotY, rotZ], scale };
    });
  }, []);

  return flowers.map((props, index) => (
    <CherryBlossom key={index} {...props} />
  ));
}
