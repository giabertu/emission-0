import airports from '../data/airports.json'
import countries from '../data/countries.json'

export class DataUtil {
  
  constructor() {}
  
  static getCitiesAndCodes () {
    const newArr = airports.filter(obj => obj.type === 'Airports');
    return newArr.map((obj: any,) => {      
      const value = `${obj.city} (${obj.code})`
      return { value }
    })
  }

  static getCountries () {
    const newArr = countries.filter(obj => {
      if (obj.region === 'Europe' || obj.region == 'Americas')
        return true;
    });
    return newArr.map(obj=> {
      return {value: obj.name, code: obj['alpha-2']}
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