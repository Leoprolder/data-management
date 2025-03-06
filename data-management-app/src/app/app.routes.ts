import { Routes } from '@angular/router';
import { DataViewComponent } from './component/data-view/data-view.component';
import { ReportViewComponent } from './component/report-view/report-view.component';

export const routes: Routes = [
    { path: 'table', component: DataViewComponent },
    { path: 'chart', component: ReportViewComponent },
    { path: '**', redirectTo: 'table' }
];
