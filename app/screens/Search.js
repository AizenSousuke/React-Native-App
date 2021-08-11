import { View, Text, ActivityIndicator, ToastAndroid } from "react-native";
import React, { useState, useEffect } from "react";
import { Header, ListItem, SearchBar } from "react-native-elements";
import styles from "../../assets/css/AppStyles";
import {
	getAllBusStops,
	getBusArrival,
	getBusStops,
	getData,
	storeData,
} from "../api/api";
import BusDetails from "../components/BusDetails";
import { ScrollView } from "react-native-gesture-handler";
import BusStopList from "../components/BusStopList";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native";
import BusStopListPureComponent from "../components/BusStopListPureComponent";

const renderItem = ({ item }) => (
	<BusStopListPureComponent
		name={item.Description}
		address={item.RoadName}
		code={item.BusStopCode}
	/>
);

const Search = () => {
	const [search, updateSearch] = useState("");
	const [canSearch, setCanSearch] = useState(true);
	const [searching, setSearching] = useState(false);
	const [busService, setBusService] = useState([]);
	const [busStops, setbusStops] = useState([]);
	const searchLength = 1;
	const pageSearchLength = 11;
	const limitResultsPerPage = 5;
	const limitResults = 10;

	const searchForBusStops = () => {
		console.log("Searching for bus stops");
		// Search for bus stops
		if (search.length >= searchLength) {
			setSearching(true);

			// Check if there's data in the db table
			getData().then((res) => {
				if (res[0] != null) {
					console.log("There's data in the db");
					console.log(
						JSON.parse(res[0].Data).length + " items loaded from db"
					);
					setbusStops(
						JSON.parse(res[0].Data)
							.filter(
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
							.slice(0, limitResults)
					);
					setSearching(false);
					ToastAndroid.show("Search completed.", ToastAndroid.SHORT);
				} else {
					console.warn("There's no data in the db");

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
								busStop.forEach((stop) =>
									arrayOfBusStops.push(stop)
								);
							});

							// arrayOfBusStops is the list of all the bus stops

							// Save the results into DB
							storeData(arrayOfBusStops);

							var results = arrayOfBusStops
								.filter(
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
								.slice(0, limitResults);
							console.log("Result size: " + results.length);
							setbusStops(results);
						})
						.catch((err) => console.log(err))
						.then(() => {
							console.log("Done getting all bus stops");
							setSearching(false);
							ToastAndroid.show(
								"Search completed.",
								ToastAndroid.SHORT
							);
						});
				}
			});
		} else {
			ToastAndroid.show(
				"Enter at least 1 character.",
				ToastAndroid.SHORT
			);
		}
	};

	// useEffect(() => {}, [search]);

	const viewabilityConfig = {
		// itemVisiblePercentThreshold: 100,
		minimumViewTime: 1000,
	}

	return (
		// <View>
		// 	<ScrollView>
		// <SafeAreaView>
		<FlatList
			windowSize={2}
			ListHeaderComponent={
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
			}
			initialNumToRender={limitResultsPerPage}
			maxToRenderPerBatch={limitResultsPerPage}
			data={busStops}
			renderItem={renderItem}
			keyExtractor={(item) => item.BusStopCode}
			viewabilityConfig={viewabilityConfig}
		/>
		// </SafeAreaView>
		// 		{busStops.length > 0 && !searching ? (
		// 			busStops.map((stops, key) => {
		// 				return (
		// 					<BusStopList
		// 						key={key}
		// 						name={stops.Description}
		// 						address={stops.RoadName}
		// 						code={stops.BusStopCode}
		// 					/>
		// 				);
		// 			})
		// 		) : (
		// 			<ListItem bottomDivider>
		// 				<ListItem.Content>
		// 					<ListItem.Title>
		// 						{searching ? (
		// 							<>
		// 								Searching:
		// 								<ActivityIndicator
		// 									size={"small"}
		// 									color={"black"}
		// 									style={{ paddingLeft: 10 }}
		// 								/>
		// 							</>
		// 						) : (
		// 							<>No results</>
		// 						)}
		// 					</ListItem.Title>
		// 				</ListItem.Content>
		// 			</ListItem>
		// 		)}
		// 	</ScrollView>
		// </View>
	);
};

export default Search;
