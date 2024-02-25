// Used to talk to the API
const API_URL = "http://localhost:8080";

export async function getSchedule(userID) {
  let result = await fetch(`${API_URL}/classes/${userID}`).then(async response => (await response.json()));
  if(result.length > 0) {
    return JSON.parse(result[0].classes);
  }
  return [];
}

export function updateSchedule(userID, body) {
  let options = {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }
  fetch(`${API_URL}/classes/${userID}`, options).then(async response => await response.json());
}