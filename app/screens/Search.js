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

	const searchForBusStops = () => {
		console.log("Searching for bus stops");
		// Search for bus stops
		if (search.length >= searchLength) {
			// 5042 records available
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
				});
			}
	}

	useEffect(() => {
		// console.log("Search: " + search);
		// console.log("Can search? " + canSearch);
		// searchForBusStops();
	}, [search]);

	return (
		<View>
			<SearchBar
				placeholder={"Search for a bus stop"}
				onChangeText={(value) => {
					console.log("Value: " + value);
					updateSearch(value);
				}}
				onSubmitEditing={() => {
					console.log("Searching for: " + search);
					searchForBusStops();
				}}
				value={search.toString()}
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
		</View>
	);
};

export default Search;
