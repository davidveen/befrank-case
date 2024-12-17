import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeelnemerService } from './core/deelnemer.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerwachteWaardeService } from './verwachte-waarde.service';
import { CardComponent } from "./shared/card.component";
import { PensioenleeftijdKiezerComponent } from "./pensioenleeftijd-kiezer/pensioenleeftijd-kiezer.component";
import { EurPipe } from '@shared/eur.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CardComponent, PensioenleeftijdKiezerComponent, EurPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    VerwachteWaardeService
  ]
})
export class AppComponent implements OnInit {
  readonly title = 'case-developer-frontend';

  private readonly deelnemerService = inject(DeelnemerService);
  private readonly verwachteWaardeService = inject(VerwachteWaardeService);

  protected readonly pensioenleeftijd = { years: 67, months: 3 };
  protected readonly deelnemer$ = this.deelnemerService.get();
  protected readonly verwachteWaarde = this.verwachteWaardeService.verwachteWaarde;

  ngOnInit(): void {
    this.verwachteWaardeService.update(this.pensioenleeftijd);
  }
}
