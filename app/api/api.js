import * as secrets from '../../secrets.json';
import axios from 'axios';

var apiKey = secrets.apiKey;
var BusArrivalURL = "http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2";

export const getBusArrival = async (code, serviceNumber = null) => {
    var data = await axios.get(BusArrivalURL, {
        headers: {
            AccountKey: secrets.apiKey,
            Accept: "application/json"
        },
        params: {
            BusStopCode: code,
            ServiceNo: serviceNumber
        }
    })
    .then((res) => {
        // console.log(res.data);
        return res.data;
    });

    return data;
}