import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env';
import { Deelnemer } from '@shared/models';

@Injectable({
  providedIn: 'root'
})
export class DeelnemerService {
  private readonly http = inject(HttpClient);

  readonly deelnemerId = 'BF1';

  get() {
    return this.http.get<Deelnemer>(`${environment.apiUrl}/deelnemer/${this.deelnemerId}`);
  }
}
