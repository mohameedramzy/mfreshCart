import { BrandsService } from './../../core/services/brands/brands.service';
import { Component, inject } from '@angular/core';
import { Icategory } from '../../shared/interfaces/icategory';
import { Ibrand } from '../../shared/interfaces/ibrand';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-brands',
  imports: [TranslatePipe],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {


    private readonly brandsService = inject(BrandsService);

    brands:Ibrand[] = [];
  
  
    ngOnInit(): void {
      this.getBrandsData();
    }
  
    getBrandsData():void{
      this.brandsService.getAllBrands().subscribe({
        next: (res) => {
          console.log(res.data);
          this.brands = res.data;

        },
        error: (error) => {
          console.log(error);
        }
      });
    }
}
