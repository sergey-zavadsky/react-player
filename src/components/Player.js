import React, { useEffect, useRef, useState } from 'react';
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
}) => {
	const [prevSong, setPrevSong] = useState(songs[songs.length - 1]);
	const [nextSong, setNextSong] = useState(songs[1]);

	//* Ref
	const audioRef = useRef(null);
	//* Music handlr
	const playSongHandler = () => {
		if (stopSong) {
			audioRef.current.pause();
			setStopSong(!stopSong);
		} else {
			audioRef.current.play();
			setStopSong(!stopSong);
		}
	};

	useEffect(() => {}, [currentSong, nextSong, prevSong]);

	const playNext = () => {
		songs.forEach((song, index) => {
			if (song.name === currentSong.name) {
				if (songs.length > index) {
					setNextSong(songs[index++]);
					setCurrentSong(songs[index]);
					setPrevSong(songs[index]);
				}
			}
			if (index === songs.length) {
				setCurrentSong(songs[0]);
			}
		});
		return audioRef.current.play();
	};

	const playPrev = () => {
		songs.forEach((song, index) => {
			if (song.name === currentSong.name) {
				if (index > 0) {
					setNextSong(songs[index--]);
					setCurrentSong(songs[index]);
					setPrevSong(songs[0]);
				}
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
		if (!stopSong) {
			return faPlay;
		}
		return faPause;
	};
	return (
		<div className="player">
			<div className="time-control">
				<p>{getTime(songInfo.currentTime)}</p>
				<input
					min={0}
					max={songInfo.duration}
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
