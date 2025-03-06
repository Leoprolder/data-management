import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Component, importProvidersFrom } from '@angular/core';

@Component({
  selector: 'app-data-view',
  standalone: true,
  templateUrl: './data-view.component.html',
  styleUrl: './data-view.component.scss',
})
export class DataViewComponent {

}
