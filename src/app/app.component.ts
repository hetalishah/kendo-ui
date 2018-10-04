import { Component } from '@angular/core';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
//import { Http, Response } from '@angular/http';
@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent {
   title = 'Hello World!';
   public response: any;
   public gridView: GridDataResult;
  // public response: GridDataResult;
   public pageSize = 10;
   public skip = 0;
   private data: Object[];
   public multiple = false;
   public allowUnsort = true;
   public sort: SortDescriptor[] = [{
     field: 'title',
     dir: 'asc'
   }];



   constructor(private http: HttpClient){ }

   ngOnInit() {}

   show(){     
    let obs=this.http.get('https://jsonplaceholder.typicode.com/todos/');
    obs.subscribe((response)=> {
    this.response= response;
    this.loadItems();
    this.loadProducts();
    console.log(this.response);
    }
    )}



   public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  
}

private loadItems(): void {
    this.gridView = {
        data: this.response.slice(this.skip, this.skip + this.pageSize),
        total: this.response.length
    };

    console.log(this.gridView);
}


public sortChange(sort: SortDescriptor[]): void {
  this.sort = sort;
  this.loadProducts();
}

private loadProducts(): void {
  this.gridView = {
      data: orderBy(this.response, this.sort).slice(this.skip, this.skip + this.pageSize), 
      total: this.response.length
  };

}