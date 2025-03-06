import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agent } from '../../models/agent';
import { SaleReportResponse } from '../../models/sale-report-response';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(private _httpClient: HttpClient) {
    }

    public getAgents(): Observable<Agent[]> {
        return this._httpClient.get<Agent[]>('/assets/data/agents.json');
    }

    public getSaleReports(): Observable<SaleReportResponse> {
        return this._httpClient.get<SaleReportResponse>('/assets/data/salereports.json');
    }
}
