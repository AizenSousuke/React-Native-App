import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import BusStop from "../../components/BusStop";
describe("Going out", () => {
	it("renders correctly", () => {
		const data = {
			BusStopCode: "83139",
			Services: [
				{
					ServiceNo: "911",
					NextBus: {
						OriginCode: "52009",
						DestinationCode: "84009",
						EstimatedArrival: "2017-06-05T14:55:12+08:00",
						Latitude: "1.3184713333333333",
						Longitude: "103.89202066666667",
						VisitNumber: "1",
						Load: "SEA",
						Feature: "WA",
					},
					NextBus2: {

					},
					NextBus3: {
						
					}
				},
			],
		};
		render(<BusStop busStopData={data} />);
	});
});
