import { Float, useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
export default function Creature() {
	const creature = useGLTF('./cup.glb');
	creature.scene.children.forEach((mesh) => {
		mesh.castShadow = true;
	});
	return (
		<>
			<RigidBody type='fixed'>
				<Float floatIntensity={3} floatingRange={(1, 2)} rotationIntensity={2}>
					<primitive
						object={creature.scene}
						scale={2.2}
						rotation-y={Math.PI}
						position-y={2.4}
					/>
				</Float>
			</RigidBody>
		</>
	);
}
