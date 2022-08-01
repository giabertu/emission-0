/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: AK STUDIO (https://sketchfab.com/inven2000)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/coffee-cup-992750b0df674378989fa915b0688ce1
title: Coffee Cup
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function CoffeeModel(props) {
  const { nodes, materials } = useGLTF("../assets/models/coffee_cup/scene.glb");
  return (
    <group {...props} dispose={null} scale={[9, 9, 9]}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.1}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial.geometry}
            material={materials.DefaultMaterial}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("../assets/models/coffee_cup/scene.glb");
