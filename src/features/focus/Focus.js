import React, { useState } from "react";
import { View, StyleSheet, Platform, Text } from "react-native";
import { TextInput } from "react-native-paper";

import { RoundedButton } from "../../components/RoundedButton";

export const Focus = ({ setFocusSubject }) => {
	const [tmpItem, setTmpItem] = useState(null);

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.textInput}
				onChangeText={(text) => setTmpItem(text)}
			/>
			<View style={{ marginLeft: 20 }}>
				<RoundedButton
					title="Add Task"
					onPress={() => setFocusSubject(tmpItem)}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flex: 1,
		justifyContent: "center",
		flexDirection: "row",
		alignItems: "center",
		paddingTop: Platform === "android" ? 30 : 50,
		padding: 8,
	},
	textInput: {
		height: 60,
		width: "70%",
		display: "flex",
	},
});
