import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contacto } from 'src/app/interfaces/contacto';
import { ContactoService } from 'src/app/service/contactos/contacto.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  contacto: Contacto = {
    id: 0,
    nombre: '',
    numero_telefono: '',
    correo_electronico: '',
  };
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private contactoService:ContactoService
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      await this.cargarContacto(parseInt(id));
    }
  }


  async cargarContacto(id: number) {
    const contactos = await this.contactoService.obtenerContactos();
    this.contacto = contactos.find((contacto) => contacto.id === id)!;
  }

  async guardarEdicion() {
    await this.contactoService.actualizarContacto(this.contacto);
    this.router.navigate(['/contactos']); // Redirige de vuelta a la lista de contactos
  }
}
