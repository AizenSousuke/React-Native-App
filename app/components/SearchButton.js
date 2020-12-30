import React from "react";
import ActionButton from "react-native-action-button";
import { Icon } from "react-native-elements";

const SearchButton = ({ onPress }) => {
	return (
		<ActionButton
			offsetY={100}
			renderIcon={() => {
				return <Icon name="gps-fixed" color={"white"} />;
			}}
			onPress={onPress}
		/>
	);
};

export default SearchButton;
