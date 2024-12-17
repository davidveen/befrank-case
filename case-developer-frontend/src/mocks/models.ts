export interface Regeling {
  franchise: number
  beschikbarePremiePercentage: number
}

export interface Age {
  years: number
  months: number
}

export interface Adres {
  straat: string
  huisnummer: string
  postcode: string
  plaats: string
}

export interface Naam {
  achternaam: string
  initialen: string
  voornaam: string
}

export interface Fonds {
  naam: string
  waarde: number
}

export interface RekeningData {
  id: string
  fondsen: Fonds[]
  rekeningnummer: string
  huidigeWaarde: number
  jaarlijksRendement: number
}

export interface DeelnemerData {
  id: string
  rekeningnummer: string
  adres: Adres
  email: string
  fulltimeSalaris: number
  geboortedatum: string
  naam: Naam
  parttimePercentage: number
  status: 'actief' | 'inactief' | 'gepensioneerd'
};