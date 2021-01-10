import React, { useState, useEffect } from "react";
import { View, Text, RefreshControl } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { getData } from "../api/api";
import BusStopList from "../components/BusStopList";

const GoingOut = () => {
	const [refreshing, setRefreshing] = useState(false);
	const [data, setdata] = useState(null);
	useEffect(() => {
		// getData().then((data) => {
		// 	setdata(data);
		// 	console.log("Data: " + data);
		// });
	}, []);
	return (
		<ScrollView
			refreshControl={
				<RefreshControl
					refreshing={refreshing}
					onRefresh={() => {
						setRefreshing(true);
						getData()
							.then((data) => {
								console.log("Data: " + JSON.stringify(data));
								setdata(data);
								console.log("Refreshed");
								setRefreshing(false);
							})
							.catch((error) => console.log(error));
					}}
				></RefreshControl>
			}
		>
			{data != null ? <Text>{JSON.stringify(data)}</Text> : <Text>No data: {JSON.stringify(data)}</Text>}
			{/* <BusStopList /> */}
		</ScrollView>
	);
};

export default GoingOut;
