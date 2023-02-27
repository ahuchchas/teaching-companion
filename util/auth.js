import axios from "axios";

const API_KEY = "AIzaSyCe1itW4f_Z_KQih2gai9co6zIJ21hh2AM";
let TOKEN = "";

export async function getUserId() {
  //get user id
  const url2 = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`;
  const response2 = await axios.post(url2, { idToken: TOKEN });
  const userId = response2.data.users[0].localId;

  return userId;
}

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;
  TOKEN = token;

  return token;
}

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}
