import { Float, Text3D } from '@react-three/drei';
export default function Finish() {
	return (
		<Float
			floatIntensity={0.2}
			floatingRange={(-0.2, 0.2)}
			rotationIntensity={0.3}
		>
			<Text3D
				font='./fonts/Silkscreen_Bold.json'
				position={[6.5, -2, 49]}
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
				<meshLambertMaterial color={'#282020'} />
			</Text3D>
		</Float>
	);
}
