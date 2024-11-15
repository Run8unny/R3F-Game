import React, { useRef } from 'react';
import { useGLTF, shaderMaterial } from '@react-three/drei';
import { useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';
import portalVertexShader from './shaders/portal/vertex.glsl';
import portalFragmentShader from './shaders/portal/fragment.glsl';

const PortalMaterial = shaderMaterial(
	{
		uTime: 0,
		uColorStart: new THREE.Color('#badef3'),
		uColorEnd: new THREE.Color('#ffffff'),
	},

	portalVertexShader,
	portalFragmentShader
);

extend({ PortalMaterial });

export default function Portal() {
	const { nodes, materials } = useGLTF('./portal.glb');

	const portalMaterial = useRef();

	useFrame((state, delta) => {
		portalMaterial.current.uTime += delta * 0.5;
	});

	return (
		<group scale={5} position={[0, -7, 58]} dispose={null}>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Cube012.geometry}
				material={materials.Rock}
				position={[0.045, 1.089, -1.907]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.portalLight.geometry}
				position={[0.043, 1.101, -1.896]}
				rotation-y={Math.PI}
			>
				<portalMaterial ref={portalMaterial} />
			</mesh>
		</group>
	);
}

useGLTF.preload('./portal.glb');
