const repoet = require('../services/report.service');

async function CreateCountsAsCampaign(list) {
  try {
    repoet.truncateCreatecounts_as_campaign();
    list.forEach(element => {
      repoet.createcounts_as_campaign(element)
    });
  } catch (err) {
    console.error(`Error while creating programming language`, err.message);
  }
}
async function CreateComingFrom(list) {
  try {
    repoet.truncateCreateComingFrom();
    list.forEach(element => {
      repoet.createComingFrom(element)
    });
  } catch (err) {
    console.error(`Error while creating programming language`, err.message);
  }
}

async function updateCounts(id,count,total) {
  try {
    repoet.updateCounts(id,count,total);
  } catch (err) {
    console.error(`Error while creating programming language`, err.message);
  }
}

async function createConversionsionCount(list) {
  try {
    repoet.truncateTable('conversison_page_count');
    list.forEach(element => {
      repoet.createConversionsionPageCount(element)
    });
  } catch (err) {
    console.error(`Error while creating programming language`, err.message);
  }
}

async function createLandingPageCount(list) {
  try {
    repoet.truncateTable('landing_page_count');
    list.forEach(element => {
      repoet.createLandingPageCount(element)
    });
  } catch (err) {
    console.error(`Error while creating programming language`, err.message);
  }
}

module.exports = {
    CreateCountsAsCampaign,
    CreateComingFrom,
    updateCounts,
    createLandingPageCount,
    createConversionsionCount

};
