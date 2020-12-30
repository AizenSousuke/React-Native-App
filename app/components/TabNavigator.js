import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import BusStopDetails from "../screens/BusStopDetails";
import { View } from "react-native";
import { Text } from "react-native";
import { Icon } from "react-native-elements";

const Tab = createBottomTabNavigator();

function TabNavigator() {
	return (
		<Tab.Navigator initialRouteName={"Home"}>
			<Tab.Screen
				name="Going Out"
				component={Home}
				options={{
					tabBarIcon: () => {
						return <Icon name="directions-run" />;
					},
				}}
			></Tab.Screen>
			<Tab.Screen
				name="Going Home"
				component={BusStopDetails}
				options={{
					tabBarIcon: () => {
						return <Icon name="home" />;
					},
				}}
			></Tab.Screen>
		</Tab.Navigator>
	);
}

export default TabNavigator;
