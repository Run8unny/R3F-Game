import { useAnimations, useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import { useControls } from 'leva';
import { RigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';

export default function Bunny() {
	const bunny = useGLTF('./bunny.glb');
	const animations = useAnimations(bunny.animations, bunny.scene);

	const { animationName } = useControls({
		animationName: { options: animations.names },
	});

	useEffect(() => {
		const action = animations.actions[animationName];
		action.reset().fadeIn(0.5).play();

		return () => {
			action.fadeOut(0.5);
		};
	}, [animationName]);

	useFrame(() => {});

	return (
		<RigidBody
			type='dynamic'
			colliders='trimesh'
			friction={1}
			restitution={0.2}
			canSleep={false}
		>
			<primitive
				castShadow
				flatShading
				object={bunny.scene}
				scale={0.5}
				position={[0, 0, 0]}
			/>
		</RigidBody>
	);
}
