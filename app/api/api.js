import * as secrets from "../../secrets.json";
import axios from "axios";
import * as SQLite from "expo-sqlite";

const apiKey = secrets.apiKey;
const header = {
	AccountKey: apiKey,
	Accept: "application/json",
};
var BusArrivalURL =
	"http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2";
var BusStopsURL = "http://datamall2.mytransport.sg/ltaodataservice/BusStops";
const dataKey = {
	GoingOut: "GoingOut",
	GoingBack: "GoingBack",
};

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
				$skip: skip * 500,
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
};

export const BusStopTableCheck = (tx) => {
	tx.executeSql(
		`
		CREATE TABLE IF NOT EXISTS BusStopList (
			Id INTEGER PRIMARY KEY AUTOINCREMENT,
			Data nvarchar(255) NULL
		);`,
		[]
	);
};

export const storeData = async (value) => {
	try {
		var data = null;
		var db = SQLite.openDatabase("sgbus.db");
		db.transaction(
			(tx) => {
				// tx.executeSql(`
				// DROP TABLE BusStopList
				// `);

				// tx.executeSql(
				// 	`
				// 	CREATE TABLE IF NOT EXISTS BusStopList (
				// 		Id INTEGER PRIMARY KEY AUTOINCREMENT,
				// 		Data nvarchar(255) NULL
				// 	);
				// `,
				// 	[]
				// );

				BusStopTableCheck(tx);

				tx.executeSql(
					`
					INSERT INTO BusStopList (
						Data
					) VALUES (
						?
					)
				`,
					[value],
					(tx, res) => {
						console.log("Value: " + JSON.stringify(value));
						console.log(JSON.stringify(res));
					}
				);
			},
			(err) => console.error("Error in storing to SQLite " + err.message),
			() => console.log("Successfully stored data in SQLite")
		);
	} catch (error) {
		console.log("Saving Error: " + error);
	}
};

export const getData = async (value = null) => {
	try {
		var data = null;
		var db = SQLite.openDatabase("sgbus.db");
		db.transaction(
			(tx) => {
				if (value == null) {
					console.log("Value is null");
					tx.executeSql(
						`
						SELECT Data FROM BusStopList
					`,
						[],
						(tx, res) => {
							console.log("Value: " + JSON.stringify(value));
							console.log(JSON.stringify(res));
						}
					);
				} else {
					tx.executeSql(
						`
						SELECT Data FROM BusStopList
						WHERE 
							Data LIKE '%' + ? + '%'
					`,
						[value],
						(tx, res) => {
							console.log("Value: " + JSON.stringify(value));
							console.log(JSON.stringify(res));
						}
					);
				}
			},
			(err) => {
				console.error(
					"Error in getting data from SQLite " + err.message
				);
			},
			() => console.log("Successfully read data from SQLite")
		);
		return data;
	} catch (error) {
		console.log("Get Data Error: " + error);
	}
};
