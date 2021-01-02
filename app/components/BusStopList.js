import React, { useState } from "react";
import { Pressable } from "react-native";
import { View, Text } from "react-native";
import Collapsible from "react-native-collapsible";
import { Icon, ListItem, Overlay, Tooltip } from "react-native-elements";
import BusStop from "./BusStop";

const BusStopList = ({ name, address, code }) => {
	const [OverlayVisible, setOverlayVisible] = useState(false);
	const [isCollapsed, setIsCollapsed] = useState(true);
	const [arrow, setArrow] = useState(false);
	return (
		<View>
			<ListItem
				topDivider
				bottomDivider
				onPress={() => {
					setIsCollapsed(!isCollapsed);
					setArrow(!arrow);
				}}
			>
				<Icon name={arrow ? "keyboard-arrow-down" : "keyboard-arrow-right"} />
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
									<ListItem.Subtitle>
										Going Out
									</ListItem.Subtitle>
								</ListItem>
								<ListItem
									onPress={() => {
										setOverlayVisible(false);
										console.log(
											"Adding to Going Home List"
										);
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
			<Collapsible collapsed={isCollapsed}>
				<BusStop code={code} />
			</Collapsible>
		</View>
	);
};

export default BusStopList;
