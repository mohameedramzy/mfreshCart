import { Component, OnInit, inject } from '@angular/core';
import { OrdersService } from '../../core/services/orders/orders.service';
import { Iorder } from '../../shared/interfaces/iorder';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports :[DatePipe, CurrencyPipe , CommonModule , TranslatePipe],
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {
  
orders: Iorder[] = [];

  private readonly ordersService = inject(OrdersService);

  constructor() {}

  ngOnInit(): void {
    this.getOrdersData();
  }

  getOrdersData(): void {
    this.ordersService.getAllOrders().subscribe({
      next: (res) => {
this.orders = res
        console.log("📌 Orders Data:", res);
      },
      error: (err) => {
        console.error("❌ Error fetching orders:", err);
      }
    });
  }
}
