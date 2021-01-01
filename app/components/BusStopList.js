import React, { useState } from "react";
import { Pressable } from "react-native";
import { View, Text } from "react-native";
import { Icon, ListItem, Overlay, Tooltip } from "react-native-elements";

const BusStopList = ({ name, address, code }) => {
	const [OverlayVisible, setOverlayVisible] = useState(false);
	return (
		<ListItem bottomDivider onPress={(x) => console.log(name + " is pressed.")}>
			<ListItem.Content>
				<ListItem.Title>{name ?? "Bus Stop Name"}</ListItem.Title>
				<ListItem.Subtitle>
					{address ?? "Address"} ({code ?? "Bus Stop Code"})
				</ListItem.Subtitle>
			</ListItem.Content>
			<Pressable
				onPress={() => setOverlayVisible(true)}
				android_ripple={{ borderless: true }}
			>
				<View>
					<Icon name="more-vert" />
					<Overlay
						isVisible={OverlayVisible}
						onBackdropPress={() =>
							setOverlayVisible(!OverlayVisible)
						}
					>
						<View>
							<ListItem>
								<ListItem.Title>Add to:</ListItem.Title>
							</ListItem>
							<ListItem
								onPress={() => {
									setOverlayVisible(false);
									console.log("Adding to Going Out List");
								}}
							>
								<ListItem.Subtitle>Going Out</ListItem.Subtitle>
							</ListItem>
							<ListItem
								onPress={() => {
									setOverlayVisible(false);
									console.log("Adding to Going Home List");
								}}
							>
								<ListItem.Subtitle>
									Going Home
								</ListItem.Subtitle>
							</ListItem>
						</View>
					</Overlay>
				</View>
			</Pressable>
		</ListItem>
	);
};

export default BusStopList;
