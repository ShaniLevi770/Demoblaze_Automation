const { test, expect } = require('../fixtures.js');
const { generateUniqueCredentials } = require('../../helpers/generateCredentials.js');
const testData = require('../../data/testData');


const API_BASE = 'https://api.demoblaze.com';

test.describe('Auth API', () => {
  test('signup with new credentials and then login', async ({ request }) => {
    const { username, password } = generateUniqueCredentials();

    const signup = await request.post(`${API_BASE}/signup`, {
      data: { username, password },
    });
    expect(signup.ok()).toBeTruthy();
    //expect (signup.status()).toBe(201);

    const login = await request.post(`${API_BASE}/login`, {
      data: { username, password },
    });
    expect(login.ok()).toBeTruthy();
    expect (login.status()).toBe(200);
    const raw = await login.text();
    expect(typeof raw).toBe('string');
    expect(raw.startsWith('"Auth_token: ')).toBeTruthy();

  });

  test('login with wrong password returns correct error message', async ({ request }) => {
      
  const { username, password } = testData.wrongPasswordUser;
  const login = await request.post(`${API_BASE}/login`, {
    data: { username, password },
  });

  // would expect a 401 status code for wrong password-
  // but in demoblaze it returns 200 with error message in body
  expect(login.ok()).toBeTruthy();
  expect(login.status()).toBe(200); 

  const raw = await login.text();
  expect(typeof raw).toBe('string');
  expect(raw.includes('"errorMessage":"Wrong password."')).toBeTruthy();
});


});
