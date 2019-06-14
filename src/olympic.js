const athleteData = require('../data/athlete_events.json');
const nocData = require('../data/noc_region.json');

/*
     *****************************************************
     *************Olympics Dataset Project****************
     *****************************************************

1. Number of times olympics hosted per City over the years - Pie chart

2. Top 10 countries who have won most medals after 2000 - stacked column - split gold/silver/bronze

3. M/F participation by decade - column chart

4. Per year average age of athletes who participated in Boxing Men’s Heavyweight - Line 

5. Find out all medal winners from India per season - Table

*/

/*---------------------Question-1---------------------*/
/*1. Number of times olympics hosted per City over the years - Pie chart*/


function gamesHostedPerCity(athleteData){

    var result = athleteData.reduce((finalOutput, event) => {
        var list = event.Games + " " + event.City;
        if(!finalOutput['extSet'].has(list)){
            finalOutput['extSet'].add(list)
            finalOutput.hasOwnProperty(event.City)? finalOutput[event.City]++ : finalOutput[event.City] = 1;
       }
        return finalOutput;
    },{extSet : new Set()})
    delete result['extSet'];
    return result;
}
//console.log(gamesHostedPerCity(athleteData));

/*-----------------End Question-1----------------------------*/


/*----------------- Question-2-------------------------*/
/*2. Top 10 countries who have won most medals after 2000 - stacked column - split gold/silver/bronze */

function highestMedelsPerTeam(athleteData , yearCondition){

    const dataFilter = athleteData.filter(item => item.Year>yearCondition && item.Medal !== "NA");

     var countries = dataFilter.reduce(function(acc,value) {
        var key = value.Team;
        var total;

        if(!(acc.hasOwnProperty(key)))
        {
            acc[key]={};
            acc[key][value.Medal]=1;
            acc[key]['total'] = 1;
        }
        else{
         if(!(acc[key].hasOwnProperty(value.Medal))){
              acc[key][value.Medal]=1;
              acc[key]['total'] += 1;
         }
          else{
          acc[key][value.Medal]++
          acc[key]['total']++;
        }
        
        }
        return acc;
        
      },{});
     
      /*  First Method  */
    //   var topCountries = {};
    //   Object.keys(countries).sort((a,b) => {return countries[b]['total'] - countries[a]['total']}).slice(0,10).map(acc => {topCountries[acc] = countries[acc]});
    //   return topCountries;

    /*   Second Method  */
    var objectOfTopCountries = Object.entries(countries).sort((a,b) => b[1]['total'] - a[1]['total']).slice(0,10)
    var finalResultForTopCountries = objectOfTopCountries.reduce((acc , val) => {
        acc[val[0]] = ({
            Gold :  val[1]['Gold'],
            Silver: val[1]['Silver'],
            Bronze: val[1]['Bronze']
        });
        return acc;
    },{});
    return finalResultForTopCountries;
    }

   // var topTenCountries = (highestMedelsPerTeam(athleteData));
   // console.log(topTenCountries) 
/*-----------------End Question-2----------------------------*/

   


/*---------------------------Question-3--------------------------*/
/*   3. M/F participation by decade - column chart  */


function mAndfRatioByDecade(athleteData){

    var maleAndFemaleRatio =  athleteData.reduce((accum, current) => {
        var key  = current.ID;
        var decade = (`${current.Year.substring(0,3)}0 - ${current.Year.substring(0,3)}9`);
        var list = current.ID;
        	if(!accum['events'].has(list)){
			    accum['events'].add(list);
                if(!accum.hasOwnProperty(decade)){
                    accum[decade] = {};
                    accum[decade][current.Sex] = 1;
                }
                else{
                    if(!accum[decade].hasOwnProperty(current.Sex)){
                        accum[decade][current.Sex] = 1;
                    }
                    else{
                        accum[decade][current.Sex] += 1;
                    }
                }
            }
       return accum;
    },{events : new Set()}) 

    delete maleAndFemaleRatio['events'];
    return maleAndFemaleRatio;
}
//console.log(mAndfRatioByDecade(athleteData)); 

/*-----------------End Question-3----------------------------*/  


/*--------------------Question-4--------------------*/
/*4.Per year average age of athletes who participated in Boxing Men’s Heavyweight - LineFind*/

function perYearAvgAge(athleteData, gameEventCondition){
    var catagoryList = [];
    var count = 0; 
    const boxingByCatagory = athleteData.filter(item => item.Event == gameEventCondition && item.Age !== 'NA')

       var newBoxingafterReduce = boxingByCatagory.reduce((acc , curr)=>{
        var data = curr.Year;
        
        if(!(acc.hasOwnProperty(data))){
            acc[data] = {};
            acc[data]['age'] = parseInt([curr.Age]);
            acc[data]['count'] = 1;
        }
        else{
            acc[data]['age'] += parseInt([curr.Age]);
            acc[data]['count'] += 1;
        }
        return acc;
    },{})

    /*  First Mehod */
    //  return Object.keys(newBoxingafterReduce).reduce((newAcc, newCurr)=> {
    //         newAcc[newCurr] = Math.round(newBoxingafterReduce[newCurr]['age']/newBoxingafterReduce[newCurr]['count']);
    //         return newAcc;
    //     },{})

    /* Array and Object Method */
    var objectOfBoxingAvgAge = Object.entries(newBoxingafterReduce);
    var finalResultForBoxingAvgAge = objectOfBoxingAvgAge.reduce((acc , val) => {

        acc[val[0]] =({'Average Age' : Math.round(val[1]['age']/val[1]['count'])});
        return acc;

    },{})

    return finalResultForBoxingAvgAge;
}
//console.log(perYearAvgAge(athleteData)); 
/*-----------------End Question-4----------------------------*/


/*-----------------------Qustion-5--------------------------*/
/* 5. Find out all medal winners from India per season - Table */

function getIndianMedalWinners(athleteData, teamCondition){
    const indiansWinners = athleteData.filter(item => item.Team === teamCondition && item.Medal !== 'NA');

    return indiansWinners.reduce((winnerPerSession , event) => {
        var key = event.Games;
        if(!winnerPerSession.hasOwnProperty(key)){
            winnerPerSession[key] = [];
            winnerPerSession[key].push(event.Name);
        }
        else {
                winnerPerSession[key].push(event.Name);
            }
        return winnerPerSession;
    },{})    
}
//console.log(getIndianMedalWinners(athleteData)); 
/*-----------------End Question-5----------------------------*/



/* Exporting all the functions to index.js */

module.exports.gamesHostedPerCity = gamesHostedPerCity;
module.exports.highestMedelsPerTeam = highestMedelsPerTeam;
module.exports.mAndfRatioByDecade = mAndfRatioByDecade;
module.exports.perYearAvgAge = perYearAvgAge;
module.exports.getIndianMedalWinners = getIndianMedalWinners;

/*-----------------------------------------------------------*/