import { Float, Text3D, useGLTF } from '@react-three/drei';
export default function Finish() {
	const balloons = useGLTF('./balloons.glb');
	return (
		<Float
			floatIntensity={0.2}
			floatingRange={(-0.2, 0.2)}
			rotationIntensity={0.3}
		>
			<Text3D
				font='./fonts/Silkscreen_Bold.json'
				position={[6.5, -2, 50]}
				rotation-y={-Math.PI}
				size={2}
				height={0.5}
				curveSegments={15}
				bevelEnabled
				bevelThickness={0.3}
				bevelSize={0.011}
				bevelOffset={0}
				bevelSegments={5}
			>
				Finish
				<meshStandardMaterial color={'#282020'} />
			</Text3D>
			<primitive object={balloons.scene} scale={2} position={[4, -12, 52]} />
		</Float>
	);
}
