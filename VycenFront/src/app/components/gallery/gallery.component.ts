import { Component, OnInit } from '@angular/core';
import { GalleryService } from 'src/app/services/galleryRest/gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  imagenes: any
  imagenesUp:any
  
  constructor(
    private galleryRest: GalleryService
  ) { }

  ngOnInit(): void {
    this.getAllImages()
  }

  getAllImages(){
    this.galleryRest.getImages().subscribe({
      next: (res: any) => {
        this.imagenes = res.imagenes
        console.log(res.imagenes)
      },
    })
  }

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = (e: any) => {
          const preview = e.target.result;

          this.imagenesUp = preview;
          console.log(this.imagenesUp)
        };
        reader.readAsDataURL(selectedFile);


      }
    }
  }
  
  

}
