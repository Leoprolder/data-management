import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data/data.service';
import { ChartModule } from 'primeng/chart';
import { DatePickerModule } from 'primeng/datepicker';
import { SaleReportResponse } from '../../models/sale-report-response';

interface GroupedData {
    date: Date;
    sales: number;
}

@Component({
    selector: 'app-report-view',
    imports: [
        DatePickerModule,
        ChartModule
    ],
    templateUrl: './report-view.component.html',
    styleUrl: './report-view.component.scss'
})
export class ReportViewComponent implements OnInit {
    public data: SaleReportResponse | undefined;
    public chartData: any;
    public options: any;
    public filteredData: SaleReportResponse | undefined;

    constructor(private _dataService: DataService) { }

    ngOnInit(): void {
        this._dataService.getSaleReports().subscribe(x => {
            this.data = x;
            this.filteredData = x;

            this.initChart();
        });
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--p-text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
        const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

        const groupedData = this._getGroupedData();

        this.chartData = {
            labels: groupedData.map(x => x.date.toLocaleDateString()),
            datasets: [
                {
                    label: 'Продажи',
                    data: groupedData.map(x => x.sales),
                    backgroundColor: groupedData.map(x =>
                        `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`
                    ),
                    borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`,
                    borderWidth: 1,
                },
            ],
        };

        this.options = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                    },
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                    },
                },
            },
        };
    }

    private _getGroupedData(): GroupedData[] {
        let groupedData: GroupedData[] = [];
        const items = (this.data as SaleReportResponse).items;
        for (let i = 0; i < items.length; i++) {
            let report = items[i];
            let reportDate = new Date(report.dateAccIn);

            let normalizedDate = new Date(reportDate.getFullYear(), reportDate.getMonth(), reportDate.getDate());

            let existingData = groupedData.find(x =>
                x.date.getTime() === normalizedDate.getTime()
            );

            if (!!existingData) {
                existingData.sales += 1;
            }
            else {
                groupedData.push({
                    date: normalizedDate,
                    sales: 1
                });
            }
        }

        return groupedData;
    }
}
