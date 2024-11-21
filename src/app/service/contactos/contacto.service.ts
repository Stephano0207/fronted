import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Contacto } from 'src/app/interfaces/contacto';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  private _storage: Storage | null = null;
  private readonly CONTACTOS_KEY = "contactos"; // Clave de almacenamiento
  constructor(private storage: Storage) {
    this.init();
   }

   async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
    console.log('Ionic Storage inicializado');
  }

    // Obtener todos los contactos
    async obtenerContactos(): Promise<Contacto[]> {
      if (!this._storage) {
        await this.init(); // Asegúrate de inicializar antes de acceder
      }
      const contactos = (await this._storage?.get(this.CONTACTOS_KEY)) || [];
      console.log('Contactos desde Storage:', contactos);
      return contactos;
    }

     // Guardar un nuevo contacto
  async agregarContacto(contacto: Contacto) {
    const contactos = await this.obtenerContactos();
    contactos.push(contacto);
    await this._storage?.set(this.CONTACTOS_KEY, contactos);
  }

  // Editar un contacto existente
  async editarContacto(id: number, contactoActualizado: Contacto) {
    const contactos = await this.obtenerContactos();
    const index = contactos.findIndex((c) => c.id === id);
    if (index !== -1) {
      contactos[index] = contactoActualizado;
      await this._storage?.set(this.CONTACTOS_KEY, contactos);
    }
  }

    // Actualizar un contacto
    async actualizarContacto(contacto: Contacto): Promise<void> {
      const contactos = await this.obtenerContactos();

      // Buscar el índice del contacto en el array
      const index = contactos.findIndex(c => c.id === contacto.id);

      // Si el contacto existe, lo actualizamos
      if (index !== -1) {
        contactos[index] = contacto; // Reemplazamos el contacto con los nuevos valores
        await this._storage?.set(this.CONTACTOS_KEY, contactos); // Guardamos los cambios
      }
    }

   // Eliminar un contacto
   async eliminarContacto(id: number) {
    const contactos = await this.obtenerContactos();
    const contactosFiltrados = contactos.filter((c) => c.id !== id);
    await this._storage?.set(this.CONTACTOS_KEY, contactosFiltrados);
  }
}
