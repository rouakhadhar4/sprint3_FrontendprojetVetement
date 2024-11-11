import { Image } from './image.model';
import { Genre } from "./genre.model";

export class Vetement {
    idVetement! : number;
    nomVetement! : string;
    prix!: number;
    dateCreation! : Date ;
    couleur! : string ;
    taille! : string ;
    genre!: Genre;
    image! : Image;
    imageStr!:string;
    
    images: Image[] = []; 

    }
    