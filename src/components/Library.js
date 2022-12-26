import LibrarySong from './LibrarySong';

const Library = ({ songs, setCurrentSong }) => {
	return (
		<div className="Library">
			<h2>Library</h2>
			<div className="library-songs">
				{songs.map((song) => (
					<LibrarySong
						song={song}
						songs={songs}
						setCurrentSong={setCurrentSong}
						id={song.id}
						key={song.id}
						isPlaying={false}
					/>
				))}
			</div>
		</div>
	);
};

export default Library;
