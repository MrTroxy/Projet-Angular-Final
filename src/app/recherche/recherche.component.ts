import { Component, NgModule, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

// Modèle d'un Bateau
export class Bateau {
  constructor(
    public ref: string,
    public name: string
  ) {
  }
}

// Informations du composant
@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})

// Tous les export de la classe RechercheComponent
export class RechercheComponent implements OnInit {
  bateaux = new Array;

  // Informations des recherche
  reference: string = "";
  longueurm: string = "";
  gvl: string = "";
  gvsl: string = "";
  gve: string = "";
  gm: string = "";
  ge: string = "";
  ss: string = "";
  sa: string = "";
  gs: string = "";

  // Permet d'afficher la partie des voiles ou non
  showVoiles: boolean = false;

  nomVoiles = new Array(23);
  descriptionVoiles = new Array(23);
  prixVoiles = new Array(23);

  constructor(
    private httpClient: HttpClient) {
  }

  ngOnInit(): void {
  }

  // Fonction qui permet de rechercher la liste des bateaux selon le nom
  getBateau(event:any){
    let input = event.target.value;
    this.httpClient.get<any>('https://iwa2021.edriki.com/api/Boat/Search/'+input).subscribe(
      respond => {
        console.log(respond.response.datas);
        this.bateaux = respond.response.datas;

      }
    );
  }

  // Fonction qui permet de chercher les mesures selon la référence du bateau
  clickBateau(refBateau:string){
    this.longueurm = this.gvl = this.gvsl = this.gve = this.gm = this.ge = this.ss = this.sa = this.gs = "Recherche...";

      this.httpClient.get<any>('https://iwa2021.edriki.com/api/Boat/ByRef/'+refBateau).subscribe(
      respond => {
        console.log(respond.response.datas);
        this.longueurm = respond.response.datas.lengthm;
        this.gvl = respond.response.datas.sails.gvl;
        this.gvsl = respond.response.datas.sails.gvsl;
        this.gve = respond.response.datas.sails.gve;
        this.gm = respond.response.datas.sails.gm;
        this.ge = respond.response.datas.sails.ge;
        this.ss = respond.response.datas.sails.ss;
        this.sa = respond.response.datas.sails.sa;
        this.gs = respond.response.datas.sails.gs;
      }
    );
    this.reference = refBateau;
  }

  // Fonction qui permet de rechercher les prix des voiles selon les mesures entrées
  RecherchePrix(){
    this.httpClient.get<any>('https://iwa2021.edriki.com/api/Item/Items?length='+this.longueurm+'&gvl='+this.gvl+'&gvsl='+this.gvsl+'&gve='+this.gve+'&gm='+this.gve+'&ge='+this.ge+'&ss='+this.ss+'&sa='+this.sa+'&gs='+this.gs).subscribe(
      respond => {
        //console.log(respond.response.datas);

        for (let i = 0; i < 23; i++){
          this.nomVoiles[i] = respond.response.datas[i].name;
          this.descriptionVoiles[i] = respond.response.datas[i].description;
          this.prixVoiles[i] = respond.response.datas[i].price.unitPrice;
        }
        this.showVoiles = true;
      }
    );
  }

}
