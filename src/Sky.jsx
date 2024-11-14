import * as THREE from 'three';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
	Clouds,
	Cloud,
	CameraControls,
	Sky as SkyImpl,
	StatsGl,
} from '@react-three/drei';
import { useControls } from 'leva';

export default function Sky() {
	const ref = useRef();
	const cloud0 = useRef();

	useFrame((state, delta) => {
		ref.current.rotation.y = Math.cos(state.clock.elapsedTime / 8) / 8;
		ref.current.rotation.x = Math.sin(state.clock.elapsedTime / 8) / 8;
		cloud0.current.rotation.y -= delta / 8;
	});
	return (
		<>
			<SkyImpl />
			<group ref={ref}>
				<Clouds material={THREE.MeshLambertMaterial} limit={100}>
					<Cloud ref={cloud0} bounds={[10, 10, 10]} color={'#fff'} />
					<Cloud
						bounds={[6, 1, 1]}
						color='#e7b6b6'
						seed={3}
						position={[15, 0, 0]}
					/>
					<Cloud
						bounds={[10, 4, 5]}
						color='#8fd98f'
						seed={3}
						position={[15, 0, 10]}
					/>
					<Cloud
						bounds={[10, 2, 10]}
						color='#c8d5f1'
						seed={1}
						position={[0, -6, 10]}
					/>
					<Cloud
						bounds={[21, 12, 59]}
						color='#cf679f'
						seed={4}
						position={[0, 0, 12]}
					/>
					<Cloud
						concentrate='outside'
						growth={50}
						color='#e1b4c3'
						opacity={1.25}
						seed={2}
						bounds={200}
						volume={200}
					/>
				</Clouds>
			</group>
		</>
	);
}
