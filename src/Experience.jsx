import { OrbitControls } from '@react-three/drei';
import Lights from './Lights.jsx';
import { Perf } from 'r3f-perf';
import { Level } from './Level.jsx';
import { Physics } from '@react-three/rapier';
import BodyController from './BodyController.jsx';
import useGame from './stores/useGame.jsx';

export default function Experience() {
	const trapsCount = useGame((state) => state.trapsCount);
	return (
		<>
			<Perf position='top-left' />
			<OrbitControls makeDefault />
			<Lights />
			<Physics debug={false}>
				<Level trapsCount={trapsCount} />
				<BodyController />
			</Physics>
		</>
	);
}
