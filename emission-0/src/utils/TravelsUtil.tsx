import data from './airports.json'

export default class TravelsUtil {
  
  constructor() {}
  
  static getCitiesAndCodes () {
    const newArr = data.filter(obj => obj.type === 'Airports');
    return newArr.map((obj: any,) => {      
      const value = `${obj.city} (${obj.code})`
      return { value }
    })
  }
}






// interface Airport {
//   carriers: string,
//   city: string, 
//   code: string,
//   country: string,
//   direct_flights: string,
//   elev: string,
//   email: string,
//   icao: string,
//   lat: string, 
//   lon: string, 
//   name: string,
//   phone: string, 
//   runway_length: string,
//   state: string,
//   type: string,
//   tz: string, 
//   url: string,
//   woeid: string,
// }