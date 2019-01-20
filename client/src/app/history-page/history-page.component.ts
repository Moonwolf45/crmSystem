import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from "rxjs";

import { MaterialInstance, MaterialService } from "../shared/classes/material.service";
import { OrdersService } from "../shared/services/orders.service";
import { Filter, Order } from "../shared/interfaces";


const STEP = 10;

@Component({
    selector: 'app-history-page',
    templateUrl: './history-page.component.html',
    styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('tooltip') tooltipRef: ElementRef;
    tooltip: MaterialInstance;
    hSub: Subscription;
    isFilterVisible = false;

    offset = 0;
    limit = STEP;

    orders: Order[] = [];
    filter: Filter = {};
    loading = false;
    reLoading = false;
    noMoreOrders = false;

    constructor(private ordersService: OrdersService) {}

    ngOnInit() {
        this.reLoading = true;
        this.fetch();
    }

    private fetch() {
        const params = Object.assign({}, this.filter, {
            offset: this.offset,
            limit: this.limit
        });
        this.hSub = this.ordersService.fetch(params).subscribe(orders => {
            this.orders = this.orders.concat(orders);
            this.noMoreOrders = orders.length < STEP;
            this.loading = false;
            this.reLoading = false;
        });
    }

    ngAfterViewInit() {
        this.tooltip = MaterialService.initTooltip(this.tooltipRef);
    }

    ngOnDestroy() {
        this.tooltip.destroy();
        this.hSub.unsubscribe();
    }

    loadMore() {
        this.loading = true;
        this.offset += STEP;
        this.fetch();
    }

    applyFilter(filter: Filter) {
       this.orders = [];
       this.offset = 0;
       this.filter = filter;
       this.reLoading = true;
       this.fetch();
    }

    isFiltered(): boolean {
        return Object.keys(this.filter).length !== 0;
    }


}
