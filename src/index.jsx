import './style.css';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience.jsx';
import { KeyboardControls } from '@react-three/drei';
import Interface from './Interface.jsx';
import { Suspense } from 'react';
import Loader from './Loader.jsx';

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(
	<KeyboardControls
		map={[
			{ name: 'forward', keys: ['ArrowUp', 'KeyW'] },
			{ name: 'backward', keys: ['ArrowDown', 'KeyS'] },
			{ name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
			{ name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
			{ name: 'jump', keys: ['Space'] },
			{ name: 'run', keys: ['Shift'] },
		]}
	>
		<Suspense fallback={<Loader />}>
			<Canvas
				shadows
				camera={{
					fov: 35,
					near: 0.2,
					far: 300,
					position: [0, 2, -6],
				}}
			>
				<Experience />
			</Canvas>
		</Suspense>
		<Interface />
	</KeyboardControls>
);
