const db = require('./db.service');
const helper = require('../utils/helper.util');
const config = require('../configs/general.config');


async function createcounts_as_campaign(data){
  const result = await db.query(
    `INSERT INTO counts_as_campaign 
    (name, count)
    VALUES (?,?);`,data
  );

  let message = 'Error in creating programming language';

  if (result.affectedRows) {
    message = 'Programming language created successfully';
  }

  return {message};
}
async function truncateCreatecounts_as_campaign(){
  const result = await db.query(
    `TRUNCATE TABLE counts_as_campaign;`
  );

  let message = 'Error in creating programming language';

  if (result.affectedRows) {
    message = 'Programming language created successfully';
  }

  return {message};
}

async function createComingFrom(data){
  const result = await db.query(
    `INSERT INTO coming_from 
    (name, count)
    VALUES (?,?);`,data
  );

  let message = 'Error in creating programming language';

  if (result.affectedRows) {
    message = 'Programming language created successfully';
  }

  return {message};
}
async function truncateCreateComingFrom(){
  const result = await db.query(
    `TRUNCATE TABLE coming_from;`
  );
  let message = 'Error in creating programming language';
  if (result.affectedRows) {
    message = 'Programming language created successfully';
  }
  return {message};
}


async function updateCounts(id,count,total){
  const result = await db.query("UPDATE counts SET count ="+count+",total = " +total+" WHERE id ="+id);
  let message = 'Error in updating programming language';
  if (result.affectedRows) {
    message = 'Programming language updating successfully';
  }
  return {message};
}

module.exports = {
  createcounts_as_campaign,
  truncateCreatecounts_as_campaign,
  truncateCreateComingFrom,
  createComingFrom,
  updateCounts
}
