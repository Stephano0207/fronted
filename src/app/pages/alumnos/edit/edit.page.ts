import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnoCreate } from 'src/app/interfaces/alumno_crate';
import { AlumnoService } from 'src/app/service/alumnos/alumno.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  alumnoForm: FormGroup= this.fb.group({});
  id:number =0;
  constructor(
    private service:AlumnoService,
    private fb:FormBuilder,
    private router:Router,
    private param:ActivatedRoute
  ) { }
  ngOnInit() {
    this.alumnoForm = this.fb.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      edad: ['', [Validators.required]],
    });
    const idParam=this.param.snapshot.paramMap.get('id') ;
    this.id= idParam ? +idParam:0;
  }

  update(){
    if (this.alumnoForm.valid) {
      const alumno: AlumnoCreate = this.alumnoForm.value;
      this.service.edit(this.id,alumno).subscribe(response => {
        console.log('Alumno actualizado con éxito', response);
        // Aquí puedes redirigir o mostrar un mensaje de éxito
        this.router.navigate(["/alumno-inicio"]);
      }, error => {
        console.error('Error al actualizar el alumno', error);
      });
    } else {
      console.log('Formulario no válido');
    }
  }
}
