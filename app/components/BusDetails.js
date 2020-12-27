import React from "react";
import { View, Text } from "react-native";
import styles from "../../assets/css/AppStyles";

const BusDetails = ({ busNumber }) => {
	return (
		<View style={styles.busDetails}>
			<Text style={styles.busTiming}>{busNumber}</Text>
			<Text style={styles.busTiming}>5 min</Text>
			<Text style={styles.busTiming}>15 min</Text>
			<Text style={styles.busTiming}>25 min</Text>
		</View>
	);
};

export default BusDetails;
