import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DataService } from '../../service/data/data.service';
import { SaleReportResponse } from '../../models/sale-report-response';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { DatePicker, DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { Agent } from '../../models/agent';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { BehaviorSubject, filter, Observable, tap } from 'rxjs';
import { InputText } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';

interface Filter {
    rangeDates: Date[];
    pointOfSale: string;
    agent: Agent | undefined;
    dts: string;
}

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
        DatePickerModule,
        DatePicker,
        CommonModule,
        FormsModule,
        FloatLabelModule,
        SelectModule,
        InputText,
        ButtonModule
    ],
    providers: [DataService, HttpClient]
})
export class DataViewComponent implements OnInit {
    public data: SaleReportResponse | undefined;
    public filteredData: SaleReportResponse | undefined;
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
    public filter: Filter = {
        rangeDates: [],
        pointOfSale: "",
        dts: "",
        agent: undefined
    };
    public dts: string[] = [
        "SIR_2000",
        "EMM",
        "INP"
    ];
    public agents$: BehaviorSubject<Agent[]> = new BehaviorSubject<Agent[]>([]);

    constructor(private _dataService: DataService) {
        this._dataService.getAgents().pipe(
            filter(x => !!x)
        ).subscribe(this.agents$);
    }

    ngOnInit() {
        this._dataService.getSaleReports().subscribe((data) => {
            this.data = data;
            this.filteredData = {...data};
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

    public isDate(value: any): boolean {
        if (value instanceof Date) {
            return true;
        }
        if (typeof value === 'string') {
            const parsedDate = Date.parse(value);
            return !isNaN(parsedDate);
        }
        return false;
    }

    public applyFilter(): void {
        this.filteredData = {...(this.data as SaleReportResponse)};
        if (!this.filteredData) {
            return;
        }

        if (this.filter.agent != undefined) {
            this.filteredData.items = this.filteredData.items
                .filter(x => x.agent.code.toLowerCase().includes(!!this.filter.agent ? this.filter.agent.code.toLowerCase() : ""));
        }

        if (this.filter.dts) {
            this.filteredData.items = this.filteredData.items
                .filter(x => x.dts.code.toLowerCase().includes(this.filter.dts.toLowerCase()));
        }

        if (this.filter.pointOfSale) {
            this.filteredData.items = this.filteredData.items
                .filter(x => x.pointOfSale.name.toLowerCase().includes(this.filter.pointOfSale.toLowerCase()));
        }

        if (!!this.filter.rangeDates.length) {
            this.filteredData.items = this.filteredData.items
                .filter(x => {
                    const date = new Date(x.dateAccIn);
                    return date >= this.filter.rangeDates[0] && date <= this.filter.rangeDates[1];
                })
        }
    }

    public resetFilter(): void {
        this.filter = {
            rangeDates: [],
            pointOfSale: "",
            dts: "",
            agent: undefined
        };
        this.filteredData = {...(this.data as SaleReportResponse)};
    }
}
