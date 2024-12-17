import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@env';
import { DeelnemerService } from './core/deelnemer.service';

@Injectable()
export class VerwachteWaardeService {
  private readonly http = inject(HttpClient);
  private readonly deelnemerService = inject(DeelnemerService);

  readonly verwachteWaarde = signal<number>(0);

  update(params: { years: number, months: number }) {
    this.http.get<{ verwachteWaarde: number }>(
      `${environment.apiUrl}/verwachte_waarde/${this.deelnemerService.deelnemerId}`,
      { params }
    ).subscribe(({ verwachteWaarde }) => this.verwachteWaarde.set(verwachteWaarde));
  }
}
