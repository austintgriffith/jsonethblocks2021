# jsonethblocks2021

There are 2,349,206 Ethereum blocks timestamped for the year 2021.

There were 461,472,785 Ethereum transactions in these blocks for 2021.

This is a script to download and parse these blocks without sharing any sensitive information.

Download blocks from S3:
```bash
node download
```

Search blocks for transactions from a specific address:

edit `index.js` and change the `YOURADDRESS`

```bash
node index
```
