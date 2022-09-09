import React, { useState } from 'react';
// * Importing compoment from fontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//* Importing icons for fontAwesonme component
import {
	faAngleLeft,
	faAngleRight,
	faPlay,
	faPause,
} from '@fortawesome/free-solid-svg-icons';

const Player = ({
	currentSong,
	stopSong,
	setStopSong,
	setCurrentSong,
	songs,
	audioRef,
}) => {
	//* Music handler
	const playSongHandler = () => {
		if (!stopSong) {
			audioRef.current.pause();
			setStopSong(true);
		}
		if (stopSong) {
			audioRef.current.play();
			setStopSong(false);
		}
	};

	const playNext = () => {
		songs.forEach((song, index) => {
			if (song.name === currentSong.name && songs.length > index) {
				index++;
				setCurrentSong(songs[index]);
			}
			if (index === songs.length) {
				setCurrentSong(songs[0]);
			}
		});
		return audioRef.current.play();
	};

	const playPrev = () => {
		songs.forEach((song, index) => {
			if (song.name === currentSong.name && index > 0) {
				index--;
				setCurrentSong(songs[index]);
			}
			if (index === 0) {
				setCurrentSong(songs[songs.length - 1]);
			}
		});
		return audioRef.current.play();
	};

	//* Time Handler
	const timeUpdateHandler = (e) => {
		const current = e.target.currentTime;
		const duration = e.target.duration;
		setSongInfo({
			...songInfo,
			currentTime: current,
			durationTime: duration,
		});
	};

	//* Drag Handler

	const dragHandler = (e) => {
		audioRef.current.currentTime = e.target.value;
		setSongInfo({ ...songInfo, currentTime: e.target.value });
	};

	const getTime = (time) => {
		return (
			Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
		);
	};
	//* State of songInfo
	const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		durationTime: 0,
	});

	const isPlaying = () => {
		if (
			(songInfo.durationTime > 0 &&
				songInfo.durationTime === songInfo.currentTime) ||
			stopSong
		) {
			return faPlay;
		}

		if (!stopSong) {
			return faPause;
		}
	};

	return (
		<div className="player">
			<div className="time-control">
				<p>{getTime(songInfo.currentTime)}</p>
				<input
					min={0}
					max={songInfo.durationTime}
					value={songInfo.currentTime}
					type="range"
					onChange={dragHandler}
				/>
				<p>{getTime(songInfo.durationTime)}</p>
			</div>
			<div className="play-control">
				<FontAwesomeIcon
					className="skip-back"
					size="2x"
					icon={faAngleLeft}
					onClick={playPrev}
				/>
				<FontAwesomeIcon
					className="play"
					size="2x"
					icon={isPlaying()}
					onClick={playSongHandler}
				/>
				<FontAwesomeIcon
					className="skip-forward"
					size="2x"
					icon={faAngleRight}
					onClick={playNext}
				/>
			</div>
			<audio
				onTimeUpdate={timeUpdateHandler}
				ref={audioRef}
				src={currentSong.audio}
				onLoadedMetadata={timeUpdateHandler}
			></audio>
		</div>
	);
};

export default Player;
