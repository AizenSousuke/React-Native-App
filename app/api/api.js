import * as secrets from "../../secrets.json";
import axios from "axios";
import * as SQLite from "expo-sqlite";

/**
 * Store the bus stops here
 */
const databaseName = "sgbus.db";
/**
 * Store user settings here
 */
const settingsDatabaseName = "settings.db";
/**
 * Api key to be provided from a secrets.json file
 */
const apiKey = secrets.apiKey;
/**
 * Headers to be set for the requests
 */
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

var db = SQLite.openDatabase(databaseName);

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
export const BusStopTableCheck = () => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`
				CREATE TABLE IF NOT EXISTS BusStopList (
					Id INTEGER PRIMARY KEY AUTOINCREMENT,
					Data nvarchar(255) NULL,
					LastUpdated datetime2 DEFAULT CURRENT_TIMESTAMP
				);
	
				-- insert into BusStopList (Id, Data, LastUpdated) values (1, 'data', CURRENT_TIMESTAMP);
	
				`,
				[],
				(res, result) => {
					// console.log("Success: %s", result);
					tx.executeSql(
						`
						SELECT * FROM BusStopList;
					`,
						[],
						(res, result) => {
							// result.rows._array.forEach((item) => {
							// 	console.log("Items: %s", item);
							// });

							resolve(
								JSON.stringify(result.rows._array, null, "\t")
							);
						},
						(err) => {
							console.log("Error: %s", err);
							reject(null);
						}
					);
				},
				(err) => {
					console.log("Error: %s", err);
					reject(null);
				}
			);
		});
	});
};

/**
 * Stores a data into Bus Stop List Table
 * @param {any} value Data to store
 * @returns true if data is successfully saved
 */
export const storeData = (value) => {
	try {
		return new Promise((resolve, reject) => {
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
						[JSON.stringify(value, null, "\t")],
						(tx, res) => {
							// console.log("Value: " + JSON.stringify(value));
							// console.log("Res: " + JSON.stringify(res));
							resolve(true);
						}
					);
				},
				(err) => {
					console.error("Error in storing to SQLite " + err.message);
					reject(false);
				},
				() => {
					console.log("Successfully stored data in SQLite");
				}
			);
		});
	} catch (error) {
		console.log("Saving Error: " + error);
	}
};

/**
 * Get data from the Database
 * @param {string} value If value is provided, it will search the SQL table for that value
 */
export const getData = (value = null) => {
	try {
		return new Promise((resolve, reject) => {
			db.transaction(
				(tx) => {
					if (value == null) {
						console.log("Value provided is null");
						tx.executeSql(
							`
							SELECT Data FROM BusStopList;
						`,
							[],
							(tx, res) => {
								// res.rows._array.forEach(item => {
								// 	console.log("Items: %s", item);
								// })
								// console.log(
								// 	"Data: %s",
								// 	JSON.stringify(res.rows._array, null, "\t")
								// );
								resolve(res);
							},
							(err) => {
								console.log("Error getting data ", err);
								reject(null);
							}
						);
					} else {
						tx.executeSql(
							`
							SELECT Data FROM BusStopList
							WHERE 
								Data LIKE '%' + ? + '%';
						`,
							[value],
							(tx, res) => {
								// res.rows._array.forEach((item) => {
								// 	console.log("Items: %s", item);
								// });
								// console.log("Value: " + JSON.stringify(value));
								// console.log("Res: " + JSON.stringify(res));
								resolve(res);
							},
							(err) => {
								console.log(
									"Error getting filtered data ",
									err
								);
								reject(null);
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
		});
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
		return new Promise((resolve, reject) => {
			db.transaction(
				(tx) =>
					tx.executeSql(
						`
							SELECT LastUpdated 
							FROM BusStopList
							ORDER BY LastUpdated DESC
						`,
						[],
						(tx, res) => {
							if (res.rows._array.length > 0) {
								// console.log(
								// 	"Last updated date: ",
								// 	res.rows.item(0).LastUpdated
								// );
								resolve(res.rows.item(0).LastUpdated);
							} else {
								resolve(null);
							}
						},
						(err) => {
							console.log("Error executing sql {0}", err);
							reject(null);
						}
					),
				(err) => {
					console.log("Error reading transaction {0}", err);
					reject(null);
				},
				() => {
					console.log("Successfully read transaction");
					resolve(null);
				},
				(err) => {
					console.log("Error %s", err);
					reject(null);
				}
			);
		});
	} catch (error) {
		console.log("Error getting last updated date from db {0}", error);
	}
};

export const DeleteBusStopList = () => {
	try {
		return new Promise((resolve, reject) => {
			db.transaction((tx) =>
				tx.executeSql(
					`
					DELETE FROM BusStopList WHERE Data NOT NULL
					`,
					[],
					(res) => {
						console.log("Deleted items from table");
						resolve(true);
					},
					(err) => {
						console.log("Error deleting items from table ", err);
						reject(false);
					}
				)
			);
		});
	} catch (error) {}
};

// Sample function
export const SampleFunctionThatReturnsSomething = (param) => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`SQL STATEMENT`,
				[parameters],
				(transaction, resultSet) => {
					resolve(resultSet);
				},
				(transaction, error) => {
					reject(error);
				}
			);
		});
	});
};
