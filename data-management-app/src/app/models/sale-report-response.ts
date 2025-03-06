import { SaleReport } from "./sale-report";

export interface SaleReportResponse {
    count: number;
	limit: number;
	offset: number;
	hasMore: boolean;
	items: SaleReport[];
}