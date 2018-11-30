import axios from 'axios';
import OverledgerSDK from '../src';

jest.mock('axios');

describe('Dlt/Ethereum', () => {
  let overledger;
  let account;
  let signedTransaction;

  beforeAll(() => {
    overledger = new OverledgerSDK('testmappid', 'testbpikey', {
      dlts: [{
        dlt: 'ethereum',
      }],
    });
  });

  test('Can get name', () => {
    expect(overledger.dlts.ethereum.name).toBe('ethereum');
    expect(overledger.dlts.ethereum.symbol).toBe('ETH');
  });

  test('Can create an account', () => {
    account = overledger.dlts.ethereum.createAccount();

    expect(account.privateKey.length).toBe(66);
    expect(account.address.length).toBe(42);
  });

  test('Cannot sign an ethereum transaction without an account setup', () => {
    expect(() => overledger.dlts.ethereum.sign('0x0000000000000000000000000000000000000000', 'QNT tt3')).toThrow('The account must be setup');
  });

  test('Can set the account previously created', () => {
    overledger.dlts.ethereum.setAccount(account.privateKey);

    expect(overledger.dlts.ethereum.account.privateKey).toBe(account.privateKey);
  });

  test('Cannot sign an ethereum transaction without specifying an amount', () => {
    expect(() => overledger.dlts.ethereum.sign('0x0000000000000000000000000000000000000000', 'QNT tt3')).toThrow('options.amount must be setup');
  });

  test('Cannot sign an ethereum transaction without specifying an feeLimit', () => {

    expect(() => overledger.dlts.ethereum.sign('0x0000000000000000000000000000000000000000', 'QNT tt3', {
      amount: 0,
    })).toThrow('options.feeLimit must be setup');
  });

  test('Cannot sign an ethereum transaction without specifying an feePrice', () => {
    expect(() => overledger.dlts.ethereum.sign('0x0000000000000000000000000000000000000000', 'QNT tt3', {
      amount: 0, feeLimit: 100,
    })).toThrow('options.feePrice must be setup');
  });

  test('Cannot sign an ethereum transaction without specifying a sequence', () => {
    expect(() => overledger.dlts.ethereum.sign('0x0000000000000000000000000000000000000000', 'QNT tt3', {
      amount: 0, feeLimit: 100, feePrice: 1,
    })).toThrow('options.sequence must be setup');
  });

  test('Can sign an ethereum transaction', async () => {
    signedTransaction = await overledger.dlts.ethereum.sign('0x0000000000000000000000000000000000000000', 'QNT tt3', {
      amount: 0, feeLimit: 100, feePrice: 1, sequence: 1,
    });

    expect(signedTransaction.length).toBeGreaterThan(200);
    expect(signedTransaction.startsWith('0x')).toBe(true);
  });

  test('Can send an ethereum signedTransaction', async () => {
    axios.post.mockResolvedValue({ status: 'broadcasted', dlt: 'ethereum', transactionHash: '0x712df767d7adea8a16aebbf080bc14daf21d3f00d3f95817db0b45abe7631711' });
    await overledger.dlts.ethereum.send(signedTransaction);

    expect(axios.post).toBeCalledWith(`${overledger.overledgerUri}/transactions`, {
      mappId: 'testmappid',
      dltData:
        [{
          dlt: 'ethereum',
          signedTransaction: expect.any(String),
        }],
    });
  });

  test('Can signAndSend an ethereum transaction', async () => {
    axios.post.mockResolvedValue({ status: 'broadcasted', dlt: 'ethereum', transactionHash: '0x712df767d7adea8a16aebbf080bc14daf21d3f00d3f95817db0b45abe7631711' });
    await overledger.dlts.ethereum.signAndSend('0x0000000000000000000000000000000000000000', 'QNT tt3', {
      amount: 0, feeLimit: 100, feePrice: 1, sequence: 1,
    });

    expect(axios.post).toBeCalledWith(`${overledger.overledgerUri}/transactions`, {
      mappId: 'testmappid',
      dltData:
        [{
          dlt: 'ethereum',
          signedTransaction: expect.any(String),
        }],
    });
  });
});