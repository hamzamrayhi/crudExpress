import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  constructor(private service:ApiserviceService) { }

  readData:any;


  ngOnInit(): void {
    this.service.getAllData().subscribe((res)=>{
      console.log(res,"res==>");
      this.readData=res.data;
    });
  }

  deleteid(idStock:any)
  {
    console.log(idStock,'deleteid==>');
    this.service.deletedata(idStock).subscribe((res)=>{
      console.log(res,'deleteres==>');

      this.service.getAllData().subscribe((res)=>{
        console.log(res,"res==>");
        this.readData=res.data;
      });
    });
    
  }

}
