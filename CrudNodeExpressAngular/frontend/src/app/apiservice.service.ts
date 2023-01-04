import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private _http:HttpClient) { }

  apiUrl='http://localhost:3000/stock';


getAllData():Observable<any>{
  return this._http.get(`${this.apiUrl}`);
}

createData(data:any):Observable<any>
{
  console.log(data,'createapi=>');

  return this._http.post(`${this.apiUrl}`,data);
}


deletedata(idStock:any):Observable<any>
{
  let ids=idStock;
  return this._http.delete(`${this.apiUrl}/${ids}`);
}


updatedata(data:any,idStock:any):Observable<any>
{
  let ids=idStock;
  return this._http.put(`${this.apiUrl}/${ids}`,data);

}

getSingleData(idStock:any):Observable<any>
{
  let ids=idStock;
  return this._http.get(`${this.apiUrl}/${ids}`);
}

}
