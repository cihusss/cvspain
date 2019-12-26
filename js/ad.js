//    \
//    - \
//    |   \
//    |---- \
//    |       \
//    |---------\
//     \          \
//       \--------O-\
//         \----^-|-^-\
//           \___/_\____\            flex-ad framework
//           __/_____\____\___/      written by teo
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// set global vars
// var leaf;
var leaf = "${CUSTOM_MODEL_LEAF_NAME}";
var leaftype;
var data;
var wrapperWidth;
var wrapperHeight;
var url = window.location.href;
var postal;
var currDate;
var avgtempCurrent;
var tempPastyear = [];
var pastYear;
var avgtempPast;


// resizing listener event
// window.addEventListener("resize", buildAd);

// check for leaf query string
// if (url.indexOf("leaf") > -1) {
//   // leaf = url.substring(url.indexOf("=") + 1);
// }
// else {
//   leaf = 0;
// }

/* if (leaf == "${CUSTOM_MODEL_LEAF_NAME}") {
	leaf = 0;
} */

(function getPostal() {
	var request = new XMLHttpRequest();
	request.open("GET", "https://api.ipdata.co?api-key=test", true);
	request.onload = function () {
		if (request.status >= 200 && request.status < 400) {
			// success!
			data = JSON.parse(request.responseText);
			postal = 33703;
			getCurrDate()
		} else {
			// error msg from server
		}
	};
	request.onerror = function () {
		// there was a connection error of some sort
	};
	request.send();
})();

function getCurrDate() {
	var request = new XMLHttpRequest();
	request.open("GET", "https://api.worldweatheronline.com/premium/v1/weather.ashx?q=" + postal + "&format=JSON&num_of_days=1&key=ff6dab2f29a74858b4a213853191812", true);
	request.onload = function () {
		if (request.status >= 200 && request.status < 400) {
			// success!
			data = JSON.parse(request.responseText);
			currDate = data.data.weather[0].date;
			avgtempCurrent = data.data.weather[0].avgtempF;
			getPastData();
		} else {
			// error msg from server
		}
	};
	request.onerror = function () {
		// there was a connection error of some sort
	};
	request.send();

}

function getPastData() {
	for (var i = 0; i < 3; i++) {
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, "0");
		var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
		var yyyy = today.getFullYear() - (i + 1);
		today = yyyy + "-" + mm + "-" + dd;
		pastYear = today
		gePastTemp(i)
	}
	/*  */
}

function gePastTemp(i) {
	if (pastYear != null) {
		var request = new XMLHttpRequest();
		request.open("GET", "https://api.worldweatheronline.com/premium/v1/past-weather.ashx?q=" + postal + "&format=JSON&date=" + pastYear + "&key=ff6dab2f29a74858b4a213853191812", true);
		request.onload = function () {
			if (request.status >= 200 && request.status < 400) {
				// success!
				data = JSON.parse(request.responseText);
				tempPastyear.push(data.data.weather[0].avgtempF);
				if (i == 2) {
					getLeaf()
				}
			} else {
				// error msg from server
			}
		};
		request.onerror = function () {
			// there was a connection error of some sort
		};
		request.send();
	}
}


function getLeaf() {
	avgtempPast = Math.round((parseInt(tempPastyear[0]) + parseInt(tempPastyear[1]) + parseInt(tempPastyear[2])) / 3);
	if (avgtempCurrent - 7 > avgtempPast) {
		leaf = 0;
	} else if (avgtempCurrent + 7 < avgtempPast) {
		leaf = 1;
	} else {
		leaf = 2;
	}
	getData()
}
// get and parse json data
function getData() {
	var request = new XMLHttpRequest();
	request.open("GET", "json/matrix.json", true);

	request.onload = function () {
		if (request.status >= 200 && request.status < 400) {
			// success!
			data = JSON.parse(request.responseText);
			//console.log(data);
			buildAd();
		} else {
			// error msg from server
		}
	};

	request.onerror = function () {
		// there was a connection error of some sort
	};

	request.send();
}

// build ad
function buildAd(event) {
	// total number of keys in json object
	var count = Object.keys(data.data).length;

	// convert leaf value to number if it exist in json object
	if (leaf < count) {
		leaf = Number(leaf, 10);
	}

	// check var type of leaf and set leaftype var
	leaftype = typeof leaf;

	// default to 0 if leaf doesn't exist in json object or is string
	if (leaf > count || leaftype == "string") {
		leaf = 0;
	}

	// set up dynamic content vars
	var headline = data.data[leaf].HEADLINE_1;
	var cta = data.data[leaf].CTA;
	// var url = data.data[leaf].URL;
	var bg = data.data[leaf].BACKGROUND_IMAGE;

	document.getElementById("headline").innerHTML = headline;
	document.getElementById("cta").innerHTML = cta;
	document.getElementById("ad").style.backgroundImage = "url(" + bg + ")";

	// get wrapper width
	wrapperWidth = document.getElementById("wrapper").parentNode.offsetWidth;
	wrapperHeight = document.getElementById("wrapper").parentNode.offsetHeight;

	// make ad match iframe size
	document.getElementById("ad").style.width = wrapperWidth + "px";
	document.getElementById("ad").style.height = wrapperHeight + "px";

	// set ad width vars
	var adWidth = document.getElementById("ad").offsetWidth;
	var adHeight = document.getElementById("ad").offsetHeight;

	// set text var
	var txt = wrapperWidth + " x " + wrapperHeight;

	// inject text
	document.getElementById("value").innerHTML = txt;

	// console.log(adWidth + ":" + adHeight);

	styleAd();
}


