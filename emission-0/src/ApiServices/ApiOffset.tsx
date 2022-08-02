export class ApiOffset {

  static BASE_URL = 'https://api.corrently.io/v2.0'
  static HEADERS_CONFIG = {
    'accept' : 'application/json',
    'Content-Type': 'application/json'
  }

  constructor() {}

  static async getPrice(footprint: number) {
    //The api calculates price offset using kwh usage for some reason.
    //Therefore, we convert the CO2 value that we have to kwh.
    const kwh = ApiOffset.calcKwhFromCO2(footprint);
    
    const res = await fetch(`${ApiOffset.BASE_URL}/co2/price?c02=${footprint * 1000}&kwh=${kwh}`)
    const estimate = await res.json();
    return estimate;
  }

  static async getCompensate(footprint: number) {
    const kwh = ApiOffset.calcKwhFromCO2(footprint);
    
    const res = await fetch(`${ApiOffset.BASE_URL}/co2/compensate?c02=${footprint * 1000}&kwh=${kwh}`)
    const estimate = await res.json();
    return estimate; 
  }
  
  static calcKwhFromCO2 (footprint: number) {
    //To get kwh usage equivalent from CO2-kg emissions, we divide by 0.23314.
    //https://www.rensmart.com/Calculators/KWH-to-CO2
    const kwh = footprint / 0.23314;
    return kwh;
  }

}