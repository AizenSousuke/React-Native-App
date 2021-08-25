import React from "react";
import { View } from "react-native";
import { Header } from "react-native-elements";
import SearchButton from "../components/SearchButton";
import TabNavigator from "../components/TabNavigator";

export default function Home({ navigation }) {
	return (
		<View style={{ flex: 1 }}>
			<Header
				placement={"center"}
				centerComponent={{
					text: "Yet Another SG Bus App",
					style: { color: "white", fontSize: 18 },
				}}
			/>
			<TabNavigator />
			<SearchButton
				onPress={() => {
					navigation.navigate("Search");
				}}
			/>
		</View>
	);
}
