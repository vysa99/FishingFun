var fishingLocations = [{locationTitle: 'Lithuanian pond', locationId: 1, locationPhoto: 'LT_pond.jpg', unavailable: false},
						{locationTitle: 'Lithuanian watercourse', locationId: 2, locationPhoto: 'LT_watercourse.jpg', unavailable: false},
						{locationTitle: 'Lithuanian lake', locationId: 3, locationPhoto: 'LT_lake.jpg', unavailable: false},
						{locationTitle: 'Lithuanian river', locationId: 4, locationPhoto: 'LT_river.jpg', unavailable: false},
						{locationTitle: 'Lithuanian inlandsea', locationId: 5, locationPhoto: 'LT_inlandsea.jpg', unavailable: false},
						{locationTitle: 'Lithuanian seawaterfront', locationId: 6, locationPhoto: 'LT_seawaterfront.jpg', unavailable: false},
						{locationTitle: 'Norway fjord', locationId: 7, locationPhoto: 'NO_fjord.jpg', unavailable: false},
						{locationTitle: 'USA Pacific ocean', locationId: 8, locationPhoto: 'US_ocean.jpg', unavailable: true}]

$(document).ready(function(){
	var location; 
    if (!localStorage.locationId) {
    	console.log('no stored Id');
    	location = fishingLocations[0];
    	}
	else { 
		location = $.grep(fishingLocations, function(e) { 
			return e.locationId == localStorage.locationId; 
		})[0]; 
	}
   	$('title').text($('title').text()+location.locationTitle);
	localStorage.removeItem('locationId');
	});