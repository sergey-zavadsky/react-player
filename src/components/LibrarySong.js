import React from 'react'

const LibrarySong = ({ song, songs, setCurrentSong, id }) => {
	const songSelectHandler = () => {
		setCurrentSong(song)
	}
	return (
		<div onClick={songSelectHandler} className="Library-songs">
			<img src={song.cover} alt={song.artist} />
			<div className="song-description">
				<h3>{song.name}</h3>
				<h4>{song.artist}</h4>
			</div>
		</div>
	)
}

export default LibrarySong
