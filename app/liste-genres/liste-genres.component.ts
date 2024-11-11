import { Component, OnInit } from '@angular/core';
import { Genre } from '../model/genre.model';
import { VetementService } from '../services/vetement.service';

@Component({
  selector: 'app-liste-genres',
  templateUrl: './liste-genres.component.html',
  styles: ``
})
export class ListeGenresComponent implements OnInit {
 
  genres! : Genre[];
  ajout:boolean=true;
  updatedGn:Genre = {"idGenre":0,"nomGenre":""};
constructor(private vetementService  : VetementService ) { }
ngOnInit(): void {
  this.chargergenre(); 

  
}

chargergenre()
{
  this.vetementService.listeGneres().
subscribe(gen => {this.genres = gen._embedded.genres;
console.log(gen);
});
}

genreUpdated(gen: Genre): void {
  console.log("genre recue du composant updated  de compsant genre",gen);
  this.vetementService.ajouterGenre(gen).
 subscribe( ()=> this.chargergenre());

}
updategn(gn:Genre){
  this.updatedGn=gn;
  this.ajout=false;

}



}
