import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiserviceService} from '../apiservice.service';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private service:ApiserviceService,private router:ActivatedRoute) { }
  getparamidStock:any;

  ngOnInit(): void {
    this.getparamidStock=this.router.snapshot.paramMap.get('idStock');
    this.service.getSingleData(this.getparamidStock).subscribe((res)=>{
      console.log(res,'res==>');
      this.stockForm.patchValue({
        quantite:res.data[0].quantite,
        nom:res.data[0].nom
      });

    });
  }

  stockForm=new FormGroup({
    'quantite':new FormControl('',Validators.required),
    'nom':new FormControl('',Validators.required)

  });
  stockSubmit()
  {
    if (this.stockForm.valid)
    {
      console.log(this.stockForm.value);
      this.service.createData(this.stockForm.value).subscribe((res)=>{
        console.log(res,'res==>')
        this.stockForm.reset();

      });
    }
    else
    {
      console.log('remplir les champs SVP !!')
    }
  }


  stockUpdate()
  {
    console.log(this.stockForm.value,'updated');
    if(this.stockForm.valid)
    {
      this.service.updatedata(this.stockForm.value,this.getparamidStock).subscribe((res)=>{
        console.log(res,'resupdtaed');
      });
    } else{

    }

  }

}
