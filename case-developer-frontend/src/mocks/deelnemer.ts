import { Age, DeelnemerData, Regeling } from "./models";
import type { Rekening } from './rekening';
import { intervalToDuration, parse } from "date-fns";
import { UTCDate } from "@date-fns/utc";
import { ageToMonths } from "./helpers";

export class Deelnemer {
  #data: DeelnemerData;

  constructor(deelnemer: DeelnemerData,) {
    this.#data = deelnemer;
  }

  get info() {
    return this.#data;
  }

  get currentAge() {
    const geboortedatum = parse(this.#data.geboortedatum, 'yyyy-MM-dd', new UTCDate());
    const duration = intervalToDuration({ start: geboortedatum, end: new UTCDate() });
    return {
      years: duration!.years || 0,
      months: duration.months || 0
    };
  }

  verwachteWaarde(pensioenleeftijd: Age, regeling: Regeling, rekening: Rekening) {
    const maandenOpbouw = ageToMonths(pensioenleeftijd) - ageToMonths(this.currentAge);
    if (maandenOpbouw <= 0) { return rekening.huidigeWaarde; }

    const jaarlijksePremie = this.jaarlijksePremie(regeling);
    return opbouw(rekening.huidigeWaarde, maandenOpbouw);

    // This is correct for full years, but approximates partial years :)
    function opbouw(waarde: number, maanden: number) {
      if (maanden <= 0) {
        return waarde;
      }

      const periode = Math.min(maanden, 12);
      const periodePremie = jaarlijksePremie / 12 * periode;

      return opbouw(
        waarde +
        periodePremie +
        (waarde + periodePremie / 2) *
        (rekening.jaarlijksRendement / 100),
        maanden - periode
      );
    }
  }

  private jaarlijksePremie(regeling: Regeling) {
    if (this.#data.status !== 'actief') { return 0; }

    return (this.#data.fulltimeSalaris - regeling.franchise) *
      (this.#data.parttimePercentage / 100) *
      (regeling.beschikbarePremiePercentage / 100);
  }
}