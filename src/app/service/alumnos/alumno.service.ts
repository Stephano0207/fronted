import { AlumnoCreate } from './../../interfaces/alumno_crate';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor(private http:HttpClient) { }
  url:string="http://127.0.0.1:8000/api/alumnos";
  getAll(){
    return this.http.get(this.url);
  }

  create(alumno:AlumnoCreate){
    return this.http.post(this.url,alumno);
  }

  edit(id:number,alumno:AlumnoCreate){
    return this.http.put(`${this.url}/${id}`,alumno);
  }

  getOne(id:number){
    return this.http.get(`${this.url}/${id}`);
  }

  delete(id:number){
    console.log(id);
    return this.http.delete(`${this.url}/${id}`);
  }
}
