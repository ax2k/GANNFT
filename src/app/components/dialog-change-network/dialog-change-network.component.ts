import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EthereumService } from 'src/services/ethereum.service';
import { MetamaskService } from 'src/services/metamask.service';

@Component({
  selector: 'app-dialog-change-network',
  templateUrl: './dialog-change-network.component.html',
  styleUrls: ['./dialog-change-network.component.scss'],
})
export class DialogChangeNetworkComponent implements OnInit {
  networkName = '';
  constructor(
    public dialogRef: MatDialogRef<DialogChangeNetworkComponent>,
    private ethService: EthereumService,
    public metamaskService: MetamaskService
  ) {}

  ngOnInit() {
    this.networkName = this.ethService.provider$.value?.network?.name;
  }

  /**
   * Close the modal when no clicks
   */
  onClick(): void {
    this.dialogRef.close();
  }
}
