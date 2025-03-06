import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DataViewComponent } from '../data-view/data-view.component';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        DataViewComponent,
        MenubarModule
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    constructor(private _router: Router) { }

    public items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Отображение данных',
                icon: 'pi pi-table',
                command: () => {
                    this._router.navigate(['/table']);
                }
            },
            {
                label: 'Отчёт',
                icon: 'pi pi-chart-scatter',
                command: () => {
                    this._router.navigate(['/chart']);
                }
            }
        ]
    }
}
