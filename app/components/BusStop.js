import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import BusDetails from "./BusDetails";
import styles from "../../assets/css/AppStyles";

const BusStop = ({ busStopData }) => {
	return (
		<View style={styles.busStop}>
			{busStopData.Services?.map((service, key) => {
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
