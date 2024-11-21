import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alumno } from 'src/app/interfaces/alumno';
import { AlumnoCreate } from 'src/app/interfaces/alumno_crate';
import { AlumnoService } from 'src/app/service/alumnos/alumno.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  alumnoForm: FormGroup= this.fb.group({});


  constructor(private service:AlumnoService,
    private fb:FormBuilder,
    private router:Router
  ) { }

  ngOnInit() {
    this.alumnoForm = this.fb.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      edad: ['', [Validators.required]],
    });
  }

  save(){
    if (this.alumnoForm.valid) {
      const alumno: AlumnoCreate = this.alumnoForm.value;
      this.service.create(alumno).subscribe(response => {
        console.log('Alumno registrado con éxito', response);
        // Aquí puedes redirigir o mostrar un mensaje de éxito
        this.router.navigate(["/alumno-inicio"]);
      }, error => {
        console.error('Error al registrar el alumno', error);
      });
    } else {
      console.log('Formulario no válido');
    }
  }

}
