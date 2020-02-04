/**
 * The list of transaction status options.  If other is chosen, make sure to clarify this in the additionFields section.
 * /

/**
 * @memberof module:overledger-types
 */

export enum TransactionStatusOptions { 
    broadcast = "b",
    confirmed = "c",
    other = "other"

};

export default TransactionStatusOptions;