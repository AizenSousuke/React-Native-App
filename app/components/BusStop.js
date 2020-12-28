import React from "react";
import { View, Text, Button } from "react-native";
import BusDetails from "./BusDetails";
import styles from "../../assets/css/AppStyles";

const BusStop = () => {
	return (
		<View>
			<View style={{ flexDirection: "row" }}>
				<Text style={styles.busStopDetails}>
					Bus Stop: Pending Road
				</Text>
				<Button title={"Refresh"}></Button>
			</View>
			<BusDetails busNumber={966} />
			<BusDetails busNumber={960} />
			<BusDetails busNumber={911} />
			<BusDetails busNumber={913} />
			<BusDetails busNumber={963} />
		</View>
	);
};

export default BusStop;
