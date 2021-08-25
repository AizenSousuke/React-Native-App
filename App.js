import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Search from "./app/screens/Search";
import Home from "./app/screens/Home";

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Home"
					component={Home}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Search"
					component={Search}
					options={{ headerShown: true }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
