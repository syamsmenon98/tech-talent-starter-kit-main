import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import {
  COLOR_GRID_ITEMS,
  ColorGridDto,
  ColorGridSelectComponent,
} from '@brew/ng/ui/components';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,

    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,

    ColorGridSelectComponent,
  ],
  selector: 'brew-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly _fb = inject(FormBuilder);

  public readonly form = this._fb.group({
    search: this._fb.control(''),
    color: this._fb.control(COLOR_GRID_ITEMS[0], {
      validators: [Validators.required],
    }),
  });

  public onFormSubmit(): void {
    const { search } = this.form.getRawValue();
  
    if (search?.toLowerCase()) {
      const matchedColor = this.getColorFromSearch(search);
      if (matchedColor) {
        this.form.get('color')?.setValue(matchedColor);
      }else{
        this.form.get('color')?.setValue(null);
        alert(`No match found for "${search}"`)
      }
    }
    this.form.updateValueAndValidity();
  }
  
  private getColorFromSearch(searchQuery: string): ColorGridDto | null {
    const query = searchQuery.toLowerCase();
  
    for (const item of COLOR_GRID_ITEMS) {
      if (item.name.toLowerCase().includes(query)) {
        return item;
      }
    }
    return null;
  }
}
