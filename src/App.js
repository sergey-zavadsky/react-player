// * Adding Components
import './styles/app.scss';
import { useState } from 'react';
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
// * Import utils
import data from './util';

function App() {
	// * State
	const [songs, setSongs] = useState(data());
	const [currentSong, setCurrentSong] = useState(songs[0]);
	const [stopSong, setStopSong] = useState(false);

	return (
		<div className="App">
			<Song currentSong={currentSong} />
			<Player
				setStopSong={setStopSong}
				stopSong={stopSong}
				currentSong={currentSong}
				songs={songs}
				setCurrentSong={setCurrentSong}
			/>
			<Library songs={songs} setCurrentSong={setCurrentSong} />
		</div>
	);
}

export default App;
