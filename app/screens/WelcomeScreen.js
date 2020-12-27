import React from "react";
import {
	View,
	Text,
	Image,
	ImageBackground,
	StyleSheet,
	Button,
	ScrollView,
	SafeAreaView,
} from "react-native";
import styles from "../../assets/css/AppStyles";
import BusStopDetails from "./BusStopDetails";

export default function WelcomeScreen() {
	return (
		<ImageBackground
			source={require("../../assets/busBackground.jpg")}
			style={styles.background}
			blurRadius={1}
			opacity={0.5}
		>
			<View style={styles.logoContainer}>
				<Image
					source={{ uri: "https://picsum.photos/200" }}
					style={styles.logo}
				/>
				<Text style={styles.headerText}>Yet Another SG Bus App</Text>
			</View>
			<View style={styles.busStopDetails}>
				<Text style={styles.busStopDetails}>Bus Stop Details</Text>
				<BusStopDetails />
			</View>
			<View style={styles.loginButton}>
				<Text style={[styles.text, styles.textUppercase]}>Login</Text>
			</View>
			<View style={styles.registerButton}>
				<Text style={[styles.text, styles.textUppercase]}>
					Register
				</Text>
			</View>
		</ImageBackground>
	);
}
