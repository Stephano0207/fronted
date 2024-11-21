import { AlumnoService } from 'src/app/service/alumnos/alumno.service';
import { Alumno } from './../../../interfaces/alumno';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  alumnos:Alumno[]=[];
  alumnos_filtrados:Alumno[]=[];

  constructor(private service:AlumnoService) { }

  ngOnInit() {
    this.getAll()
  }

  ionViewWillEnter(){
    this.getAll()
  }

  getAll(){
    this.service.getAll().subscribe(
      (response:any)=>{
        this.alumnos = response;
        this.alumnos_filtrados = response;
      }
    )
  }

  filtrarAlumno(event:any){
    const valorBusqueda = event.target.value;

    if (valorBusqueda && valorBusqueda.trim() !== '') {
      this.alumnos_filtrados=this.alumnos.
        filter((al)=>{
          return al.nombres.toLowerCase().includes(valorBusqueda);

        });
    }else{
      this.alumnos_filtrados=this.alumnos;
    }
  }

  borrar(id:any){
    this.service.delete(id).subscribe((response)=>{
      console.log("Borrardo", response);
      this.getAll();
    });
  }
}
