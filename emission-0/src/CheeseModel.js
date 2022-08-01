/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: texturecan (https://sketchfab.com/dragonclaws)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/cheddar-cheese-448d96d564be46dba7eaefc38232fa62
title: Cheddar Cheese
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function CheeseModel(props) {
  const { nodes, materials } = useGLTF(
    "../assets/models/cheddar_cheese/scene.glb"
  );
  return (
    <group
      {...props}
      scale={[15, 15, 15]}
      dispose={null}
      rotation={[0, 1.3, 0]}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cheese_Cheese_0001_0.geometry}
              material={materials.Cheese_0001}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("../assets/models/cheddar_cheese/scene.glb");
