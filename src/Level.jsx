import { Instance } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

//Geometry
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
//Materials
const floorBlockOne = new THREE.MeshStandardMaterial({ color: '#0c0c0c' });
const floorBlockTwo = new THREE.MeshStandardMaterial({ color: '#eee4e4' });
const obsticleMaterialOne = new THREE.MeshStandardMaterial({
	color: '#24c449',
});
const podiumMaterial = new THREE.MeshStandardMaterial({
	color: '#ed671a',
});

// const obsticleMaterialThree = new THREE.MeshStandardMaterial({
// 	color: '#1416b9',
// });
const wallMaterial = new THREE.MeshStandardMaterial({
	color: '#e194dc',
});

//Floor
export function BlockFloor({ position = [0, 0, 0] }) {
	return (
		<>
			<group position={position}>
				<mesh
					geometry={boxGeometry}
					material={floorBlockOne}
					position={[0, -0.1, 0]}
					scale={[4, 0.2, 4]}
					castShadow
					receiveShadow
				></mesh>
			</group>
		</>
	);
}

export function BlockBarVertical({ position = [0, 0, 0] }) {
	const obsticle = useRef();
	const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

	useFrame((state) => {
		const time = state.clock.elapsedTime;
		const y = Math.sin(time + timeOffset) + 1.15;
		obsticle.current.setNextKinematicTranslation({
			x: position[0],
			y: position[1] + y,
			z: position[2],
		});
	});

	return (
		<>
			<group position={position}>
				<mesh
					geometry={boxGeometry}
					receiveShadow
					position={[0, -0.1, 0]}
					scale={[4, 0.2, 4]}
					material={floorBlockTwo}
				></mesh>
				<RigidBody
					ref={obsticle}
					type='kinematicPosition'
					position={[0, 0.3, 0]}
					restitution={0.2}
					friction={0.1}
				>
					<mesh
						geometry={boxGeometry}
						material={obsticleMaterialOne}
						scale={[3.5, 0.2, 0.2]}
						castShadow
						receiveShadow
					/>
				</RigidBody>
			</group>
		</>
	);
}

export function BlockSpinner({ position = [0, 0, 0] }) {
	const obsticle = useRef();
	const [speed] = useState(
		() => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1)
	);

	useFrame((state) => {
		const time = state.clock.elapsedTime;
		const rotation = new THREE.Quaternion();
		rotation.setFromEuler(new THREE.Euler(0, time * speed, 0));
		obsticle.current.setNextKinematicRotation(rotation);
	});

	return (
		<>
			<group position={position}>
				<mesh
					geometry={boxGeometry}
					receiveShadow
					position={[0, -0.1, 0]}
					scale={[4, 0.2, 4]}
					material={floorBlockTwo}
				></mesh>
				<RigidBody
					ref={obsticle}
					type='kinematicPosition'
					position={[0, 0.3, 0]}
					restitution={0.2}
					friction={0.1}
				>
					<mesh
						geometry={boxGeometry}
						material={obsticleMaterialOne}
						scale={[3.5, 0.2, 0.2]}
						castShadow
						receiveShadow
					/>
				</RigidBody>
			</group>
		</>
	);
}

export function BlockWallHorizontal({ position = [0, 0, 0] }) {
	const obsticle = useRef();
	const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

	useFrame((state) => {
		const time = state.clock.elapsedTime;
		const x = -Math.sin(time + timeOffset) * 0.9;
		obsticle.current.setNextKinematicTranslation({
			x: position[0] + x,
			y: position[1] + 1,
			z: position[2],
		});
	});

	return (
		<>
			<group position={position}>
				<mesh
					geometry={boxGeometry}
					receiveShadow
					position={[0, -0.1, 0]}
					scale={[4, 0.2, 4]}
					material={floorBlockOne}
				></mesh>
				<RigidBody
					ref={obsticle}
					type='kinematicPosition'
					position={[0, 0.3, 0]}
					restitution={0.2}
					friction={0.1}
				>
					<mesh
						geometry={boxGeometry}
						material={obsticleMaterialOne}
						scale={[1.7, 1.7, 0.2]}
						castShadow
						receiveShadow
					/>
				</RigidBody>
			</group>
		</>
	);
}

export function BlockWallVertical({ position = [0, 0, 0] }) {
	const obsticle = useRef();
	const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

	useFrame((state) => {
		const time = state.clock.elapsedTime;
		const y = Math.sin(time + timeOffset);
		obsticle.current.setNextKinematicTranslation({
			x: position[0],
			y: position[1] + y,
			z: position[2],
		});
	});

	return (
		<>
			<group position={position}>
				<mesh
					geometry={boxGeometry}
					receiveShadow
					position={[0, -0.1, 0]}
					scale={[4, 0.2, 4]}
					material={floorBlockOne}
				></mesh>
				<RigidBody
					ref={obsticle}
					type='kinematicPosition'
					position={[0, 0.3, 0]}
					restitution={0.2}
					friction={0.1}
				>
					<mesh
						geometry={boxGeometry}
						material={obsticleMaterialOne}
						scale={[3.5, 1.7, 0.2]}
						castShadow
						receiveShadow
					/>
				</RigidBody>
			</group>
		</>
	);
}

export function BlockFloorEnd({ position = [0, 0, 0] }) {
	return (
		<>
			<group position={position}>
				<RigidBody type='fixed' friction={0} restitution={0.2}>
					<mesh
						geometry={boxGeometry}
						material={floorBlockTwo}
						position={[0, 0.1, 0]}
						scale={[4, 0.2, 4]}
						castShadow
						receiveShadow
					></mesh>
				</RigidBody>
			</group>
		</>
	);
}

export function BlockFloorPodium({ position = [0, 0, 0] }) {
	const creature = useGLTF('./cup.glb');
	creature.scene.children.forEach((mesh) => {
		mesh.castShadow = true;
	});

	return (
		<>
			<group position={position}>
				<mesh
					geometry={boxGeometry}
					material={podiumMaterial}
					position={[0, 0.3, 0]}
					scale={[4, 0.4, 4]}
					receiveShadow
				></mesh>
				<RigidBody type='fixed' castShadow>
					<primitive
						object={creature.scene}
						scale={1.4}
						rotation-y={Math.PI}
						position-y={1.67}
					/>
				</RigidBody>
			</group>
		</>
	);
}

function Walls({ length = 1 }) {
	return (
		<>
			<group rotation-x={-0.005}>
				<RigidBody type='fixed'>
					<mesh
						geometry={boxGeometry}
						material={wallMaterial}
						position={[2.1, 0.9, length * 2 - 2]}
						scale={[0.2, 2.1, 4 * length - 0.1]}
						rotation-z={-0.2}
						castShadow
					></mesh>
					<mesh
						geometry={boxGeometry}
						material={wallMaterial}
						position={[-2.1, 0.9, length * 2 - 2]}
						scale={[0.2, 2.1, 4 * length - 0.1]}
						rotation-z={0.2}
						receiveShadow
					></mesh>
					<mesh
						geometry={boxGeometry}
						material={wallMaterial}
						position={[0, 0.9, length * 4 - 2.1]}
						scale={[4.6, 2.07, 0.2]}
						receiveShadow
					></mesh>
				</RigidBody>
			</group>
		</>
	);
}

//Level
export function Level({
	trapsCount = 4,
	types = [
		BlockBarVertical,
		BlockWallHorizontal,
		BlockSpinner,
		BlockWallVertical,
	],
}) {
	const blocksTrapsArray = useMemo(() => {
		const blocksTrapsArray = [];
		for (let i = 0; i < trapsCount; i++) {
			const type = types[Math.floor(Math.random() * types.length)];
			blocksTrapsArray.push(type);
		}
		return blocksTrapsArray;
	}, [trapsCount, types]);

	console.log(blocksTrapsArray);

	return (
		<>
			<BlockFloor position={[0, 0, 0]} />
			{blocksTrapsArray.map((Block, index) => (
				<Block key={index} position={[0, 0, (index + 1) * 4]} />
			))}
			<BlockFloorEnd position={[0, 0, (trapsCount + 1) * 4]} />
			<BlockFloorPodium position={[0, 0, (trapsCount + 2) * 4]} />
			<Walls length={trapsCount + 3} />
		</>
	);
}
