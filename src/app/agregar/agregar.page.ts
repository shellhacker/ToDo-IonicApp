import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lista } from '../models/lista.model';
import { Actividad } from '../models/actividad.model';
import { ListaService } from '../services/lista.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  public lista: Lista;
  nombreItem: string;

  constructor(private router: ActivatedRoute,
    private listaServices: ListaService,
    private alertController: AlertController,
    private toastController: ToastController) {
    let idLista = this.router.snapshot.paramMap.get('idLista');
    this.lista = this.listaServices.obtenerLista(idLista);
    console.log(this.lista);
  }

  ngOnInit() {
  }

  agregar() {
    if (this.nombreItem.length === 0) {
      4
      return
    }

    const actividad = new Actividad(this.nombreItem);
    this.lista.item.push(actividad);
    this.listaServices.guardarStorage();
    console.log(this.nombreItem);
    this.nombreItem = ''
  }

  editar(lista: Lista, actividad: Actividad) {
    console.log("Editar", lista, actividad);
    this.EditarActividad(actividad);
  }

  async EditarActividad(actividad: Actividad) {
    let alerta = await this.alertController.create({
      header: "Editar actividad",
      inputs: [
        {
          type: "text",
          name: "titulo",
          placeholder: "Ingresar nombre de la actividad",
          value: actividad.descripcion
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "Save"
        },
        {
          text: "Editar",
          handler: (data: any) => {
            let isValid: boolean = this.validInput(data);
            if (isValid) {

              let titulo = data.titulo;
              actividad.descripcion = titulo;
              this.listaServices.guardarStorage();
              this.presentToast('Lista editada correctamente!');
            }

          }
        }
      ]
    });
    await alerta.present();
    console.log("Click en el boton");
  }

  validInput(input: any): boolean {
    if (input && input.titulo) {
      return true
    }
    this.presentToast("Please Fill the Field");
    return false;
  }

  async presentToast(mensaje: string): Promise<void> {
    let toast = await this.toastController.create(
      {
        message: mensaje,
        duration: 2000
      }
    );
    toast.present();
  }

  borrar(actividad: Actividad) {
    this.lista.item = this.lista.item.filter(item => item !== actividad);
    this.listaServices.guardarStorage();
    console.log("Eliminar", actividad);
  }

  cambiacheck() {
    const pendientes = this.lista.item.filter(item => item.completado == false).length
    if (pendientes == 0) {
      this.lista.completada = true;
      this.lista.terminadaEn = new Date();
    } else {
      this.lista.completada = false;
      this.lista.terminadaEn = null;
    }

    this.listaServices.guardarStorage();
  }
}
