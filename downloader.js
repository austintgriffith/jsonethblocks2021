var fs = require("fs");
const get = require("async-get-file");

const BUCKETNAME = "jsonethblocks2021";
const startingBlock2021 = 11566960
const endingBlock2021 = 13916165

// 🚛 Downloader
//
// this downloads all of the blocks from 2021 to the /blocks/ folder
//
const main = async () => {
  const totalBlocks2021 = endingBlock2021-startingBlock2021
  let currentBlockNumber = startingBlock2021
  while(currentBlockNumber<=endingBlock2021){
    if (!fs.existsSync("blocks/"+currentBlockNumber+".json")){
      console.log(" 📦 Downloading block #"+currentBlockNumber+"")
      var options = {
        directory: "./blocks/",
        filename: currentBlockNumber+".json"
      }
      const result = await get("http://jsonethblocks2021.s3-website-us-east-1.amazonaws.com/"+currentBlockNumber+".json",options);
    }
    currentBlockNumber++;
  }
}

if (!fs.existsSync("blocks")){
    fs.mkdirSync("blocks");
}

const getFile = url => {
  return new Promise((resolve, reject) => {
    http.get(url, response => {
      const {statusCode} = response;
      if (statusCode === 200) {
        resolve(response);
      }
      reject(null);
    });
  });
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
