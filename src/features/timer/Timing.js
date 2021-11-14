import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { RoundedButton } from "../../components/RoundedButton";

export const Timing = ({ changeTime }) => (
	<>
		<View style={styles.timingButton}>
			<RoundedButton size={75} title="1" onPress={() => changeTime(1)} />
		</View>
		<View style={styles.timingButton}>
			<RoundedButton size={75} title="5" onPress={() => changeTime(1)} />
		</View>
		<View style={styles.timingButton}>
			<RoundedButton
				size={75}
				title="20"
			
				onPress={() => changeTime(20)}
			/>
		</View>
	</>
);

const styles = StyleSheet.create({
	timingButton: {
		flex: 1,
		alignItems: "center",
	},
});
