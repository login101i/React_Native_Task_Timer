import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

export const RoundedButton = ({ style, textStyle, size = 85, ...props }) => {
	return (
		<TouchableOpacity
			style={[styles(size).container, style]}
			onPress={props.onPress}
		>
			<Text style={[styles().buttonText, textStyle]}> {props.title}</Text>
		</TouchableOpacity>
	);
};

const styles = (size, font) =>
	StyleSheet.create({
		container: {
			borderRadius: size / 2,
			width: size,
			height: size,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			borderColor: "#fff",
			borderWidth: 2,
		},
		buttonText: {
			fontSize: 22,
			color: "white",
			fontWeight: "500",
			textAlign: "center",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
	});
