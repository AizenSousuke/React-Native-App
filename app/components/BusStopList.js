import React from "react";
import { Button } from "react-native";
import { Pressable } from "react-native";
import { View, Text } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import { TouchableHighlight } from "react-native-gesture-handler";

const BusStopList = ({ name, address, code }) => {
	return (
		<ListItem bottomDivider>
			<ListItem.Content>
				<ListItem.Title>{name ?? "Bus Stop Name"}</ListItem.Title>
				<ListItem.Subtitle>
					{address ?? "Address"} {code ?? "Bus Stop Code"}
				</ListItem.Subtitle>
			</ListItem.Content>
			<Pressable
				onPress={() => console.log("Touched option")}
				android_ripple={{ borderless: true }}
			>
				<View>
					<Icon name="more-vert" />
				</View>
			</Pressable>
		</ListItem>
	);
};

export default BusStopList;
