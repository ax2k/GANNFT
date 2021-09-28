import { Component, OnInit } from '@angular/core';
import { NavigationStart, RouteConfigLoadStart, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { MetamaskService } from 'src/services/metamask.service';
import { EthereumService } from 'src/services/ethereum.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss'],
})
export class ConnectComponent  {
  /**
   * Determines whether the style is Website or Application based on routing.
   */
  isWebsiteStyle = true;

  constructor(
    public metamaskService: MetamaskService,
    public ethService: EthereumService,
  ) {
  }

  connectWallet(): void {
    this.metamaskService.connect();
  }
}
