import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
//@ts-ignore
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';
import { from } from 'rxjs';
import { DialogChangeNetworkComponent } from 'src/app/components/dialog-change-network/dialog-change-network.component';
import { EthereumService } from './ethereum.service';

@Injectable({
  providedIn: 'root',
})
export class MetamaskService {
  ethereum: null | any = null;

  Mainnet = 1;
  Testnet = 4; //Rinkeby

  validChain = false;

  constructor(private ethService: EthereumService, private dialog: MatDialog, private route: Router) {
    this.getWallet();
    this.handleAccountsChanged = this.handleAccountsChanged.bind(this);
  }

  connect(): void {
    this.ethereum
      .request({ method: 'eth_requestAccounts' })
      .then(this.handleAccountsChanged)
      .catch((err: any) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log('Please connect to MetaMask.');
        } else {
          console.error(err);
        }
      });
  }


  /**
   * Switchs ethereum chain, do not work now for KCC & KCC test.. only works for older network.
   */
  switchEthereumChain(): void {
    const params = [
      {
        chainId: '0x1',
      },
    ];
    from(this.ethereum.request({ method: 'wallet_switchEthereumChain', params })).subscribe((x) => console.log(x));
  }

  async getWallet() {
    const provider = await detectEthereumProvider();

    if (provider) {
      // From now on, this should always be true:
      // provider === window.ethereum
      this.startApp(provider); // initialize your app
    } else {
      console.log('Please install MetaMask!');
    }
  }

  /**
   * Starts and initialize the Ethereum service
   * @param provider
   * @returns
   */
  private async startApp(provider: any) {
    // If the provider returned by detectEthereumProvider is not the same as
    // window.ethereum, something is overwriting it, perhaps another wallet.

    if (provider !== window.ethereum) {
      console.error('Do you have multiple wallets installed?');
    }
    // Access the decentralized web!
    if (!window.ethereum) return;

    const { ethereum } = window as any;
    this.ethereum = ethereum;

    this.ethService.provider$.next(new ethers.providers.Web3Provider(this.ethereum));
    this.ethService.signer = this.ethService.provider$.value.getSigner();

    await this.ethereum.request({ method: 'eth_chainId' });

    this.ethereum.on('chainChanged', this.handleChainChanged);

    this.ethereum
      .request({ method: 'eth_accounts' })
      .then(this.handleAccountsChanged)
      .catch((err: any) => {
        // Some unexpected error.
        // For backwards compatibility reasons, if no accounts are available,
        // eth_accounts will return an empty array.
        console.error(err);
      });

    this.ethereum.on('accountsChanged', this.handleAccountsChanged);
  }

  /**
   * Handles chain changed
   * @param _chainId
   */
  private handleChainChanged(_chainId: any) {
    window.location.reload();
  }

  /**
   * Handles accounts changed
   * @param accounts
   * @returns
   */
  private async handleAccountsChanged(accounts: any) {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== this.ethService.currentAccount$.value) {
      this.ethService.currentAccount$.next(accounts[0]);

      const wallet = new ethers.Wallet(this.ethService.currentAccount$.value);

      this.ethService.walletSigner.next(wallet);  
  
      //don't open network dialog on homepage
      if (![this.Mainnet].includes(this.ethService.provider$.value.network.chainId) && false) {
          return this.openNetworkDialog();
      }      
      this.ethService.getNFTs();
      this.ethService.getGapes();
      this.ethService.getETHBalance();

      this.validChain = this.ethService.provider$.value.network.chainId == this.Mainnet || 
      this.ethService.provider$.value.network.chainId == this.Testnet; 
    }
  }

  /**
   * Opens network dialog
   */
  openNetworkDialog(): void {
      this.dialog.open(DialogChangeNetworkComponent, {
      width: '320px',
    });
  }
}
