import { Center, Environment, OrbitControls, Stars } from '@react-three/drei';
import Lights from './Lights.jsx';
import { Perf } from 'r3f-perf';
import { Level } from './Level.jsx';
import { Physics } from '@react-three/rapier';
import BodyController from './BodyController.jsx';
import useGame from './stores/useGame.jsx';
import Sky from './Sky.jsx';

export default function Experience() {
	const trapsCount = useGame((state) => state.trapsCount);
	const trapsMix = useGame((state) => state.trapsMix);
	return (
		<>
			<Perf position='top-left' />
			<Center>
				<Sky />
				<ambientLight intensity={Math.PI / 1.5} />
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
				<spotLight
					position={[20, -10, 10]}
					color='red'
					angle={0.2}
					decay={0}
					penumbra={-1}
					intensity={20}
				/>
				<OrbitControls makeDefault />
				<Lights />
				<Physics debug={false}>
					<Level trapsCount={trapsCount} level={trapsMix} />
					<BodyController />
				</Physics>
			</Center>
		</>
	);
}
