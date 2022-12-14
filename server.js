require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 4000;
const programmingLanguagesRouter = require('./src/routes/programmingLanguages.route');
const test = require('./src/routes/test.route');
const { MongoClient } = require('mongodb');

const reportController = require('./src/controllers/report.controller');
const schedule = require('node-schedule');

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use('/programming-languages',jsonParser,urlencodedParser, programmingLanguagesRouter);
app.use('/test',jsonParser,urlencodedParser, test);


const url = "mongodb://uat_miles:4Cuq44BC7cXchrE@35.200.158.126:27017/uat_miles_website";
const client = new MongoClient(url);

// Database Name
const dbName = 'uat_miles_website';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('miles_netInquiry_data');
  const campaignResult = await collection.aggregate([
    {"$group" : {_id:"$campaign", count:{$sum:1}}}
   ]).toArray();
  
  const campaignResultList = campaignResult.map((data)=>[data._id,data.count]);
  reportController.CreateCountsAsCampaign(campaignResultList);

  const comingFromResult = await collection.aggregate([
    {"$group" : {_id:"$comingFrom", count:{$sum:1}}}
   ]).toArray();
  const comingFromResultList = comingFromResult.map((data)=>[data._id,data.count]);
  reportController.CreateComingFrom(comingFromResultList);

  const gclCount = await collection.countDocuments({"gcl_id":{$ne:null}})
  const mbdIdCount = await collection.countDocuments({"mwb_id":{$ne:null}})
  const totalCount = await collection.countDocuments();
  reportController.updateCounts(1,gclCount,totalCount);
  reportController.updateCounts(2,mbdIdCount,totalCount);

  const landingPagesCount = await collection.aggregate([
    {"$group" : {_id:"$landingPage", count:{$sum:1}}}
   ]).toArray();
  reportController.createLandingPageCount(landingPagesCount.map((data)=>[data._id,data.count]));

  const conversionPageCount = await collection.aggregate([
    {"$group" : {_id:"$conversionPage", count:{$sum:1}}}
   ]).toArray();
   reportController.createConversionsionCount(conversionPageCount.map((data)=>[data._id,data.count]));

  const sampleList = await collection.find({}).limit(100).toArray();

  return 'done';
}

main()
.then(console.log)
.catch(console.error)
.finally(function() { client.close();
console.log("Closed");
});

const job = schedule.scheduleJob('27 * * * *', function(){
  main()
  .then(console.log)
  .catch(console.error)
  .finally(function() { client.close();
  console.log("Closed");
  });
});




/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  
  return;
});

app.listen(port,'0.0.0.0', () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
