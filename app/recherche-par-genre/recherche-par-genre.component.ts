import { Component, OnInit } from '@angular/core';
import { Vetement } from '../model/vetement.model';
import { Genre } from '../model/genre.model';
import { VetementService } from '../services/vetement.service';

@Component({
  selector: 'app-recherche-par-genre',
  templateUrl: './recherche-par-genre.component.html',
  styles: ``
})
export class RechercheParGenreComponent {
  vetements! : Vetement[];
   idGenre! : number; 
   genres! : Genre[];

   constructor(private vetementService :VetementService
  ){}
    

  ngOnInit(): void {
    this.vetementService.listeGneres().subscribe(gens => {
        this.genres = gens._embedded.genres; 
        console.log(gens);
    });
}
onChange()
 { this.vetementService.rechercherParGenre(this.idGenre).
   subscribe(vets =>{this.vetements=vets}); }



}
