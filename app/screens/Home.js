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
										<BusDetails
											busNumber={service.ServiceNo}
										/>
									</ListItem.Subtitle>
								</ListItem.Content>
							</ListItem>
						);
					})
				) : (
					<ListItem bottomDivider>
						<View style={{ flex: 0.5 }}></View>
						<View style={{ flex: 1 }}>
							<Text h3>No results</Text>
						</View>
						<View style={{ flex: 0.5 }}></View>
					</ListItem>
				)}
			</View>
	);
}
