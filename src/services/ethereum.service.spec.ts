/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EthereumService } from './ethereum.service';

describe('Service: Ethereum', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EthereumService]
    });
  });

  it('should ...', inject([EthereumService], (service: EthereumService) => {
    expect(service).toBeTruthy();
  }));
});
