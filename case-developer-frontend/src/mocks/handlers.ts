import { http, HttpResponse } from 'msw';
import { DeelnemerDTO } from '@shared/models';

const baseURL = 'https://api.befrank-case.nl';

const fakeDeelnemer = {
  adres: {
    straat: "Test",
    huisnummer: "1a",
    plaats: "Utrecht",
    postcode: "1111aa"
  },
  email: "waldo@pm.me",
  fulltimeSalaris: 5000,
  geboortedatum: "1991-03-17",
  naam: {
    achternaam: 'Bar',
    initialen: 'W.A.',
    voornaam: 'Waldo',
  },
  parttimePercentage: 80
} as DeelnemerDTO;

export const handlers = [
  http.get(`${baseURL}/deelnemer`, () => {
    return HttpResponse.json(fakeDeelnemer);
  })
];