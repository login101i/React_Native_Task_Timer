import React, { useState, useEffect } from "react";
import { View, StyleSheet, Vibration, Text, Platform } from "react-native";
import { ProgressBar } from "react-native-paper";
import { useKeepAwake } from "expo-keep-awake";

import { RoundedButton } from "../../components/RoundedButton";
import { CountDown } from "../../components/CountDown";
import { Timing } from "../../features/timer/Timing";

export const Timer = ({ subject, onTimerEnd, clearSubject }) => {
	useKeepAwake();

	const [minutes, setMinutes] = useState(0.1);
	const [isStarted, setStarted] = useState(true);

	const [progress, setProgress] = useState(1);

	const onProgress = (p) => {
		setProgress(p / 100);
	};

	const vibrate = () => {
		const interval = setInterval(() => Vibration.vibrate(5000), 1000);
		setTimeout(() => {
			clearInterval(interval);
		}, 10000);
	};

	const returnHomePage = () => {
		console.log("end");
		setProgress(1);
		setStarted(false);
		setMinutes(20);
		vibrate();
		onTimerEnd();
	};

	const onChangeTime = (minutes) => {
		setMinutes(minutes);
		console.log(minutes);
		setStarted(false);
		setProgress(1);
	};

	return (
		<View style={styles.container}>
			<View style={styles.countdown}>
				<View>
					<CountDown
						isPaused={!isStarted}
						onProgress={onProgress}
						minutes={minutes}
						onEnd={returnHomePage}
					/>
				</View>
				<View style={{ padding: 50 }}>
					<Text style={styles.title}>Focusing on:</Text>
					<Text style={styles.subject}>{subject}</Text>
				</View>
			</View>
			<ProgressBar
				progress={progress}
				color="white"
				style={{ height: 11, margin: 10, borderRadius:5 }}
			/>

			<View style={styles.buttonWrapper}>
				<Timing changeTime={onChangeTime} />
			</View>

			<View style={styles.buttonWrapper}>
				{!isStarted ? (
					<RoundedButton title="start" onPress={() => setStarted(true)} />
				) : (
					<RoundedButton title="pause" onPress={() => setStarted(false)} />
				)}
			</View>
			<View style={styles.clearSubject}>
				<RoundedButton
					title="Cancel"
					size={50}
					textStyle={{ fontSize: 12 }}
					onPress={() => clearSubject()}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: !Platform.OS === "ios" ? "darkBlue" : "purple",
	},
	countdown: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	title: { color: "white", textAlign: "center", fontSize:20 },
	subject: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 30,
    marginTop:10,
	},
	buttonWrapper: {
		flex: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 10,
	},
	clearSubject: {
		paddingBottom: 25,
		paddingLeft: 25,
	},
});
