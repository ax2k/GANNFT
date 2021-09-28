import { Component } from '@angular/core';

@Component({
  selector: 'app-svg',
  templateUrl: './svg-back.svg',
  styleUrls: []
})
export class SvgBackComponent {
    img1 = '';
    img2 = '';
    img3 = '';
    img4 = '';

    //../assets/apes_dist/{{img1}}.jpg

    ngOnInit() {
        this.img1 = "../assets/apes_dist/"+ this.getRandomInt(12).toString() + ".jpg";
        this.img2 = "../assets/apes_dist/"+ this.getRandomInt(12).toString() + ".jpg";
        this.img3 = "../assets/apes_dist/"+ this.getRandomInt(12).toString() + ".jpg";
        this.img4 = "../assets/apes_dist/"+ this.getRandomInt(12).toString() + ".jpg";
   }

    getRandomInt(max:number) {
        return Math.floor(Math.random() * (max - 1) + 1);
    }

}