"use client";

import * as THREE from "three";
import { useMemo, useRef } from "react";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { extend, Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { easing } from "maath";
import { useControls, Leva } from "leva";
import { CherryBlossom } from "./CherryBlossom";

extend({ MeshLineGeometry, MeshLineMaterial });

const Rig = ({ radius = 10 }: { radius?: number }) => {
  useFrame((state, delta) => {
    const y = state.camera.position.y + delta;
    easing.damp3(
      state.camera.position,
      [
        Math.sin(state.pointer.x) * radius,
        Math.atan(state.pointer.y) * radius,
        Math.cos(state.pointer.x) * radius,
      ],
      0.25,
      delta
    );
    state.camera.lookAt(100, 50, 100);
  });

  return <></>;
};

export const Hero = () => {
  const { count } = useControls({
    count: { value: 250, min: 200, max: 400, step: 0.1 },
  });

  return (
    <Canvas shadows camera={{ position: [100, 50, 100], fov: 65 }}>
      <axesHelper args={[5]} />
      <ambientLight intensity={2} />
      <Leva hidden />
      <Flowers count={count} />
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
      const x = Math.random() * 50;
      const y = Math.random() * 50;
      const z = Math.random() * 50;

      const rotX = Math.random() * 100;
      const rotY = Math.random() * 100;
      const rotZ = Math.random() * 100;

      const scale = Math.random() * 2;

      return { position: [x, y, z], rotation: [rotX, rotY, rotZ], scale };
    });
  }, []);

  return flowers.map((props, index) => (
    <CherryBlossom key={index} {...props} />
  ));
}
