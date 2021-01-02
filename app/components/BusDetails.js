import React from "react";
import { View, Text } from "react-native";
import styles from "../../assets/css/AppStyles";

const BusDetails = ({ busNumber, details }) => {
	return (
		<View style={styles.busDetails}>
			<Text style={styles.busNumber}>{busNumber}</Text>
			<View
				style={{
					flex: 1,
					flexDirection: "row",
					justifyContent: "space-evenly"
				}}
			>
				<Text style={{  }}>{details.NextBus?.Load}</Text>
				<Text style={{  }}>{details.NextBus2?.Load}</Text>
				<Text style={{  }}>{details.NextBus3?.Load}</Text>
			</View>
		</View>
	);
};

export default BusDetails;
