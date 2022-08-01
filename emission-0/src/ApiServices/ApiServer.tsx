

export class ApiServer {

  static URL = `http://127.0.0.1:3005`

  constructor() {}

  static async postFootprint(footprint: number) {
    console.log(footprint)
    const res = await fetch(`${ApiServer.URL}/footprints`, {
      method: "POST",
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({footprint}),
    })
    const doc = await res.json();
    return doc;
  }

  static async getFootprints() {
    const res = await fetch(`${ApiServer.URL}/footprints`)
    const footprintsArray = res.json();
    return footprintsArray; 
  }

  
}