import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import BusDetails from "./BusDetails";
import styles from "../../assets/css/AppStyles";
import { getBusArrival } from "../api/api";

const BusStop = ({ code }) => {
	const [busStopData, setBusStopData] = useState(0);

	useEffect(() => {
		getBusArrival(code).then((res) => {
			setBusStopData(res);
			// console.log("Effect res: " + JSON.stringify(res));
		});
	}, []);

	return (
		<View style={styles.busStop}>
			<View style={{ flexDirection: "row" }}>
				<Text style={styles.busStopDetails}>
					Bus Stop: {code ?? "No bus stop code set"}
				</Text>
				<Button title={"Refresh"}></Button>
			</View>
			{busStopData.Services?.map((service, key) => {
				return <>
					<BusDetails key={key} busNumber={service.ServiceNo} />
				</>
			})}
		</View>
	);
};

export default BusStop;
