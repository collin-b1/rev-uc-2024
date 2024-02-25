// Used to talk to the API
const API_URL = "http://localhost:8080";

export async function getSchedule(userID) {
  return fetch(`${API_URL}/classes/${userID}`).then(async response => await response.json());
}

export function updateSchedule(userID, body) {
  let options = {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: body
  }
  fetch(`${API_URL}/classes/1`, options).then(async response => await response.json());
}