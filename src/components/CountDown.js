import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet } from "react-native";

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const CountDown = ({
	minutes = 10,
	isPaused = false,
	onProgress,
	onEnd,
}) => {
	const [millis, setMillis] = useState(minutesToMillis(minutes));

	const minute = Math.floor(millis / 1000 / 60) % 60;
	const seconds = Math.floor(millis / 1000) % 60;
	const interval = useRef(null);

	const countDown = () => {
		setMillis((time) => {
			if (time === 0) {
				clearInterval(interval.current);
					onEnd();
				return time;
			}
			const timeLeft = time - 1000;
			return timeLeft;
		});
	};

	useEffect(() => {
		setMillis(minutesToMillis(minutes));
	}, [minutes]);

	useEffect(() => {
		if (isPaused) return;

		interval.current = setInterval(countDown, 1000);
		return () => clearInterval(interval.current);
	}, [isPaused, minutes]);

	useEffect(() => {
		
		onProgress((millis / minutesToMillis(minutes)) * 100);
	}, [millis]);

	return (
		<View style={styles.container}>
			<Text style={styles.text}>
				{formatTime(minute)} : {formatTime(seconds)}{" "}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		background: "blue",
	},

	text: {
		fontSize: 60,
		fontWeight: "bold",
		color: "#fff",
		padding: 10,
	},
});
