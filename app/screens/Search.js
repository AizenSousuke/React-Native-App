import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { Header, ListItem, SearchBar } from "react-native-elements";
import styles from "../../assets/css/AppStyles";
import { getBusArrival, getBusStops } from "../api/api";
import BusDetails from "../components/BusDetails";
import { ScrollView } from "react-native-gesture-handler";

const Search = () => {
	const [search, updateSearch] = useState("");
	const [busService, setBusService] = useState([]);
	const [busStops, setbusStops] = useState([]);

	useEffect(() => {
		console.log(search);
		// if (search.length >= 5) {
		// 	getBusArrival(search)
		// 		.then((res) => {
		// 			console.log(res.services);
		// 			setBusService(res.Services);
		// 		})
		// 		.catch((error) => {
		// 			console.log(error);
		// 		});
		// }

		// Search for bus stops
		if (search.length >= 3) {
			getBusStops()
				.then((res) => {
					var arrayOfBusStops = [];
					res.value.forEach((x) => {
						if (
							x.BusStopCode.toLowerCase().includes(search) ||
							x.RoadName.toLowerCase().includes(search) ||
							x.Description.toLowerCase().includes(search)
						) {
							console.log("Includes: " + x.Description);
							arrayOfBusStops.push(x);
							console.log(arrayOfBusStops.length);
						}
					});
					setbusStops(arrayOfBusStops);
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
			<ScrollView>
				{busStops.length > 0 ? (
					busStops.map((stops, key) => {
						return (
							<ListItem key={key} bottomDivider>
								<ListItem.Content>
									<ListItem.Title h4>
										{stops.Description}
									</ListItem.Title>
									<ListItem.Subtitle>
										{stops.RoadName} ({stops.BusStopCode})
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
			</ScrollView>

			{/* {busService.length > 0 ? (
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
					<View style={{ flex: 0.5 }}></View>
					<View style={{ flex: 1 }}>
						<Text h3>No results</Text>
					</View>
					<View style={{ flex: 0.5 }}></View>
				</ListItem>
			)} */}
		</View>
	);
};

export default Search;
