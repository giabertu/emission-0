
export class Service {
  static diet: number = 0;
  static travels: number = 0;
  static electricity: number = 0;

  constructor() {}

  //not setting them 'possibly undefined' because they are defined with default values.
  static calcDietFooprint(dietInfo: {dietChoice: string, coffeeDrinker: boolean, consumption: number}) {
    let yearlyCarbonFootprintKg = 0;
    const {dietChoice, coffeeDrinker, consumption} = dietInfo;
    console.log('Here is the value of coffeeDrinker: ', coffeeDrinker)
    switch (dietChoice) {
      case 'Omnivore':
        yearlyCarbonFootprintKg = 700;
        if (consumption) {
          const yearlyConsumptionKg = (consumption * 4.25 * 12) / 1000;
          const consumptionCarbonFootprint = yearlyConsumptionKg * 30;
          yearlyCarbonFootprintKg += consumptionCarbonFootprint; 
        }
        break;
      case 'Vegetarian': 
        yearlyCarbonFootprintKg = 1300;
        if (consumption) {
          const yearlyConsumptionKg = (consumption * 4.25 * 12) / 1000;
          const consumptionCarbonFootprint = yearlyConsumptionKg * 15;
          yearlyCarbonFootprintKg += consumptionCarbonFootprint; 
        }
        break;
      case 'Vegan':
        yearlyCarbonFootprintKg = 1400;
        break;
      default:
        yearlyCarbonFootprintKg = 0;
    }
    //based on coffee usage, add kilos of CO2
    if (coffeeDrinker) {
      //One cup filled with ground or whole bean coffee weighs roughly  10 grams. 10g === 0.010
      //The average coffee drinker drinks around 2 cups a day
      const yearlyCoffeeConsumptionKg = ((10 * 2) * 30 * 12) / 1000;

      //convert in CO2 kg 
      const coffeeCarbonFootprint = yearlyCoffeeConsumptionKg * 17;
      yearlyCarbonFootprintKg += coffeeCarbonFootprint;
    }
    Service.diet = Math.floor(yearlyCarbonFootprintKg);
    return Service.diet;

  }

  static calcTravelsFootprint() {

  }

  static calcElectricityFootprint() {

  }

  static calcTotalFootprint() {
    return Service.electricity + Service.diet + Service.travels;
  }

}