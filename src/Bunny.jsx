import { useAnimations, useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';

export default function Bunny({ animation, ...props }) {
	const group = useRef();

	const bunny = useGLTF('./bunny.glb');
	bunny.scene.children.forEach((mesh) => {
		mesh.castShadow = true;
	});

	const { actions } = useAnimations(bunny.animations, bunny.scene);

	useEffect(() => {
		actions[animation]?.reset().fadeIn(0.5).play();

		return () => {
			actions?.[animation]?.fadeOut(0.5);
		};
	}, [animation]);

	return (
		<group ref={group} {...props} dispose={null}>
			<primitive castShadow flatShading object={bunny.scene} />
		</group>
	);
}
