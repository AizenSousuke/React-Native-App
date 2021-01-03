import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import BusDetails from "./BusDetails";
import styles from "../../assets/css/AppStyles";

const BusStop = ({ busStopData }) => {
	const [data, setData] = useState(busStopData);

	useEffect(() => {
		setData({...busStopData, busStopData});
	}, [busStopData]);
	
	return (
		<View style={styles.busStop}>
			{data.Services?.map((service, key) => {
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
