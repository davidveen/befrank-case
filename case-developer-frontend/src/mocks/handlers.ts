import { http, HttpResponse } from 'msw';
import { environment } from '@env';
import { Deelnemer } from './deelnemer';
import { Rekening } from './rekening';

import data from './data.json';

const regeling = data.regeling;

function getDeelnemer(deelnemerId: string): Deelnemer {
  // @ts-expect-error - ts rightfully complains that it doesn't really make sense to index into json
  return new Deelnemer(data.deelnemer[deelnemerId]);
}

function getRekening(rekeningnummer: string): Rekening {
  // @ts-expect-error - ts rightfully complains that it doesn't really make sense to index into json
  return new Rekening(data.rekening[rekeningnummer]);
}

export const handlers = [
  http.get(`${environment.apiUrl}/deelnemer/:id`, ({ params }) => {
    const { id } = params;

    let deelnemer;
    try {
      deelnemer = getDeelnemer(id as string);
    } catch {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(deelnemer.info);
  }),

  http.get(`${environment.apiUrl}/verwachte_waarde/:id`, ({ request, params }) => {
    const { id } = params;
    let deelnemer;
    try {
      deelnemer = getDeelnemer(id as string);
    } catch {
      return new HttpResponse(null, { status: 404 });
    }

    const url = new URL(request.url);
    const pensioenLeeftijd = {
      years: Number(url.searchParams.get('years')) || 0,
      months: Number(url.searchParams.get('months')) || 0
    };

    const rekening = getRekening(deelnemer.info.rekeningnummer);
    const verwachteWaarde = deelnemer.verwachteWaarde(pensioenLeeftijd, regeling, rekening);
    return HttpResponse.json({ verwachteWaarde });
  })
];
