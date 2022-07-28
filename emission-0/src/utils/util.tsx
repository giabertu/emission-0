import { AnyAaaaRecord } from 'dns'
import data from './airports.json'

interface Airport {
  carriers: string,
  city: string, 
  code: string,
  country: string,
  direct_flights: string,
  elev: string,
  email: string,
  icao: string,
  lat: string, 
  lon: string, 
  name: string,
  phone: string, 
  runway_length: string,
  state: string,
  type: string,
  tz: string, 
  url: string,
  woeid: string,
}

export default class TravelsUtil {

  constructor() {}

  static getCitiesAndCodes () {

    const array: object[] = [];

    return data.map((obj: any, index: number) => {
      // const city = obj.city;
      // const code = obj.code;
      const value = `${obj.city} (${obj.code})`
      return {value}
    })
  }
}