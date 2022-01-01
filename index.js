var fs = require("fs");
var ethers = require("ethers");

const YOURADDRESS = "0x35D04f2829d9135Ee21d29e0F24CFA902C4b9998"
const DEBUG = true

const BUCKETNAME = "jsonethblocks2021";
const startingBlock2021 = 11566960
const endingBlock2021 = 13916165

const main = async () => {
  console.log("Searching for transactions to/from "+YOURADDRESS+"...")

  const testFolder = 'blocks/';

  let total = endingBlock2021-startingBlock2021
  let missing = 0
  let foundCount = 0
  let totalTxCount = 0
  let foundTransactions = []

  for(let i=startingBlock2021;i<=endingBlock2021;i++){
    //console.log("I",)
    let found = false
    if (await fs.existsSync(testFolder+""+i+".json")) {
      //file exists
      found=true
      foundCount++
      //console.log("FOUND",i)
      let contents = await fs.readFileSync(testFolder+""+i+".json")
      let obj = JSON.parse(contents.toString())
      totalTxCount+=obj.transactions.length
      if(DEBUG) console.log(" 💻  PARSING TRANSACTIONS FROM BLOCK ",i," -- ",obj.transactions.length,"transactions -- ",foundCount," out of ",total,parseInt(foundCount*100/total)+"% -- ",totalTxCount,"total txns");
      for(let t in obj.transactions) {
        let transaction = obj.transactions[t]
        if(transaction.to==YOURADDRESS || transaction.from==YOURADDRESS){
          console.log("FOUND TRANSACTION",transaction)
          foundTransactions.push(transaction)
        }
      }
    }
    if(!found){
      //console.log('\t'," 🕵️ MISSING ",i)
      missing++;
    }
  }

  console.log("TOTAL MISSING:",missing)
  console.log("TOTAL FOUND:",foundCount)
  console.log("TOTAL TXNS PARSED:",totalTxCount," out of 461,472,785")
  fs.writeFileSync(YOURADDRESS+".json",JSON.stringify(foundTransactions,null,2))
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

if (!fs.existsSync("addresses")){
    fs.mkdirSync("addresses");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
