import { Component, OnInit } from '@angular/core';
import { EthereumService } from 'src/services/ethereum.service';
import { MetamaskService } from 'src/services/metamask.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isLoading = false;  
  title = 'GANNFT';

  amountregular!: number;
  amountGape!: number;

  constructor(
    public metamaskService: MetamaskService, 
    public ethService: EthereumService) {}

  ngOnInit() {
  }

  mint() {
    this.isLoading = true;
    this.ethService
      .mint(this.amountregular)
      .then(() => (this.isLoading = false));
  } 

  mintGAPE() {
    this.isLoading = true;
    this.ethService
      .mintGAPE(this.amountregular)
      .then(() => (this.isLoading = false));
  } 

  connectWallet(): void {
    this.metamaskService.connect();
  }

}
