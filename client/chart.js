fetch('../output/jsonOutput.json')
.then(json => json.json())
.then(data => olympicCharts(data));

/*  Plotting Data For All the Question  */
function olympicCharts(data) {
    let formattedDataOne = Object.entries(data.gamesHostedPerCity).reduce((acc, item) => {
        acc.push({name : item[0], y : item[1]});
        return acc;
    },[]);

    let formattedDataTwo = Object.entries(data.highestMedelsPerTeam).reduce((acc , item) => {
        acc.push({});
    },[])


    Highcharts.chart('chart-one', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Olympic Hosted Per City'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                  // format: '<b>{point.name}</b>: {point.per:.1f} %'

                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data:formattedDataOne,
        }]
    });
}