import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { Header, ListItem, SearchBar } from "react-native-elements";
import styles from "../../assets/css/AppStyles";
import { getBusArrival, getBusStops } from "../api/api";
import BusDetails from "../components/BusDetails";
import { ScrollView } from "react-native-gesture-handler";
import BusStopList from "../components/BusStopList";

const Search = () => {
	const [search, updateSearch] = useState("");
	const [canSearch, setCanSearch] = useState(true);
	const [busService, setBusService] = useState([]);
	const [busStops, setbusStops] = useState([]);
	const searchLength = 5;
	const pageSearchLength = 11;

	useEffect(() => {
		console.log(search);
		// Search for bus stops
		if (search.length >= searchLength && canSearch) {
			// 5042 records available
			setCanSearch(false);
			console.log("Setting can search to false");
			var arrayOfBusStops = [];
			var arrayOfPromises = [];
			for (
				var pageSearched = 0;
				pageSearched < pageSearchLength;
				pageSearched++
			) {
				arrayOfPromises.push(
					getBusStops(pageSearched)
						.then((res) => res.value)
						.catch((err) => console.log(err))
				);
			}

			Promise.all(arrayOfPromises)
				.then((res) => {
					res.map((busStop) => {
						busStop.forEach((stop) => arrayOfBusStops.push(stop));
						// console.log(arrayOfBusStops.length);
					});
					setbusStops(
						arrayOfBusStops.filter(
							(busstop) =>
								busstop.Description.toLowerCase().includes(
									search
								) ||
								busstop.RoadName.toLowerCase().includes(
									search
								) ||
								busstop.BusStopCode.toLowerCase().includes(
									search
								)
						)
					);
				})
				.catch((err) => console.log(err))
				.then(() => {
					console.log("Done getting all bus stops");
					setCanSearch(true);
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
				showLoading={true}
			/>
			<ScrollView>
				{busStops.length > 0 ? (
					busStops.map((stops, key) => {
						return (
							<BusStopList
								key={key}
								name={stops.Description}
								address={stops.RoadName}
								code={stops.BusStopCode}
							/>
						);
					})
				) : (
					<ListItem bottomDivider>
						<ListItem.Content>
							<ListItem.Title>No results</ListItem.Title>
						</ListItem.Content>
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
