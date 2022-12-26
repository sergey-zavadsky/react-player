import './styles/app.scss';
import { useEffect, useState, useRef } from 'react';
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import data from './util';

function App() {
	// * States
	const [songs, setSongs] = useState(data());
	const [currentSong, setCurrentSong] = useState(songs[0]);
	const [stopSong, setStopSong] = useState(true);

	//* Ref
	const audioRef = useRef(null);

	return (
		<div className="App">
			<Song currentSong={currentSong} />
			<Player
				setStopSong={setStopSong}
				stopSong={stopSong}
				currentSong={currentSong}
				songs={songs}
				setCurrentSong={setCurrentSong}
				audioRef={audioRef}
			/>
			<Library songs={songs} setCurrentSong={setCurrentSong} />
		</div>
	);
}

export default App;
