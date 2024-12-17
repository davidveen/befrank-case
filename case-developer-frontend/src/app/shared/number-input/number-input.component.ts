import { ChangeDetectionStrategy, Component, computed, ElementRef, forwardRef, input, viewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-number-input',
  standalone: true,
  imports: [],
  templateUrl: './number-input.component.html',
  styleUrl: './number-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberInputComponent),
      multi: true
    }
  ]
})
export class NumberInputComponent implements ControlValueAccessor {

  readonly step = input<number>(1);
  readonly min = input<number>(1);
  readonly max = input<number>();
  readonly label = input<string>('');

  protected value = 0;
  private readonly input = viewChild<ElementRef>('numberInput');
  private readonly inputElement = computed(() => {
    return this.input()?.nativeElement as HTMLInputElement;
  });

  protected onChange!: (value: number) => void;
  protected onTouched!: (value: number) => void;

  increment() {
    this.inputElement().stepUp();
    this.onChange(Number(this.inputElement().value));
  }

  decrement() {
    this.inputElement().stepDown();
    this.onChange(Number(this.inputElement().value));
  }

  writeValue(value: number): void {
    this.value = value;
  }

  registerOnChange(fn: (_: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: (_: unknown) => void): void {
    this.onTouched = fn;
  }
}
