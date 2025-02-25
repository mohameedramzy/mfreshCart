import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/caregories/categories.service';
import { Icategory } from '../../shared/interfaces/icategory';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-categories',
  imports: [TranslatePipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {

  private readonly categoriesService = inject(CategoriesService);
  categories:Icategory[] = [];


  ngOnInit(): void {
    this.getcategoryData();
  }

  getcategoryData():void{
    this.categoriesService.getAllCategory().subscribe({
      next: (res) => {
        console.log(res.data);
        this.categories = res.data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
