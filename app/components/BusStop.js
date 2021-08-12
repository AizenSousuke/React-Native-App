import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import BusDetails from "./BusDetails";
import styles from "../../assets/css/AppStyles";

const BusStop = ({ busStopData }) => {
	// console.log(JSON.stringify(busStopData.Services?.sort(a => a.ServiceNo)));
	return (
		<View style={styles.busStop}>
			{busStopData.Services?.sort(a => a.ServiceNo).map((service, key) => {
				return (
					<BusDetails
						key={key}
						busNumber={service.ServiceNo}
						details={service}
					/>
				);
			})}
		</View>
	);
};

export default BusStop;
