import { useKeyboardControls } from '@react-three/drei';
export default function Interface() {
	const forward = useKeyboardControls((state) => state.forward);
	const backward = useKeyboardControls((state) => state.backward);
	const leftward = useKeyboardControls((state) => state.leftward);
	const rightward = useKeyboardControls((state) => state.rightward);
	const run = useKeyboardControls((state) => state.run);
	const jump = useKeyboardControls((state) => state.jump);

	return (
		<div className='interface'>
			<div className='time'>0.00</div>
			<div className='restart'>restart</div>
			<div className='controls'>
				<div className='raw'>
					<div className={`key ${forward ? 'active' : ''}`}></div>
				</div>
				<div className='raw'>
					<div className={`key ${leftward ? 'active' : ''}`}></div>
					<div className={`key ${backward ? 'active' : ''}`}></div>
					<div className={`key ${rightward ? 'active' : ''}`}></div>
				</div>
				<div className='raw'>
					<div className={`key large ${jump ? 'active' : ''}`}></div>
					<div className={`key medium ${run ? 'active' : ''}`}>shift</div>
				</div>
				<div className='raw'></div>
			</div>
		</div>
	);
}
