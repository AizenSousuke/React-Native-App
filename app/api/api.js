import * as secrets from "../../secrets.json";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiKey = secrets.apiKey;
const header = {
	AccountKey: apiKey,
	Accept: "application/json",
};
var BusArrivalURL =	"http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2";
var BusStopsURL = "http://datamall2.mytransport.sg/ltaodataservice/BusStops";
const dataKey = {
	"GoingOut": "GoingOut",
	"GoingBack": "GoingBack"
}

export const getBusArrival = async (code, serviceNumber = null) => {
	var data = await axios
		.get(BusArrivalURL, {
			headers: header,
			params: {
				BusStopCode: code,
				ServiceNo: serviceNumber,
			},
		})
		.then((res) => {
			// console.log(res.data);
			return res.data;
		});

	return data;
};

export const getBusStops = async (skip = null) => {
	var data = await axios
		.get(BusStopsURL, {
            headers: header,
            params: {
                $skip: skip * 500
            },
		})
		.then((res) => {
            // console.log(res.data);
			return res.data;
		});

	return data;
};

export const getAllBusStops = async () => {
	// var data = await Promise.all[]
}

export const storeData = async (value) => {
	try {
		var data = await AsyncStorage.setItem(JSON.stringify(dataKey.GoingOut), value);
		return data;
	} catch (error) {
		console.log("Saving Error: " + error);
	}
}

export const getData = async () => {
	try {
		var data = await AsyncStorage.getItem(dataKey.GoingOut);
		return JSON.parse(data);
	} catch (error) {
		console.log("Get Data Error: " + error);
	}
}