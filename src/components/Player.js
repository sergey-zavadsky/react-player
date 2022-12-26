import React, { useEffect, useState } from 'react';
// * Importing compoment from fontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//* Importing icons for fontAwesonme component
import {
	faAngleLeft,
	faAngleRight,
	faPlay,
	faPause,
	faVolumeUp,
	faVolumeDown,
	faVolumeXmark,
	faL,
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
	const playSongHandler = (e) => {
		if (!stopSong) {
			audioRef.current.pause();
			setStopSong(true);
		}
		if (stopSong) {
			audioRef.current.play();
			setStopSong(false);
			audioRef.current.volume = volume / 100;
		}
	};

	//* Volume handler

	const [volume, setSongVolume] = useState(0);
	const [previousVolume, setPrevious] = useState(0);

	const volumeHandler = (e) => {
		setSongVolume(() => e.target.value);
		return (audioRef.current.volume = volume / 100);
	};

	const isOnClick = (e) => {
		setPrevious(volume);
		if (volume > 0) {
			setSongVolume(0);
			return (audioRef.current.volume = previousVolume / 100);
		}
		setSongVolume(previousVolume);
		return (audioRef.current.volume = previousVolume / 100);
	};

	useEffect(() => {}, [volume]);

	const isVolume = () => {
		if (volume <= 0) {
			return faVolumeXmark;
		}
		if (volume > 0 && volume < 50) {
			return faVolumeDown;
		}
		if (volume > 49) {
			return faVolumeUp;
		}
		return faVolumeXmark;
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
		let format =
			Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2);

		if (isNaN(time)) {
			format = '00:00';
		}
		return format;
	};
	//* State of songInfo
	const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		durationTime: 0,
	});

	const isPlaying = () => {
		let final;
		if (stopSong) {
			final = faPlay;
		}

		if (!stopSong) {
			final = faPause;
		}
		return final;
	};

	return (
		<div className="player">
			<div className="time-control">
				<p>{getTime(songInfo.currentTime)}</p>
				<input
					min={0}
					max={songInfo?.durationTime || 100}
					value={songInfo.currentTime}
					type="range"
					onChange={dragHandler}
				/>
				<p>
					{!isNaN(songInfo.durationTime)
						? getTime(songInfo.durationTime)
						: '0:00'}
				</p>
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
				<FontAwesomeIcon
					className="volume"
					size="sm"
					icon={isVolume()}
					onClick={isOnClick}
				/>
				<input
					min={0}
					max={100}
					value={volume}
					type="range"
					onChange={(e) => volumeHandler(e)}
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
