/**
 * @memberof module:overledger-types
 */
export enum SCInteropOptions {
    ESCROW_CREATION = 'ESCROW_CREATION',
    ESCROW_EXECUTION = 'ESCROW_EXECUTION',
    ESCROW_CANCELLATION = 'ESCROW_CANCELLATION',
    MIGRATION_REQUEST = 'MIGRATION_REQUEST',
    MIGRATION_EXECUTION = 'MIGRATION_EXECUTION',
    MIGRATION_CANCELLATION = 'MIGRATION_CANCELLATION',
    ORACLE_REQUEST = 'ORACLE_REQUEST',
    ORACLE_RESPONSE = 'ORACLE_RESPONSE',
  }

export default SCInteropOptions;
