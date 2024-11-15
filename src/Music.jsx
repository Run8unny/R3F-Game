import { RigidBody } from '@react-three/rapier';
import { useGLTF, PositionalAudio } from '@react-three/drei';

export default function Music() {
	const { nodes, materials } = useGLTF('./music.glb');
	return (
		<RigidBody type='fixed' position={[-5, -7, 1]}>
			<group dispose={null}>
				<group
					rotation={[-Math.PI / 2, Math.PI, 0 + 0.4]}
					position={[0, 4, 5]}
					scale={0.55}
				>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.Cylinder007.geometry}
						material={materials['GLOSSY YT.007']}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.Cylinder007_1.geometry}
						material={materials['glossy putih.019']}
					></mesh>
				</group>
			</group>
		</RigidBody>
	);
}

useGLTF.preload('./music.glb');
