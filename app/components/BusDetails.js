import React from "react";
import { View, Text } from "react-native";
import * as Progress from "react-native-progress";
import styles from "../../assets/css/AppStyles";

const GetValueForLoad = (load) => {
	switch (load) {
		case "SEA":
			return 0.2;
		case "SDA":
			return 0.6;
		default:
			return 0.9;
	}
}

const GetColorForLoad = (load) => {
	switch (load) {
		case "SEA":
			return "green";
		case "SDA":
			return "orange";
		default:
			return "red";
	}
}

const BusDetails = ({ busNumber, details }) => {
	return (
		<View style={styles.busDetails}>
			<Text style={styles.busNumber}>{busNumber}</Text>
			<View
				style={{
					flex: 1,
					flexDirection: "row",
					justifyContent: "space-evenly",
				}}
			>
				<View style={{ flexDirection: "column" }}>
					<Progress.Bar
						progress={GetValueForLoad(details.NextBus?.Load)}
						color={GetColorForLoad(details.NextBus?.Load)}
						width={50}
					/>
				</View>
				<View style={{ flexDirection: "column" }}>
					<Progress.Bar
						progress={GetValueForLoad(details.NextBus2?.Load)}
						color={GetColorForLoad(details.NextBus2?.Load)}
						width={50}
					/>
				</View>
				<View style={{ flexDirection: "column" }}>
					<Progress.Bar
						progress={GetValueForLoad(details.NextBus3?.Load)}
						color={GetColorForLoad(details.NextBus3?.Load)}
						width={50}
					/>
				</View>
			</View>
		</View>
	);
};

export default BusDetails;
