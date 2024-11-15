import { RigidBody } from '@react-three/rapier';
import { useGLTF, PositionalAudio } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import useGame from './stores/useGame';

export default function Music() {
	const { nodes, materials } = useGLTF('./music.glb');
	const phase = useGame((state) => state.phase);
	const [isPlaying, setIsPlaying] = useState(false);
	const audioRef = useRef();

	useEffect(() => {
		if (audioRef.current) {
			if (phase === 'ended' || phase === 'ready') {
				audioRef.current.pause();
				audioRef.current.currentTime = 0;
				setIsPlaying(false);
			}
		}
	}, [phase]);

	const toggleMusic = () => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.pause();
			} else {
				audioRef.current.play();
			}
			setIsPlaying(!isPlaying);
		}
	};

	return (
		<RigidBody type='fixed' position={[-5, -6.8, 5]}>
			<group onClick={toggleMusic} dispose={null}>
				<group
					rotation={[-Math.PI / 2, Math.PI, 0 + 0.5]}
					position={[0, 4, 5]}
					scale={0.5}
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
					>
						<PositionalAudio
							ref={audioRef}
							url='./sounds/anime.mp3'
							distance={10}
							loop={false}
							autoPlay={false}
							volume={0.7}
						/>
					</mesh>
				</group>
			</group>
		</RigidBody>
	);
}

useGLTF.preload('./music.glb');
