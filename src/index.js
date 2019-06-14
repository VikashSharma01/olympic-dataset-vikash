const fs = require('fs')

const  olympicOutputs = require('./olympic');

const athleteData = require('../data/athlete_events.json');

// const gamesHostedPerCity = olympicOutputs.gamesHostedPerCity(athleteData);
// const highestMedelsPerTeam = olympicOutputs.highestMedelsPerTeam(athleteData , 2000);
//  const mAndfRatioByDecade = olympicOutputs.mAndfRatioByDecade(athleteData);
//  const perYearAvgAge = olympicOutputs.perYearAvgAge(athleteData, "Boxing Men's Heavyweight");
//  const getIndianMedalWinners = olympicOutputs.getIndianMedalWinners(athleteData ,'India');


/*  -------------Writting File into output File-------------- */
// const objectStringifyForOlympicHosted = JSON.stringify(gamesHostedPerCity, null, 4);
// console.log(objectStringifyForOlympicHosted);

let result = {};

result["gamesHostedPerCity"] = olympicOutputs.gamesHostedPerCity(athleteData);
result["highestMedelsPerTeam"] = olympicOutputs.highestMedelsPerTeam(athleteData , 2000);
result["mAndfRatioByDecade"] = olympicOutputs.mAndfRatioByDecade(athleteData);
result["perYearAvgAge"] = olympicOutputs.perYearAvgAge(athleteData, "Boxing Men's Heavyweight");
result["getIndianMedalWinners"] = olympicOutputs.getIndianMedalWinners(athleteData ,'India');

result = JSON.stringify(result, null, 4);

fs.writeFile('../output/jsonOutput.json', result, (err) => {if(err)
return err;})
/*----------------------------------------------------------------------------------------*/


// const objectStringifyForHighestMedal = JSON.stringify(highestMedelsPerTeam,null, 4);
// console.log(objectStringifyForHighestMedal);

// const objectStringifyForMaleAndFemale = JSON.stringify(mAndfRatioByDecade , null , 4);
// console.log(objectStringifyForMaleAndFemale);

// const objectStringifyPerYearAverage = JSON.stringify(perYearAvgAge , null,4);
// console.log(objectStringifyPerYearAverage);

// const objectStringifyIndianMedalWinners = JSON.stringify(getIndianMedalWinners , null,4);
// console.log(objectStringifyIndianMedalWinners);

/*
fs.writeFile('../output/jsonOutput.json', objectStringifyForHighestMedal, (err) => {if(err)
    return err;})
*/