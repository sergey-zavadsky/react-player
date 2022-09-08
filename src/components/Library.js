import LibrarySong from './LibrarySong';
import { Rotate as Hamburger } from 'hamburger-react';
import { useState } from 'react';

const Library = ({ songs, setCurrentSong }) => {
	const [isOpen, setOpen] = useState(false);
	return (
		<div className="Library">
			<Hamburger toggled={isOpen} toggle={setOpen} />

			<h2>Library</h2>
			<div className="library-songs">
				{songs.map((song) => (
					<LibrarySong
						song={song}
						songs={songs}
						setCurrentSong={setCurrentSong}
						id={song.id}
						key={song.id}
					/>
				))}
			</div>
		</div>
	);
};

export default Library;
