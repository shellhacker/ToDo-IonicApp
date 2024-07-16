import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';
import { ListaService } from 'src/app/services/lista.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @Input() tipo: string;

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    public listaService: ListaService,
    private router: Router
  ) { }

  ngOnInit() { }

  async AgregarLista() {
    let alerta = await this.alertController.create(
      {
        header: "Enter Details",
        inputs: [
          {
            type: "text",
            name: "titulo",
            placeholder: "Enter your details"
          }
        ],
        buttons: [
          {
            text: "Cancel",
            role: "Save"
          },
          {
            text: "Crear",
            handler: (data: any) => {
              let isValid: boolean = this.validInput(data);
              if (isValid) {
                let titulo = data.titulo;
                let wasCreated = this.listaService.crearLista(titulo);
                if (wasCreated) {
                  this.presentToast("Text field is empty");
                }
              }
            }
          }
        ]
      });
    await alerta.present();
    console.log("Hice click!!");
  }

  validInput(input: any): boolean {
    if (input && input.titulo) {
      return true;
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

  borrarLista(listaItem: Lista) {
    this.listaService.borrarLista(listaItem);
  }

  async editarLista(listaItem: Lista) {
    let alerta = await this.alertController.create({
      header: "Editar lista",
      inputs: [
        {
          type: "text",
          name: "titulo",
          placeholder: "Ingresar nombre de la lista",
          value: listaItem.titulo
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
              listaItem.titulo = titulo;
              this.listaService.editarLista(listaItem);
              this.presentToast('Lista editada correctamente!');
            }
          }
        }
      ]
    });
    await alerta.present();
    console.log("Click en el boton");
  }

  listaSeleccionada(listaItem: Lista) {
    console.log(listaItem);
    const URL = '/agregar/' + listaItem.id;
    this.router.navigateByUrl(URL);
  }

}
