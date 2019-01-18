import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";

import { PositionsService } from "../../shared/services/positions.service";
import { Position } from "../../shared/interfaces";
import { OrderService } from "../order.service";
import { MaterialService } from "../../shared/classes/material.service";


@Component({
    selector: 'app-order-positions',
    templateUrl: './order-positions.component.html',
    styleUrls: ['./order-positions.component.css']
})
export class OrderPositionsComponent implements OnInit {

    positions$: Observable<Position[]>;

    constructor(private route: ActivatedRoute, private positionsService: PositionsService, private orderService: OrderService) {}

    ngOnInit() {
        this.positions$ = this.route.params.pipe(
            switchMap((params: Params) => {
                return this.positionsService.fetch(params['id']);
            }),
            map((positions: Position[]) => {
                return positions.map(position => {
                    position.quantity = 1;
                    return position;
                })
            })
        );
    }

    addToOrder(position: Position) {
        MaterialService.toast(`Добавлен ${position.name} в кол-ве ${position.quantity} шт.`);
        this.orderService.add(position);
    }

}
