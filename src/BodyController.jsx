import { useEffect, useRef, useState } from 'react';
import { useRapier, CapsuleCollider, RigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';
import Player from './Player';
import useGame from './stores/useGame';

const normalizeAngle = (angle) => {
	while (angle > Math.PI) angle -= 2 * Math.PI;
	while (angle < -Math.PI) angle += 2 * Math.PI;
	return angle;
};

const lerpAngle = (start, end, t) => {
	start = normalizeAngle(start);
	end = normalizeAngle(end);

	if (Math.abs(end - start) > Math.PI) {
		if (end > start) {
			start += 2 * Math.PI;
		} else {
			end += 2 * Math.PI;
		}
	}

	return normalizeAngle(start + (end - start) * t);
};

export default function BodyController() {
	const body = useRef();
	const bunny = useRef();
	const rotationTarget = useRef(0);
	const bunnyRotationTarget = useRef(0);
	const [subscribeKeys, getKeys] = useKeyboardControls();
	const { rapier, world } = useRapier();
	const [animation, setAnimation] = useState('Wave');
	const [smoothedCameraPosition] = useState(
		() => new THREE.Vector3(-15, 15, -15)
	);
	const [smoothedCameraTarget] = useState(() => new THREE.Vector3());
	const start = useGame((state) => state.start);
	const restart = useGame((state) => state.restart);
	const end = useGame((state) => state.end);
	const trapsCount = useGame((state) => state.trapsCount);
	const cameraPosition = new THREE.Vector3();
	const cameraTarget = new THREE.Vector3();
	const playAudio = useGame((state) => state.playAudio);

	const jump = () => {
		if (!body.current) return;
		const origin = body.current.translation();
		origin.y -= 0.5;
		const direction = { x: 0, y: -1, z: 0 };
		const ray = new rapier.Ray(origin, direction);
		const hit = world.castRay(ray, 5, true);
		if (hit.timeOfImpact < 0.15)
			body.current.applyImpulse({ x: 0, y: 2.5, z: 0 });
		setAnimation('Jump');
		playAudio('./sounds/jump.mp3');
		if (origin.y > 3) body.current.applyImpulse({ x: 0, y: -15, z: 0 });
	};

	const reset = () => {
		playAudio('./sounds/byebye.mp3');
		body.current.setTranslation({ x: 0, y: 1, z: 0 });
		body.current.setLinvel({ x: 0, y: 0, z: 0 });
		body.current.setAngvel({ x: 0, y: 0, z: 0 });
	};

	useEffect(() => {
		const unsubscribeReset = useGame.subscribe(
			(state) => state.phase,
			(phase) => {
				if (phase === 'ready') reset();
				if (phase === 'playing') {
					playAudio('./sounds/gamba.mp3');
				}
				if (phase === 'ended') playAudio('./sounds/winning.mp3');
			}
		);

		const unsubscribeJump = subscribeKeys(
			(state) => state.jump,
			(value) => {
				if (value) jump();
			}
		);

		const unsubscribeAny = subscribeKeys(() => {
			start();
		});

		return () => {
			unsubscribeJump();
			unsubscribeAny();
			unsubscribeReset();
		};
	}, []);

	useFrame((state, delta) => {
		if (!body.current) return;
		//CONTROLS
		if (body.current) {
			const velocity = body.current.linvel();
			const { forward, backward, leftward, rightward, run } = getKeys();
			const movement = { x: 0, y: 0, z: 0 };

			if (forward) {
				movement.z = 1;
			}
			if (backward) {
				movement.z = -1;
			}
			if (leftward) {
				movement.x = 1;
			}
			if (rightward) {
				movement.x = -1;
			}
			if (movement.x !== 0) {
				rotationTarget.current += 0.3 * movement.x;
			}

			let speed = run ? 2.2 : 1.2;

			if (movement.x !== 0 || movement.z !== 0) {
				bunnyRotationTarget.current = Math.atan2(movement.x, movement.z);
				velocity.x = speed * movement.x;
				velocity.z = speed * movement.z;
				if (speed === 2.2) {
					setAnimation('Run');
				} else {
					setAnimation('Walk');
				}
			} else {
				setAnimation('Wave');
				velocity.x = 0;
				velocity.z = 0;
			}
			bunny.current.rotation.y = lerpAngle(
				bunny.current.rotation.y,
				bunnyRotationTarget.current,
				0.1
			);
			body.current.setLinvel(velocity, true);
		}

		//Camera
		const bodyPosition = body.current.translation();

		cameraPosition.copy(bodyPosition);
		cameraPosition.z -= 6;
		cameraPosition.y += 1.5;

		cameraTarget.copy(bodyPosition);
		cameraTarget.y += 0.5;

		smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
		smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

		state.camera.position.copy(smoothedCameraPosition);
		state.camera.lookAt(smoothedCameraTarget);

		//Phases
		if (bodyPosition.z > trapsCount * 4 + 3) end();
		if (bodyPosition.y < -30) restart();
	});

	return (
		<RigidBody
			ref={body}
			colliders={false}
			lockRotations
			friction={1}
			restitution={0.2}
			canSleep={false}
		>
			<group ref={bunny}>
				<Player scale={0.5} position={[0, -1, 0]} animation={animation} />
			</group>

			<CapsuleCollider args={[0.3, 0.5]} position={[0, -0.2, 0]} />
		</RigidBody>
	);
}
