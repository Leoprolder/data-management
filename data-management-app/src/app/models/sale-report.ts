import { Agent } from "./agent"
import { Currency } from "./currency"
import { DTS } from "./dts"
import { PointOfSale } from "./point-of-sale"

export interface SaleReport {
    type: string,
    id: number,
    currency: Currency,
    dateAccIn: Date,
    pkind: 0,
    agent: Agent,
    pointOfSale: PointOfSale,
    attrClose: boolean,
    dts: DTS,
    userId: number,
    datInp: Date,
    storno: boolean
}