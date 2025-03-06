import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DataService } from '../../service/data/data.service';
import { SaleReportResponse } from '../../models/sale-report-response';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-data-view',
    standalone: true,
    templateUrl: './data-view.component.html',
    styleUrl: './data-view.component.scss',
    imports: [TableModule, ProgressSpinnerModule, DatePipe],
    providers: [DataService, HttpClient]
})
export class DataViewComponent implements OnInit {
    public data: SaleReportResponse | undefined;

    constructor(private _dataService: DataService) {
    }

    ngOnInit() {
        this._dataService.getSaleReports().subscribe((data) => {
            this.data = data;
        });
    }
}
