import { Center, Environment, OrbitControls, Stars } from '@react-three/drei';
import Lights from './Lights.jsx';
import { Perf } from 'r3f-perf';
import { Level } from './Level.jsx';
import { Physics } from '@react-three/rapier';
import BodyController from './BodyController.jsx';
import useGame from './stores/useGame.jsx';
import Sky from './Sky.jsx';
import Finish from './Finish.jsx';
import Obstacle from './Obstacle.jsx';

export default function Experience() {
	const trapsCount = useGame((state) => state.trapsCount);
	const trapsMix = useGame((state) => state.trapsMix);
	return (
		<>
			<Perf position='top-left' />
			<Center>
				<Sky />
				<OrbitControls makeDefault />
				<Lights />
				<Physics debug={false} gravity={[0, -9.81, 0]}>
					<Level trapsCount={trapsCount} level={trapsMix} />
					<BodyController />
					<Obstacle />
				</Physics>
				<Finish />
			</Center>
		</>
	);
}
