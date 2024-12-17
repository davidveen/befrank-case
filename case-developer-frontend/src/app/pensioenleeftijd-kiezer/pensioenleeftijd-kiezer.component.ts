import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from '@shared/card.component';
import { EurPipe } from '@shared/eur.pipe';
import { NumberInputComponent } from '@shared/number-input/number-input.component';
import { VerwachteWaardeService } from 'app/verwachte-waarde.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-pensioenleeftijd-kiezer',
  standalone: true,
  imports: [CardComponent, NumberInputComponent, FormsModule, ReactiveFormsModule, EurPipe],
  templateUrl: './pensioenleeftijd-kiezer.component.html',
  styleUrl: './pensioenleeftijd-kiezer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    VerwachteWaardeService
  ]
})
export class PensioenleeftijdKiezerComponent implements OnInit {
  private readonly verwachteWaardeService = inject(VerwachteWaardeService);
  private readonly fb = inject(NonNullableFormBuilder);

  readonly verwachteWaarde = this.verwachteWaardeService.verwachteWaarde;

  protected form = this.fb.group<{ years: number, months: number }>({
    years: 67,
    months: 3
  });

  ngOnInit(): void {
    this.verwachteWaardeService.update(this.form.getRawValue());

    this.form.valueChanges
      .pipe(debounceTime(150))
      .subscribe(() => {
        this.verwachteWaardeService.update(this.form.getRawValue());
      });
  }

}
