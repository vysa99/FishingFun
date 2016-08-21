var fishingLocations = [{locationTitle: 'Lithuanian pond', locationId: 1, locationPhoto: 'LT_pond.jpg', unavailable: false},
						{locationTitle: 'Lithuanian watercourse', locationId: 2, locationPhoto: 'LT_watercourse.jpg', unavailable: false},
						{locationTitle: 'Lithuanian lake', locationId: 3, locationPhoto: 'LT_lake.jpg', unavailable: false},
						{locationTitle: 'Lithuanian river', locationId: 4, locationPhoto: 'LT_river.jpg', unavailable: false},
						{locationTitle: 'Lithuanian inlandsea', locationId: 5, locationPhoto: 'LT_inlandsea.jpg', unavailable: false},
						{locationTitle: 'Lithuanian seawaterfront', locationId: 6, locationPhoto: 'LT_seawaterfront.jpg', unavailable: false},
						{locationTitle: 'Norway fjord', locationId: 7, locationPhoto: 'NO_fjord.jpg', unavailable: false},
						{locationTitle: 'USA Pacific ocean', locationId: 8, locationPhoto: 'US_ocean.jpg', unavailable: true}]

var catchLog = [{catchFishId: 1, catchLength: 12, catchWeigth: 52, catchDate: "2016-07-25", catchLocation: 1},
				{catchFishId: 2, catchLength: 14, catchWeigth: 68, catchDate: "2016-07-12", catchLocation: 2},
				{catchFishId: 3, catchLength: 25, catchWeigth: 342, catchDate: "2016-07-21", catchLocation: 2},
				{catchFishId: 4, catchLength: 32, catchWeigth: 784, catchDate: "2016-07-02", catchLocation: 1},
				{catchFishId: 5, catchLength: 18, catchWeigth: 248, catchDate: "2016-07-29", catchLocation: 3},
				{catchFishId: 6, catchLength: 46, catchWeigth: 1048, catchDate: "2016-08-02", catchLocation: 3},
				{catchFishId: 7, catchLength: 65, catchWeigth: 3476, catchDate: "2016-07-13", catchLocation: 3},
				{catchFishId: 8, catchLength: 114, catchWeigth: 24722, catchDate: "2016-07-22", catchLocation: 3}]

var fishy = [{fishName: 'Crucian carp', fishId: 1, fishPhoto: 'cruciancarp.jpg', fishBait: 'G'},
			 {fishName: 'Roach', fishId: 2, fishPhoto: 'roach.jpg', fishBait: 'G'},
			 {fishName: 'Carp', fishId: 3, fishPhoto: 'carp.jpg', fishBait: 'O'},
			 {fishName: 'Tench', fishId: 4, fishPhoto: 'tench.jpg', fishBait: 'O'},
			 {fishName: 'Perch', fishId: 5, fishPhoto: 'perch.jpg', fishBait: 'M'},
			 {fishName: 'Pike', fishId: 6, fishPhoto: 'pike.jpg', fishBait: 'M'},
			 {fishName: 'Zander', fishId: 7, fishPhoto: 'zander.jpg', fishBait: 'M'},
			 {fishName: 'Catfish', fishId: 8, fishPhoto: 'catfish.jpg', fishBait: 'M'}]

var filldb = function () {	
/*	for (i = 0; i < fishingLocations.length; i++) { 
		$.ajax({
			url: 'http://localhost:8080/fishing-location/add',
			method: 'POST',
			data: fishingLocations[i]
		});
	}
	for (i = 0; i < fishy.length; i++) { 
		$.ajax({
			url: 'http://localhost:8080/fishy/add',
			method: 'POST',
			data: fishy[i]
		});
	}
	for (i = 0; i < catchLog.length; i++) {
		$.ajax({
			url: 'http://localhost:8080/catch-log/add',
			method: 'POST',
			data: catchLog[i]
		});
	}*/
}
