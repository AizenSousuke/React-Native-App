import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	Image,
	ImageBackground,
	StyleSheet,
	Button,
	ScrollView,
	SafeAreaView,
} from "react-native";
import { Header, ListItem, SearchBar } from "react-native-elements";
import styles from "../../assets/css/AppStyles";
import { getBusArrival } from "../api/api";
import BusDetails from "../components/BusDetails";

export default function Home() {
	const [search, updateSearch] = useState("");
	const [busService, setBusService] = useState([]);

	useEffect(() => {
		console.log(search);
		getBusArrival(search)
			.then((res) => {
				console.log(res.services);
				setBusService(res.Services);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<View>
			<Header
				placement={"center"}
				centerComponent={{
					text: "Yet Another SG Bus App",
					style: { color: "white", fontSize: 18 },
				}}
			/>
			<SearchBar
				placeholder={"Search for a bus stop"}
				onChangeText={(value) => {
					console.log("Value: " + value);
					updateSearch(value);
				}}
				value={search.toString()}
			/>
			{/* <Text>{JSON.stringify(busService)}</Text> */}
			{busService.map((service, key) => {
				console.log("Service No: " + service.ServiceNo);
				return (
					<ListItem key={key}>
						<BusDetails busNumber={service.ServiceNo} />
					</ListItem>
				);
			})}
		</View>
	);
}
