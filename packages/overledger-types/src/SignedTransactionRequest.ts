import OverledgerSignedTransaction from './OverledgerSignedTransaction';

/**
 * Overledger signed transaction request object
 * @typedef {Object} SignedTransactionRequest
 * @property {string} dlt - The distributed ledger technology.
 * @property {string} fromAddress - The address initiating the transaction.
 * @property {OverledgerSignedTransaction} signedTransaction - The signed transaction object.
 */

/**
 * @memberof module:overledger-types
 */
type SignedTransactionRequest = {
  dlt: string,
  fromAddress: string,
  signedTransaction: OverledgerSignedTransaction,
};

export default SignedTransactionRequest;
