$(function () {
    var chart = Highcharts.chart('container', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Temperature'
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: 'Amount'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: 'Temperature (°C)',
            data: []
        }, {
            name: 'Humidity (%)',
            data: []
        }]
    });

	requestData();
	function requestData() {
	    $.ajax({
	        url: '/temperature',
	        success: function(point) {
	            var series = chart.series[0],
	                shift = series.data.length > 20; 

	            // add the point
	            $.map(point, function (v, k) {
	            	chart.series[0].addPoint([ new Date(v.created_at).getTime(), v.temp], true, shift);
	            	chart.series[1].addPoint([ new Date(v.created_at).getTime(), v.pres], true, shift);
	            });
	            //setTimeout(requestData, 5000);    
	        },
	        cache: false
	    });
	}
});