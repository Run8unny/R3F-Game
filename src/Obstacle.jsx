import {
	CylinderCollider,
	InstancedRigidBodies,
	RigidBody,
} from '@react-three/rapier';
import { useMemo, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';

export default function Obstacle() {
	const [hitSound] = useState(() => new Audio('./sounds/hit.mp3'));

	const collisionEnter = () => {
		hitSound.currentTime = 0;
		hitSound.volume = Math.random();
		hitSound.play();
	};

	const hamburger = useGLTF('./hamburger.glb');
	const cubesCount = 20;

	const instances = useMemo(() => {
		const instances = [];

		for (let i = 0; i < cubesCount; i++) {
			instances.push({
				key: `instances_ + ${i}`,
				position: [
					(Math.random() - 0.5) * 20,
					6 + i * 0.5,
					(Math.random() - 0.5) * 45,
				],
				rotation: [Math.random(), Math.random(), Math.random()],
			});
		}
		return instances;
	}, []);

	return (
		<>
			<RigidBody colliders='ball' onCollisionEnter={collisionEnter}>
				<mesh castShadow position={[-1.5, 2, 30]}>
					<sphereGeometry />
					<meshStandardMaterial color='#e30858' />
				</mesh>
			</RigidBody>

			<RigidBody
				colliders={false}
				position={[2.5, 0, 0]}
				onCollisionEnter={collisionEnter}
			>
				<CylinderCollider args={[0.2, 0.8]} position={[0, 0.4, 0]} />
				<primitive object={hamburger.scene} scale={0.15} />
			</RigidBody>

			<InstancedRigidBodies instances={instances}>
				<instancedMesh castShadow args={[null, null, cubesCount]}>
					<boxGeometry />
					<meshStandardMaterial color={'#1854d4'} />
				</instancedMesh>
			</InstancedRigidBodies>
		</>
	);
}
