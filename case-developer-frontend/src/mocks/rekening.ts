import { RekeningData } from './models';

export class Rekening {
  #data: RekeningData;

  constructor(rekening: RekeningData) {
    this.#data = rekening;
  }

  get jaarlijksRendement() {
    return this.#data.jaarlijksRendement;
  }

  get huidigeWaarde() {
    return this.#data.fondsen.reduce((acc, { waarde }) => acc + waarde, 0);
  }
}