import { FlightInfo } from "../utils/FlightInfo";


/* 
Table of contents:

  1. Carbon Interface
    1.1 Travels Api call
    2.2 Electricity Api call

  2. CO2 Offset API
    2.1 Price call 
    2.2 Compensate call

  3. Helper functions
 */


export class ApiCarbon {

  constructor() {}
  
  /*********CARBON INTERFACE CLASS MEMBERS ********/
  static CARB_INT_URL: string = 'https://www.carboninterface.com/api/v1';
  static API_KEY: string = 'E9Q2sW86qRep6bbcc4pCA';
  static HEADERS_CONFIG = {
    'Authorization' : `Bearer ${ApiCarbon.API_KEY}`,
    'Content-Type' : 'application/json',
  }

  /***TRAVELS API CALL ***/
  static async postFlightInfo(flightsArray: FlightInfo[]) {
    const {proceed, legsArray} = ApiCarbon.getLegsArray(flightsArray)
    if (proceed) {
      const data = {
        type: 'flight',
        passangers: '1',
        legs: legsArray
      }
      console.log('Here is the data object: ', data)
      const postReq = await fetch(`${ApiCarbon.CARB_INT_URL}/estimates`, {
        method: 'POST',
        headers: ApiCarbon.HEADERS_CONFIG, 
        body: JSON.stringify(data)
      })
      const estimate = await postReq.json();
      return estimate;
    }
  }
  /***ELECTRICITY API CALL ***/
  static async postElectricity(electricityInfo: {bedrooms: number, country: string}) {
    const {bedrooms, country} = electricityInfo;

    if (bedrooms && country) {
      let usagekWh = 0;
      switch (electricityInfo.bedrooms) {
        case 1:
          usagekWh = 2000;
          break;
        case 3:
          usagekWh = 3100;
          break;
        case 4:
          usagekWh = 4600;
          break;
        default:
          return;
      }
      
      const data = {
        type: 'electricity',
        electricity_unit: 'kwh',
        electricity_value: usagekWh,
        country: electricityInfo.country
      }

      console.log('Here is the body of the post request for Electricity: ', data)
  
      const res = await fetch(`${ApiCarbon.CARB_INT_URL}/estimates`, {
        method: 'POST',
        headers: ApiCarbon.HEADERS_CONFIG,
        body: JSON.stringify(data)
  
      })
      const estimate = await res.json();
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