import { OrbitControls } from '@react-three/drei';
import Lights from './Lights.jsx';
import Bunny from './Bunny.jsx';
import { Perf } from 'r3f-perf';
import { Level } from './Level.jsx';
import { Physics } from '@react-three/rapier';
import BunnyController from './BunnyController.jsx';

export default function Experience() {
	return (
		<>
			<Perf position='top-left' />
			<OrbitControls makeDefault />
			<Lights />
			<Physics debug={false}>
				<Level />
				<BunnyController />
			</Physics>
		</>
	);
}
