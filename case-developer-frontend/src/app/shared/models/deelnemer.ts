import { DeelnemerData } from "mocks/models";

export type DeelnemerDTO = DeelnemerData
export type Deelnemer = Omit<DeelnemerDTO, 'geboortedatum'> & { geboortedatum: Date }

export function isDeelnemerDTO(value: unknown): value is DeelnemerDTO {
  const deelnemer = value as DeelnemerDTO;
  return typeof deelnemer == 'object'
    && deelnemer
    && 'adres' in deelnemer
    && 'geboortedatum' in deelnemer
    && typeof deelnemer.geboortedatum == 'string';
}