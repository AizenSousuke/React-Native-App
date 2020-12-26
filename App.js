import {
	useDeviceOrientation,
	useDimensions,
} from "@react-native-community/hooks";
import React from "react";
import {
	Button,
	SafeAreaView,
	StyleSheet,
	Text,
	Image,
	Alert,
	TouchableHighlight,
	Platform,
	StatusBar,
	View,
	ScrollView,
} from "react-native";
import WelcomeScreen from "./app/screens/WelcomeScreen";

export default function App() {
	// console.log(useDimensions().screen.height);
	// console.log(useDeviceOrientation());

	const { landscape } = useDeviceOrientation();

	return (
		<WelcomeScreen />
	);
}


