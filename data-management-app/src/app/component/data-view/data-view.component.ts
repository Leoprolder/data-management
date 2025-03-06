import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DataService } from '../../service/data/data.service';
import { SaleReportResponse } from '../../models/sale-report-response';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DatePipe, NgFor } from '@angular/common';
import { Fieldset, FieldsetModule } from 'primeng/fieldset';

@Component({
    selector: 'app-data-view',
    standalone: true,
    templateUrl: './data-view.component.html',
    styleUrl: './data-view.component.scss',
    imports: [
        TableModule,
        ProgressSpinnerModule,
        DatePipe,
        NgFor,
        FieldsetModule
    ],
    providers: [DataService, HttpClient]
})
export class DataViewComponent implements OnInit {
    public data: SaleReportResponse | undefined;
    public cols: any[] = [
        {
            header: "Дата отчета",
            field: "dateAccIn"
        },
        {
            header: "ID отчета",
            field: "id"
        },
        {
            header: "Валюта",
            field: "currency.code"
        },
        {
            header: "Агент",
            field: "agent.code"
        },
        {
            header: "Точка продажи",
            field: "pointOfSale.code"
        },
        {
            header: "Источник данных",
            field: "dts.code"
        },
        {
            header: "Сторно",
            field: "storno"
        },
    ];

    constructor(private _dataService: DataService) {
    }

    ngOnInit() {
        this._dataService.getSaleReports().subscribe((data) => {
            this.data = data;
        });
    }

    public getRowValue(rowData: any, colField: string) {
        if (colField.includes('.')) {
            const fields = colField.split('.');
            let value = rowData;
            for (let i = 0; i < fields.length; i++) {
                value = value[fields[i]];
            }
            return value;
        }
        return rowData[colField];
    }

    isDate(value: any): boolean {
        if (value instanceof Date) {
            return true;
        }
        if (typeof value === 'string') {
            const parsedDate = Date.parse(value);
            return !isNaN(parsedDate);
        }
        return false;
    }
}
