import { Float, useGLTF } from '@react-three/drei';
export default function Finish() {
	const balloons = useGLTF('./balloons.glb');
	const portal = useGLTF('./portal.glb');
	return (
		<>
			<Float
				floatIntensity={0.5}
				floatingRange={(-0.2, 0.2)}
				rotationIntensity={0.3}
			>
				<primitive
					object={balloons.scene}
					scale={2.3}
					position={[-6, -14, 40]}
				/>
			</Float>
			<primitive object={portal.scene} scale={5} position={[0, -7, 58]} />
		</>
	);
}
