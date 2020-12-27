import React from "react";
import { View, Text } from "react-native";
import styles from "../../assets/css/AppStyles";

const BusDetails = ({ busNumber }) => {
	return (
		<View style={styles.busDetails}>
			<View style={styles.busDetails}>
				{busNumber}
			</View>
			<View style={styles.busDetails}>
				<View style={styles.busTiming}>5 min</View>
				<View style={styles.busTiming}>10 min</View>
				<View style={styles.busTiming}>16 min</View>
			</View>
		</View>
	);
};

export default BusDetails;
