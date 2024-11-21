import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contacto } from 'src/app/interfaces/contacto';
import { ContactoService } from 'src/app/service/contactos/contacto.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  alumnoForm: FormGroup = this.fb.group({});
  contactos: Contacto[] = [];

  constructor(
    private contactoService: ContactoService,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  async cargarContactos() {
    this.contactos = await this.contactoService.obtenerContactos();
    console.log('Contactos cargados en cargarContactos:', this.contactos);
  }

  async ngOnInit() {
    await this.cargarContactos();

    this.alumnoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      numero_telefono: ['', [Validators.required]],
      correo_electronico: ['', [Validators.required]],
    });

  }

  async save() {
    if (this.alumnoForm.valid) {
      const contacto: Contacto = this.alumnoForm.value;
      contacto.id = Date.now();
      await this.contactoService.agregarContacto(contacto);

      // Actualizar lista y limpiar formulario
      this.contactos = await this.contactoService.obtenerContactos();
      // this.router.navigate(["/contacto-inicio"]);
    }
  }

  async eliminarContacto(id: number) {
    await this.contactoService.eliminarContacto(id);
    this.contactos = await this.contactoService.obtenerContactos();
  }
}
