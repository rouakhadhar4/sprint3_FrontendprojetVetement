import { Component, OnInit } from '@angular/core';
import { Vetement } from '../model/vetement.model';
import { VetementService } from '../services/vetement.service';
import { Genre } from '../model/genre.model';
import { Router } from '@angular/router';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-add-vetement',
  templateUrl: './add-vetement.component.html',

})
export class AddVetementComponent implements OnInit {

  newVetement = new Vetement();
  //message: string = '';
  genres!: Genre[];
  newIdGenre!: number;
  newGenre!: Genre;
  uploadedImage!: File; imagePath: any;


  constructor(private vetementService: VetementService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    //this.genres = this.vetementService.listeGenres();
    this.vetementService.listeGneres().subscribe(gens => {
      this.genres = gens._embedded.genres;
      console.log(gens);
    });

    console.log('VetementsComponent initialized');
  }

  /*addVetement() {
    this.newVetement.genre = this.genres.find(genre => genre.idGenre == this.newIdGenre)!;
    this.vetementService.ajouterVetement(this.newVetement).subscribe(vet => {
      console.log(vet);
      this.router.navigate(['vetements']);
    });*/
   
          addVetement(){ this.newVetement.genre = this.genres.find(cat => cat.idGenre == this.newIdGenre)!; this.
            vetementService .ajouterVetement(this.newVetement) .subscribe((prod) => { this.vetementService .uploadImageFS(this.uploadedImage, this.uploadedImage.name,prod.idVetement) 
              .subscribe((response: any) => {} ); this.router.navigate(['vetements']); }); }
    
  
  
  

//this.message="Vetement: " +this.newVetement.nomVetement + "   ajouter avec sucées !!"

onImageUpload(event: any) {
     this.uploadedImage = event.target.files[0];
      var reader = new FileReader(); reader.readAsDataURL(this.uploadedImage); 
      reader.onload = (_event) => { this.imagePath = reader.result; } }


}
