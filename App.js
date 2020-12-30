import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { Header } from "react-native-elements";
import SearchButton from "./app/components/SearchButton";
import TabNavigator from "./app/components/TabNavigator";

export default function App() {
	return (
		<NavigationContainer>
			<View style={{ flex: 1 }}>
				<Header
					placement={"center"}
					centerComponent={{
						text: "Yet Another SG Bus App",
						style: { color: "white", fontSize: 18 },
					}}
				/>
				<TabNavigator />
			</View>
			<SearchButton />
		</NavigationContainer>
	);
}
