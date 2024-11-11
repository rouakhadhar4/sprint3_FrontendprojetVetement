import { Component, OnInit } from '@angular/core';
import { Vetement } from '../model/vetement.model';
import { VetementService } from '../services/vetement.service';
import { AuthService } from '../auth.service';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-vetements',
  templateUrl: './vetements.component.html',
})
export class VetementsComponent implements OnInit {
  
  vetements? :Vetement[];
   apiURL: string = 'http://localhost:8078/vetements/api'
  
  

  constructor( private vetementService : VetementService,
    public authService: AuthService)
   {
    //this.vetements = this.vetementService.listeVetements();
   //this.vetements=[];
  }

  ngOnInit(): void {
    
    this.chargerVetements();
  }
  
  /*chargerVetements(): void {
    
    this.vetementService.listeVetements().subscribe(vets => {
      console.log(vets); 
      this.vetements = vets;
      this.vetements .forEach((vet) => { this.vetementService .loadImage(vet.image.idImage) .subscribe((img: Image) => { vet.imageStr = 'data:' + img.type + ';base64,' + img.image; }); }); }); }*/
      /*chargerVetements() {
        this.vetementService.listeVetements().subscribe(prods => {
          //  console.log(prods);
            this.vetements = prods;
      
            this.vetements.forEach((prod) => {
              prod.imageStr = 'data:' + prod.images[0].type + ';base64,' +  prod.images[0].image;
              });
      
     });
    }*/
     chargerVetements(): void {
      this.vetementService.listeVetements().subscribe(vets => {
        this.vetements = vets;
        this.vetements.forEach(vet => {
          if (vet.image && vet.image.idImage) {
            this.vetementService.loadImage(vet.image.idImage).subscribe((img: Image) => {
              vet.imageStr = 'data:' + img.type + ';base64,' + img.image; // Base64 string pour afficher l'image
            });
          }
        });
      });
    }
      
      
  
 supprimerVetement(vet: Vetement) 
 {    //console.log(vet); 
   let conf = confirm("Etes-vous sûr ?"); 
   if (conf) this.vetementService.supprimerVetement(vet.idVetement).subscribe(() => 
    { console.log("Vetement supprimé"); 
      this.chargerVetements()
    });
     
    }

 }

  
  
  

  
  























