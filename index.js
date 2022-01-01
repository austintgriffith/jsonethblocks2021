var fs = require("fs");
var ethers = require("ethers");

const YOURADDRESS = "0xD0B9302Cd9489eea3adCdF25b216EDD09CBb567B"
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

  for(let i=startingBlock2021;i<=endingBlock2021;i++){
    //console.log("I",)
    let found = false
    try {
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
          }
        }
        //process.exit(0)
      }
      else{
        //console.log("NOT FOUND")
      }
    } catch(err) {
      //console.log("ERR ")
    }
    if(!found){
      //console.log('\t'," 🕵️ MISSING ",i)
      missing++;
      /*let currentBlock = await mainnetProvider.getBlock(i)
      console.log(" 📦  BLOCK #",i," -- ",currentBlock.timestamp,timeConverter(currentBlock.timestamp)," -- ",currentBlock.transactions.length," transactions")

      let loadedTransactions = []
      for(let t in currentBlock.transactions){
        const transaction = currentBlock.transactions[t]
        const txData = await mainnetProvider.getTransaction(transaction)
        loadedTransactions.push(txData)
      }
      currentBlock.transactions = loadedTransactions
      fs.writeFileSync("grabbed/"+i+".json",JSON.stringify(currentBlock))*/
    }
  }



  //console.log("TOTAL MISSING:",missing)
  //console.log("TOTAL FOUND:",foundCount)
  //console.log("TOTAL TXNS of 2021:",totalTxCount)
  //fs.writeFileSync("report.txt",missing+","+foundCount+","+totalTxCount)
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
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
