import * as secrets from "../../secrets.json";
import axios from "axios";
import * as SQLite from "expo-sqlite";

const databaseName = databaseName;
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

/**
 * Create Bus Stop Table if it doesn't exists
 */
export const BusStopTableCheck = (tx) => {
	console.log("Creating if Bus Stop Table exists.");
	tx.executeSql(
		`
		CREATE TABLE IF NOT EXISTS BusStopList (
			Id INTEGER PRIMARY KEY AUTOINCREMENT,
			Data nvarchar(255) NULL,
			LastUpdated datetime2 DEFAULT CURRENT_TIMESTAMP
		);`,
		[],
		() => {
			console.log("Success");
		},
		(err) => {
			console.log("Error: {0}", err);
		}
	);
};

/**
 * Stores a data into Bus Stop List Table
 * @param {any} value Data to store
 */
export const storeData = async (value) => {
	try {
		var db = SQLite.openDatabase(databaseName);
		db.transaction(
			(tx) => {
				// tx.executeSql(`
				// DROP TABLE BusStopList
				// `);

				BusStopTableCheck(tx);

				tx.executeSql(
					`
					INSERT INTO BusStopList (
						Data
					) VALUES (
						?
					)
				`,
					[JSON.stringify(value)],
					(tx, res) => {
						console.log("Value: " + JSON.stringify(value));
						console.log("Res: " + JSON.stringify(res));
					}
				);
			},
			(err) => console.error("Error in storing to SQLite " + err.message),
			() => {
				console.log("Successfully stored data in SQLite");
			}
		);
	} catch (error) {
		console.log("Saving Error: " + error);
	}
};

/**
 * Get data from the Database
 * @param {string} value If value is provided, it will search the SQL table for that value
 */
export const getData = async (value = null) => {
	try {
		var data = null;
		var db = SQLite.openDatabase(databaseName);
		db.transaction(
			(tx) => {
				if (value == null) {
					console.log("Value provided is null");
					tx.executeSql(
						`
						SELECT Data FROM BusStopList
					`,
						[],
						(tx, res) => {
							console.log("Value: " + JSON.stringify(value));
							console.log("Res: " + JSON.stringify(res));
							data = res;
							return data;
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
							console.log("Res: " + JSON.stringify(res));
							data = res;
							return data;
						}
					);
				}
			},
			(err) => {
				console.error(
					"Error in getting data from SQLite " + err.message
				);
			},
			() => {
				console.log("Successfully read data from SQLite");
			}
		);
		console.log("Data: " + JSON.stringify(data));
		return data;
	} catch (error) {
		console.log("Get Data Error: " + error);
	}
};

/**
 * Gets the last updated date of the bus stops in order to update
 * it if required
 */
export const getLastUpdatedDate = () => {
	try {
		var data = null;
		var db = SQLite.openDatabase(databaseName);
		db.readTransaction(
			() =>
				tx.executeSql(
					`
			SELECT LastUpdatedDate FROM BusStopList
			ORDER BY LastUpdatedDate desc
		`,
					[],
					(tx, res) => {
						data = res;
						return data;
					},
					(err) => console.log("Error executing sql {0}", err)
				),
			(err) => console.log("Error reading transaction {0}", err),
			() => console.log("Successfully read transaction")
		);
	} catch (error) {
		console.log("Error getting last updated date from db {0}", error);
	}
};
