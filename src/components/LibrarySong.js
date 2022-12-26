import React, { useEffect, useState } from 'react';

const LibrarySong = ({ song, setCurrentSong }) => {
	const lsa = 'Library-songs-active';
	const ls = 'Library-songs';

	//const [isActive, setIsActive] = useState(false);

	const songSelectHandler = () => {
		setCurrentSong(song);
	};

	return (
		<div onClick={songSelectHandler} className={ls}>
			<img src={song.cover} alt={song.artist} />
			<div className="song-description">
				<h3>{song.name}</h3>
				<h4>{song.artist}</h4>
			</div>
		</div>
	);
};

export default LibrarySong;
