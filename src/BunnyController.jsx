import { useEffect, useRef, useState } from 'react';
import { useRapier, CapsuleCollider, RigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';
// import { useControls } from 'leva';
// import { degToRad, MathUtils } from 'three/src/math/MathUtils.js';
import Bunny from './Bunny';

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

export default function BunnyController() {
	const body = useRef();
	const container = useRef();
	const bunny = useRef();
	const rotationTarget = useRef(0);
	const bunnyRotationTarget = useRef(0);
	const [subscribeKeys, getKeys] = useKeyboardControls();
	const { rapier, world } = useRapier();
	const [animation, setAnimation] = useState('Wave');

	// const { WALK_SPEED, RUN_SPEED, ROTATION_SPEED } = useControls(
	// 	'Character Control',
	// 	{
	// 		WALK_SPEED: { value: 1.2, min: 0.1, max: 4, step: 0.1 },
	// 		RUN_SPEED: { value: 1.8, min: 0.2, max: 12, step: 0.1 },
	// 		ROTATION_SPEED: {
	// 			value: degToRad(0.4),
	// 			min: degToRad(0.1),
	// 			max: degToRad(5),
	// 			step: degToRad(0.1),
	// 		},
	// 	}
	// );

	const jump = () => {
		const origin = body.current.translation();
		origin.y -= 0.2;
		const direction = { x: 0, y: -1, z: 0 };
		const ray = new rapier.Ray(origin, direction);
		const hit = world.castRay(ray, 10, true);
		if (hit.timeOfImpact < 0.6) body.current.applyImpulse({ x: 0, y: 3, z: 0 });
		setAnimation('Jump');
	};

	useEffect(() => {
		const unsubscribeJump = subscribeKeys(
			(state) => state.jump,
			(value) => {
				if (value) jump();
			}
		);
		return () => {
			unsubscribeJump();
		};
	}, []);

	useFrame((state, delta) => {
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

			let speed = run ? 2 : 1.2;

			if (movement.x !== 0 || movement.z !== 0) {
				bunnyRotationTarget.current = Math.atan2(movement.x, movement.z);
				velocity.x = speed * movement.x;
				velocity.z = speed * movement.z;
				if (speed === 2) {
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

		//CAMERA

		const bodyPosition = body.current.translation();
		const cameraPosition = new THREE.Vector3();
		cameraPosition.z += -0.25;
		cameraPosition.y += 5.65;

		const cameraTarget = new THREE.Vector3();
		state.camera.lookAt(cameraTarget);
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
				<Bunny scale={0.5} position={[0, -1, 0]} animation={animation} />
			</group>

			<CapsuleCollider args={[0.3, 0.5]} position={[0, -0.2, 0]} />
		</RigidBody>
	);
}
