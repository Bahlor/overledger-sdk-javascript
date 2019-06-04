const OverledgerSDK = require("../../packages/bundle").default;

//  ---------------------------------------------------------
//  -------------- BEGIN VARIABLES TO UPDATE ----------------
//  ---------------------------------------------------------
const mappId = '<ENTER YOUR MAPPID>';
const bpiKey = '<ENTER YOUR BPIKEY>';

// Take these from the search-transaction scripts, as the response
// includes what block the transaction is included in (except for bitcoin);

// TODO: research if the transaction call on bitcoin can return the block it was included in
// blockchain.com seems to have this capability
const bitcoinBlockNumber = '200';
const ethereumBlockNumber = '75970';
const rippleBlockNumber = '379468';

//  ---------------------------------------------------------
//  -------------- END VARIABLES TO UPDATE ------------------
//  ---------------------------------------------------------

; (async () => {
    try {
        const overledger = new OverledgerSDK(mappId, bpiKey, {
            dlts: [{ dlt: "bitcoin" }, { dlt: 'ethereum' }, { dlt: 'ripple' }],
            // TODO: Set this to 'testnet' once the release is live
            provider: { network: 'http://10.7.4.236:30020/v1' },

        });


        const bitcoinBlock = await overledger.search.getBlockByDltAndNumber('bitcoin', bitcoinBlockNumber);
        console.log('Bitcoin block: ', bitcoinBlock.data);
        console.log('\n');

        const ethereumBlock = await overledger.search.getBlockByDltAndNumber('ethereum', ethereumBlockNumber);
        console.log('Ethereum block: ', ethereumBlock.data);
        console.log('\n');

        const rippleBlock = await overledger.search.getBlockByDltAndNumber('ripple', rippleBlockNumber);
        console.log('Ripple block: ', rippleBlock.data);
        console.log('\n');

    } catch (e) {
        console.error('error', e.response.data);
    }
})();