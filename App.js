import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

// You can import from local files
import { Focus } from "./src/features/focus/Focus";
import { RoundedButton } from "./src/components/RoundedButton";
import { Timer } from "./src/features/timer/Timer";
import { FocusHistory } from "./src/features/focus/FocusHistory";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function App() {
	const [focusSubject, setFocusSubject] = useState(false);
	const [focusHistory, setFocusHistory] = useState([]);

	const addFocusHistoryWithState = (subject, state) => {
		setFocusHistory([...focusHistory, {key: String(focusHistory.length) ,subject, state }]);
	};

	console.log(focusHistory);

	const saveFocusHistory = () => {
		try {
			AsyncStorage.setItem("fucusHistory", JSON.stringify(focusHistory));
		} catch (error) {
			console.log(error);
		}
	};

	const loadFocusHistory = () => {
		try {
			const history = AsyncStorage.getItem("focusHistory");
			if (history && JSON.parse(history).length) {
				setFocusHistory(history);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		saveFocusHistory();
	}, [focusHistory]);

	useEffect(() => {
		loadFocusHistory();
	});

	return (
		<View style={styles.container}>
			{!focusSubject ? (
				<>
					<Focus setFocusSubject={setFocusSubject} />
					<FocusHistory
						focusHistory={focusHistory}
						setFocusHistory={setFocusHistory}
					/>
				</>
			) : (
				<Timer
					subject={focusSubject}
					onTimerEnd={() => {
						addFocusHistoryWithState(focusSubject, 1);
						setFocusSubject(null);
					}}
					clearSubject={() => {
						addFocusHistoryWithState(focusSubject, 2);
						setFocusSubject(null);
					}}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "orange",
	},
});
