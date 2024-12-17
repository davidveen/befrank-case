import { Deelnemer } from './deelnemer';
import { DeelnemerData, RekeningData } from "./models";
import data from './data.json';
import { Rekening } from './rekening';

describe('Verwachte waarde', () => {
  let deelnemer: Deelnemer;
  let rekening: Rekening;

  beforeEach(() => {
    deelnemer = new Deelnemer(data.deelnemer.BF1 as DeelnemerData);
    rekening = new Rekening(data.rekening.BF123456789 as RekeningData);
  });

  it('calculates a single year', () => {
    const expected = 104802.68;
    const result = deelnemer.verwachteWaarde(
      { years: 61, months: 0 },
      data.regeling,
      rekening
    );

    expect(result).toBeCloseTo(expected);
  });

  it('calculates multiple years', () => {
    const expected = 125498.08;
    const result = deelnemer.verwachteWaarde(
      { years: 65, months: 0 },
      data.regeling, rekening
    );

    expect(result).toBeCloseTo(expected);
  });
});
