import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agent } from '../../models/agent';
import { SaleReportResponse } from '../../models/sale-report-response';
import { delay, map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(private _httpClient: HttpClient) {
    }

    public getAgents(): Observable<Agent[]> {
        return this._httpClient.get<Agent[]>('/assets/agents.json').pipe(
            delay(1500),
            map((x: any) => x['agents'] as Agent[])
        );
    }

    public getSaleReports(): Observable<SaleReportResponse> {
        return this._httpClient.get<SaleReportResponse>('/assets/salereports.json').pipe(
            delay(1500)
        );
    }
}
