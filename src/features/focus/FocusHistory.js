import React, { useState } from "react";
import { View, StyleSheet, Text, FlatList, SafeAreaView } from "react-native";

import { RoundedButton } from "../../components/RoundedButton";

export const FocusHistory = ({ focusHistory, setFocusHistory }) => {
	const clearHistory = () => {
		setFocusHistory([]);
	};



	return (
		<>
			<SafeAreaView
				style={{ flex: 0.5, alignItems: "center", backgroundColor: "orange" }}
			>
				<Text style={{ fontSize: 22, color: "white" }}>
					Things we've focused on
				</Text>
				{!!focusHistory.length && (
					<>
						<FlatList
							style={{ width: "100%", flex:1, paddingTop: 16 }}
							contentContainerStyle={{ alignItems: "center" }}
							data={focusHistory}
							renderItem={({ item, index }) => (
								<Text style={styles(item.status).historyItem}>
								{String(index +1) + ` : ` + item.subject}
								</Text>
							)}
						/>

						<View style={styles().clearContainer}>
							<RoundedButton
								size={75}
								title="Clear"
								onPress={() => clearHistory()}
							/>
						</View>
					</>
				)}
				{!focusHistory.length && (
					<Text style={{ color: "white" }}>Nothing yet</Text>
				)}
			</SafeAreaView>
		</>
	);
};

const styles = (status) =>
	StyleSheet.create({
		historyItem: {
			color: status > 1 ? "red" : "green",
			fontSize: 16,
            fontWeight:'bold'
		},
		clearContainer: {
			alignItems: "center",
			padding: 8,
		},
	});
