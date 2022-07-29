import { FlightInfo } from "./FlightInfo";

export class ApiService {

  static CARB_INT_URL: string = 'https://www.carboninterface.com/api/v1';
  static API_KEY: string = 'E9Q2sW86qRep6bbcc4pCA';

  constructor() {}

  static async postFlightInfo(flightsArray: FlightInfo[]) {
    const {proceed, legsArray} = ApiService.getLegsArray(flightsArray)
    if (proceed) {
      const data = {
        type: 'flight',
        passangers: '1',
        legs: legsArray
      }
      console.log('Here is the data object: ', data)
      const postReq = await fetch(`${ApiService.CARB_INT_URL}/estimates`, {
        method: 'POST',
        headers: {
          'Authorization' : `Bearer ${ApiService.API_KEY}`,
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(data)
      })
      const estimate = await postReq.json();
      return estimate;
    }
  }


  /*************HELPER FUNCTIONS *************/  
  static getLegsArray(flightsArray: FlightInfo[]) {
    let proceed = false;
    let legsArray: any = [];

    if (flightsArray.length) {
      proceed = true;

      legsArray = flightsArray.map((flight: FlightInfo) => {
        
        if (flight.from && flight.to) {

          return {departure_airport: flight.from.slice(-4, -1).toLowerCase(), destination_airport: flight.to.slice(-4, -1).toLowerCase()}

        } else {
          proceed = false;
        }
      })
    }
    return {proceed, legsArray}
  }


}