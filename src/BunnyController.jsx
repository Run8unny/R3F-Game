import { useEffect, useRef } from 'react';
import { useRapier, CapsuleCollider, RigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import { useControls } from 'leva';
import { degToRad, MathUtils } from 'three/src/math/MathUtils.js';
import Bunny from './Bunny';

export default function BunnyController() {
	const body = useRef();
	const container = useRef();
	const bunny = useRef();
	const cameraTarget = useRef();
	const cameraPosition = useRef();
	const rotationTarget = useRef(0);
	const bunnyRotationTarget = useRef(0);
	const [subscribeKeys, getKeys] = useKeyboardControls();
	const { rapier, world } = useRapier();

	const { WALK_SPEED, RUN_SPEED, ROTATION_SPEED } = useControls(
		'Character Control',
		{
			WALK_SPEED: { value: 0.8, min: 0.1, max: 4, step: 0.1 },
			RUN_SPEED: { value: 1.6, min: 0.2, max: 12, step: 0.1 },
			ROTATION_SPEED: {
				value: degToRad(0.5),
				min: degToRad(0.1),
				max: degToRad(5),
				step: degToRad(0.1),
			},
		}
	);

	const jump = () => {
		const origin = body.current.translation();
		origin.y -= 0.2;
		const direction = { x: 0, y: -1, z: 0 };
		const ray = new rapier.Ray(origin, direction);
		const hit = world.castRay(ray, 10, true);
		if (hit.timeOfImpact < 0.6) body.current.applyImpulse({ x: 0, y: 3, z: 0 });
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
				movement.x = -1;
			}
			if (rightward) {
				movement.x = 1;
			}
			if (movement.x !== 0) {
				rotationTarget.current += ROTATION_SPEED * movement.x;
			}

			let speed = run ? RUN_SPEED : WALK_SPEED;

			if (movement.x !== 0 || movement.z !== 0) {
				bunnyRotationTarget.current = Math.atan2(movement.x, movement.z);
				velocity.x = Math.sin(rotationTarget.current) * speed;
				velocity.z = Math.cos(rotationTarget.current) * speed;
				// velocity.z = speed * movement.z;
			}
			bunny.current.rotation.y = MathUtils.lerp(
				bunny.current.rotation.y,
				bunnyRotationTarget.current,
				0.1
			);
			body.current.setLinvel(velocity, true);
		}
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
			<group ref={container}>
				<group ref={cameraPosition} />
				<group ref={cameraTarget} />
				<group ref={bunny}>
					<Bunny scale={0.5} position={[0, 0, 0]} animation={'Idle'} />
				</group>
			</group>
			<CapsuleCollider args={[0.3, 0.5]} position={[0, 0.7, 0]} />
		</RigidBody>
	);
}
