import React, { useState, useEffect } from "react";
import { Button } from "react-native";
import { View, Text, RefreshControl } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
	BusStopTableCheck,
	DeleteBusStopList,
	getData,
	getLastUpdatedDate,
	storeData,
} from "../api/api";
import BusStopList from "../components/BusStopList";

const GoingOut = () => {
	const [refreshing, setRefreshing] = useState(false);
	const [sampleText, setSampleText] = useState(
		"Amet quis esse ad do reprehenderit ad qui commodo reprehenderit sint ex ullamco exercitation elit."
	);
	useEffect(() => {}, []);
	return (
		<ScrollView
			refreshControl={
				<RefreshControl
					refreshing={refreshing}
					onRefresh={() => {
						// setRefreshing(true);
						// getData()
						// 	.then((data) => {
						// 		console.log("Data: " + JSON.stringify(data));
						// 		setSampleText(JSON.stringify(data));
						// 		console.log("Refreshed");
						// 		setRefreshing(false);
						// 	})
						// 	.catch((error) => console.log(error));
					}}
				></RefreshControl>
			}
		>
			{sampleText != null ? (
				<Text>{sampleText.slice(0, 10000)}</Text>
			) : (
				<Text>No data: {sampleText}</Text>
			)}
			{/* <BusStopList /> */}
			<Button
				title="Get last updated date"
				onPress={() =>
					getLastUpdatedDate().then((res) => setSampleText(res))
				}
			/>
			<Button
				title="Get data"
				onPress={() => getData().then((res) => setSampleText(JSON.stringify(res)))}
			/>
			<Button
				title="Check DB Table"
				onPress={() =>
					BusStopTableCheck().then((res) => {
						setSampleText(res);
					})
				}
			/>
			<Button title="Store data" onPress={() => storeData("Lorem ipsum")} />
			<Button title="Delete data" onPress={() => DeleteBusStopList().then((() => setSampleText("Deleted data")), () => setSampleText("Error"))} />
		</ScrollView>
	);
};

export default GoingOut;
