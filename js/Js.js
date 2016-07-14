$('#exchangerates').append('<div id="rates"></div><div id="loadNew"></div>');


function getRates() {
	$.getJSON('http://api.fixer.io/latest')
	.done( function(data)  {
		var d = new Date();
		var hrs = d.getHours();
		var mins = d.getMinutes();
		var info = '<h2>Exchange Rates</h2>';
		var xRate = data.rates;
		$.each(xRate, function(key, val) {
           info += '<div class="' + key + '">' + key + ' : ' + val + '</div>';
		});
	    info += '<br><div>Base Currency: ' + data.base +'</div>';
		info += '<div>Date: ' + data.date +'</div>';
		info += 'Last update: ' + hrs + ':' +mins +'<br>';
		$('#rates').html(info);
	}).fail( function() {
		$('p').append('Rates not available!');
	}).always( function() {
		var loadNew = '<a id="refresh" href="#">';
		loadNew += '<img src="assets/img/check-icon.png" alt="refresh" /></a>';
		$('#loadNew').html(loadNew);
		$('#refresh').on('click', function(e) {
			e.preventDefault();
			getRates();
		});
	});
}

getRates();


