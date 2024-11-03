import { useAnimations, useGLTF } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useEffect } from 'react';
import { useControls } from 'leva';

export default function Bunny() {
	const bunny = useLoader(GLTFLoader, './Bunny.gltf');
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

	return <primitive object={bunny.scene} scale={0.7} position={[0, 0, 0]} />;
}
