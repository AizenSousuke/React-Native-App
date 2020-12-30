import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import TabNavigator from "./app/components/TabNavigator";
import Home from "./app/screens/Home";

export default function App() {
	return (
		<NavigationContainer>
			<TabNavigator />
		</NavigationContainer>
	);
}
