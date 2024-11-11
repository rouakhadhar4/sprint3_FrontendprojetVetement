import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VetementService } from '../services/vetement.service';
import { Vetement } from '../model/vetement.model';
import { Genre } from '../model/genre.model';
import { Image } from '../model/image.model';


@Component({
  selector: 'app-update-vetement',
  templateUrl: './update-vetement.component.html',
  styles: ``
})
export class UpdateVetementComponent implements OnInit {
  currentVetement = new Vetement();
  genres!: Genre[];
  updatedgnId!: number;
  myImage! : string;
  uploadedImage!: File; isImageUpdated: Boolean=false;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private vetementService: VetementService) {

  }
 
  
  ngOnInit(): void {
    this.vetementService.listeGneres().
    subscribe(cats => {this.genres = cats._embedded.genres;
    console.log(cats);
    });


    this.vetementService.consulterVetement(this.activatedRoute.snapshot.params['id']).
    subscribe( prod =>{ this.currentVetement = prod; 
    
      this.updatedgnId =   this.currentVetement.genre.idGenre;
      console.log("genreeeeeee "+this.updatedgnId);
    
    } ) ;
    }
  
 /* updateVetement() {
    //console.log(this.currentVetement);
   // this.currentVetement.genre=this.vetementService.consulterGenre(this.updatedgnId);

   this.currentVetement.genre= this.genres.find(gn => gn. idGenre == this.updatedgnId)!;
   this.vetementService.updateVetement(this.currentVetement).subscribe
   (vet => { this.router.navigate(['vetements']); } );


  }*/
   /*updateVetement() {
    this.currentVetement.genre = this.genres.find(gn => gn.idGenre == this.updatedgnId)!;
    
    //tester si l'image du produit a été modifiée 
    if (this.isImageUpdated) { this.vetementService .uploadImage(this.uploadedImage, this.uploadedImage.name)
       .subscribe((img: Image) => { this.currentVetement.image = img; this.vetementService .updateVetement(this.currentVetement) .
      subscribe((vet) => { this.router.navigate(['vetements']); }); }); }
       else{ this.vetementService .updateVetement
        (this.currentVetement) .subscribe((vet) => { this.router.navigate(['vetements']); }); }
    







   }*/
        updateVetement() {
           this.currentVetement.genre = this.genres.find(
            gn => gn.idGenre == this.updatedgnId)!; this.vetementService 
            .updateVetement(this.currentVetement) .subscribe((prod) => 
              { this.router.navigate(['vetements']); }); }

            onAddImagevetement() {
              // Vérifiez si images existe sinon initialisez-le en tant que tableau vide
              if (!this.currentVetement.images) {
                this.currentVetement.images = [];
              }
            
              this.vetementService.uploadImageVet(this.uploadedImage, this.uploadedImage.name, this.currentVetement.idVetement)
                .subscribe((img: Image) => {
                  console.log('Image ajoutée avec succès:', img);
                  this.currentVetement.images.push(img); // Ajoutez l'image à la liste
                  console.log('Liste des images mise à jour:', this.currentVetement.images); // Vérifiez la liste des images
                }, error => {
                  console.error('Erreur lors de l\'ajout de l\'image:', error);
                });
            }
            

  onImageUpload(event: any) { if(event.target.files && event.target.files.length)
     { this.uploadedImage = event.target.files[0]; 
      this.isImageUpdated =true; const reader = new FileReader();
       reader.readAsDataURL(this.uploadedImage); reader.onload = () => 
        { this.myImage = reader.result as string; }; } }

       supprimerImage(img: Image){ let conf = confirm("Etes-vous sûr ?"); 
        if (conf) this.vetementService.supprimerImage(img.idImage).subscribe(() => { 

        const index = this.currentVetement.images.indexOf(img, 0); if (index > -1) {
           this.currentVetement.images.splice(index, 1); } }); }


}
