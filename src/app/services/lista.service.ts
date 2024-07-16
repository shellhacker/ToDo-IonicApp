import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class ListaService {
  public listas: Lista[] = [];
  constructor() { 
    this.cargarStorage();
  }

  crearLista(nombreLista: string){
    let ObjetoLista = new Lista(nombreLista);
    this.listas.push(ObjetoLista);
    this.guardarStorage();
    return ObjetoLista.id;
  }

  guardarStorage() {
    let stringListas: string = JSON.stringify(this.listas);
    localStorage.setItem('listas', stringListas);
  }

  cargarStorage(){
    const listaStorage = localStorage.getItem('listas');
    if(listaStorage == null){
      return this.listas = []
    }
    let objListas: Lista[] = JSON.parse(listaStorage);
    this.listas = objListas;
  }

  borrarLista(lista: Lista){
    let newListas: Lista[] = this.listas.filter((listaItem) => listaItem.id !== lista.id);
    this.listas = newListas;
    this.guardarStorage();
  }

  editarLista(lista: Lista){
    let MatchLista: Lista = this.listas.find((listaItem) => listaItem.id == lista.id);
    MatchLista.titulo = lista.titulo;
    this.guardarStorage();
  }

  obtenerLista(idLista: string | number){
    const id = Number(idLista);
    return this.listas.find((itemLista) => itemLista.id == id);
  }
  
}
