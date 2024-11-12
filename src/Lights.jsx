import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export default function Lights() {
	const light = useRef();

	useFrame((state) => {
		light.current.position.z = state.camera.position.z + 1 + 4;
		light.current.target.position.z = state.camera.position.z + 4;
		light.current.target.updateMatrixWorld();
	});

	return (
		<>
			<directionalLight
				ref={light}
				castShadow
				position={[-4, 4, 1]}
				intensity={4}
				shadow-mapSize={[1024, 1024]}
				shadow-camera-near={1}
				shadow-camera-far={10}
				shadow-camera-top={10}
				shadow-camera-right={10}
				shadow-camera-bottom={-10}
				shadow-camera-left={-10}
			/>
			<ambientLight intensity={4} />
			<spotLight
				position={[0, 40, 0]}
				decay={0}
				distance={45}
				penumbra={1}
				intensity={100}
			/>
			<spotLight
				position={[-20, 0, 10]}
				color='red'
				angle={0.15}
				decay={0}
				penumbra={-1}
				intensity={30}
			/>
		</>
	);
}
