import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Header, ListItem, SearchBar, Text } from "react-native-elements";
import styles from "../../assets/css/AppStyles";
import { getBusArrival } from "../api/api";
import BusDetails from "../components/BusDetails";

export default function Home() {
	const [search, updateSearch] = useState("");
	const [busService, setBusService] = useState([]);

	useEffect(() => {
		console.log(search);
		if (search.length >= 5) {
			getBusArrival(search)
				.then((res) => {
					console.log(res.services);
					setBusService(res.Services);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [search]);

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
				showLoading
			/>
			{/* <Text>{JSON.stringify(busService)}</Text> */}
			{busService.length > 0 ? (
				busService.map((service, key) => {
					console.log("Service No: " + service.ServiceNo);
					return (
						<ListItem key={key} bottomDivider>
							<ListItem.Content>
								<ListItem.Title h4>
									{service.ServiceNo}
								</ListItem.Title>
								<ListItem.Subtitle>
									<BusDetails busNumber={service.ServiceNo} />
								</ListItem.Subtitle>
							</ListItem.Content>
						</ListItem>
					);
				})
			) : (
				<ListItem bottomDivider>
					<Text h3>No results</Text>
				</ListItem>
			)}
		</View>
	);
}
