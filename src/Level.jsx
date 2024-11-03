import { Instance } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { useRef, useState } from 'react';
import * as THREE from 'three';
//Geometry
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
//Materials
const floorBlockOne = new THREE.MeshStandardMaterial({ color: '#0c0c0c' });
const floorBlockTwo = new THREE.MeshStandardMaterial({ color: '#eee4e4' });
const obsticleMaterialOne = new THREE.MeshStandardMaterial({
	color: '#24c449',
});
const obsticleMaterialTwo = new THREE.MeshStandardMaterial({
	color: '#ed671a',
});

// const obsticleMaterialThree = new THREE.MeshStandardMaterial({
// 	color: '#1416b9',
// });
const wallMaterial = new THREE.MeshStandardMaterial({
	color: '#583555',
});

//Floor
function BlockFloor({ position = [0, 0, 0] }) {
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

function BlockSpinner({ position = [0, 0, 0] }) {
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
						scale={[3.75, 0.2, 0.2]}
						castShadow
						receiveShadow
					/>
				</RigidBody>
			</group>
		</>
	);
}

function BlockWallHorizontal({ position = [0, 0, 0] }) {
	const obsticle = useRef();
	const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

	useFrame((state) => {
		const time = state.clock.elapsedTime;
		const x = -Math.sin(time + timeOffset);
		obsticle.current.setNextKinematicTranslation({
			x: x,
			y: 1,
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
						scale={[1.9, 1.9, 0.2]}
						castShadow
						receiveShadow
					/>
				</RigidBody>
			</group>
		</>
	);
}

function BlockWallVertical({ position = [0, 0, 0] }) {
	const obsticle = useRef();
	const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

	useFrame((state) => {
		const time = state.clock.elapsedTime;
		const y = Math.sin(time + timeOffset);
		obsticle.current.setNextKinematicTranslation({
			x: position[0],
			y: y,
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
						scale={[3.75, 1.9, 0.2]}
						castShadow
						receiveShadow
					/>
				</RigidBody>
			</group>
		</>
	);
}

//Level
export default function Level() {
	return (
		<>
			<BlockFloor position={[0, 0, 0]} />
			<BlockSpinner position={[0, 0, 4]} />
			<BlockWallHorizontal position={[0, 0, 8]} />
			<BlockWallVertical position={[0, 0, 12]} />
			<BlockFloor position={[0, 0, 16]} />
		</>
	);
}
