import * as secrets from "../../secrets.json";
import axios from "axios";

const apiKey = secrets.apiKey;
const header = {
	AccountKey: apiKey,
	Accept: "application/json",
};
var BusArrivalURL =	"http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2";
var BusStopsURL = "http://datamall2.mytransport.sg/ltaodataservice/BusStops";

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
