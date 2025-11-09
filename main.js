
//actual insert code

const wmeList = {rocket, honolulu, ladybird};
var trackers = document.querySelectorAll(".tracker-body");

const imageHtml = '<div class="image-wrapper"><div class="left-arrow"></div><div class="right-arrow"></div><div class="close-button"><i class="fa-solid fa-xmark"></i></div><img><div class="lock-position"><span class="artist"></span><span class="points"></span></div></div>'

for (i = 0; i < trackers.length; i++) {
   	//get the names from our lovely list
   	var wmeNames = Object.keys(wmeList)
   	//and the name of our current WME
   	var currentWME = trackers[i].id

   	//check if any of the names on the list match our current WME
   	for (j = 0; j < wmeNames.length; j++) {
   		//if one does,
   		if (currentWME == wmeNames[j]) {
   			//get the content of that number from our base array
	   		const wmeArt = Object.values(wmeList)[j];

	   		//then, run through each one
	   		for (k = 0; k < wmeArt.length; k++) {
	   			//add a box for the image
	   			trackers[i].insertAdjacentHTML("beforeend", imageHtml);

	   			//grab all our values from the current list item
	   			var artist = wmeArt[k].artist;
	   			var points = wmeArt[k].points;
	   			var url = wmeArt[k].url;

	   			//set the SRC
	   			trackers[i].querySelectorAll("img")[k].src = url;
	   			//insert the artist url
	   			trackers[i].querySelectorAll(".artist")[k].insertAdjacentHTML("beforeend", artist)
	   			//and add the points
	   			trackers[i].querySelectorAll(".points")[k].innerHTML = points
	   		}

	   		//math time!

	   		//get the holder for all the points
	   		var totalPointsContainer = trackers[i].parentNode.querySelector(".points-total");
	   		//get all the points on this WME
	   		var allPoints = trackers[i].querySelectorAll(".points");

	   		var pointsArrary = []

	   		for (k = 0; k < allPoints.length; k++) {
	   			//remove all the non number characters from the innerhtml, split by spaces
	   			numbList = allPoints[k].innerHTML.toString().replace(/\D/g, ' ').split(" ");

	   			//and remove the empty spaces for a small, number only array
	   			var justNumbers = numbList.filter(item => {return !isNaN(parseFloat(item)) && isFinite(item);});

	   			//convert them to actual numbers
	   			var numberArray = justNumbers.map(Number);

	   			//add them to a larger array
	   			pointsArrary.push(...numberArray);

	   			//add ALL of them together
	   			var sum = pointsArrary.reduce((partialSum, a) => partialSum + a, 0);
				
				if ([k] == (allPoints.length - 1)) {
					//on the last iteration, add the number to the box
					totalPointsContainer.innerHTML = "total: " + sum + " points";
				}

	   		}
	   	}
   	}
}

//Math time

//get each box, get points total, and add them up


//////////Gallery 

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Event listeners for all keypress functions

document.addEventListener("keydown", keyPress);

function keyPress (e) {
  if(e.key === "Escape") {
    escapeClose();
  }

  if(e.key === "ArrowLeft") {
    tabLeft();
  }

  if(e.key === "ArrowRight") {
    tabRight();
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//This lets all display images open to a modal view
var imageWrapper = document.querySelectorAll(".image-wrapper");
//add listeners to all of the icons
for (i = 0; i < imageWrapper.length; i++) {
  imageWrapper[i].addEventListener('click', imageToggle);
}

function imageToggle() {

	if(event.target.parentElement.classList.contains("image-wrapper")) {
		return;
	}

	if(!this.classList.contains("open")) {
    	this.classList.add("open");
    	document.querySelector("body").classList.add("locked");
  	} else {
    	this.classList.remove("open");
    	document.querySelector("body").classList.remove("locked");
  	}
}

//This lets you close them with escape

function escapeClose (e) {
    var openModal = document.querySelectorAll(".image-wrapper.open");
    if(openModal.length !== 0) {
        openModal[0].classList.remove("open");
        document.querySelector("body").classList.remove("locked");
    }
}

//And THIS lets you close them with an x button inside
var closeButtons = document.querySelectorAll(".close-button");

for (i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener("click", buttonClose);
}

function buttonClose() {
  var openModal = this.closest(".open");
  openModal.classList.remove("open");
  document.querySelector("body").classList.remove("locked");
}

//This lets you tab left & right

//This lets all display images open to a modal view
var leftArrow = document.querySelectorAll(".left-arrow");
//add listeners to all of the icons
for (i = 0; i < leftArrow.length; i++) {
  leftArrow[i].addEventListener('click', tabLeft);
}

//This lets all display images open to a modal view
var rightArrow = document.querySelectorAll(".right-arrow");
//add listeners to all of the icons
for (i = 0; i < rightArrow.length; i++) {
  rightArrow[i].addEventListener('click', tabRight);
}

function tabLeft() {
  var openModal = document.querySelectorAll(".image-wrapper.open");
  if(openModal.length > 0) {

  	openModal[0].classList.remove("open");
    
    if(openModal[0].previousElementSibling !== null && openModal[0].previousElementSibling.classList.contains("image-wrapper")) {
      	openModal[0].previousElementSibling.classList.add("open");
      	document.querySelector("body").classList.add("locked");
    } else {
    	if(document.querySelectorAll(".image-wrapper.open").length == 0) {
    		document.querySelector("body").classList.remove("locked");
    	}
    }
  }
}

function tabRight() {
  var openModal = document.querySelectorAll(".image-wrapper.open");
  if(openModal.length > 0) {

  	openModal[0].classList.remove("open");

    if(openModal[0].nextElementSibling !== null && openModal[0].nextElementSibling.classList.contains("image-wrapper")) {
      	openModal[0].nextElementSibling.classList.add("open");
      	document.querySelector("body").classList.add("locked");
    } else {
      	if(document.querySelectorAll(".image-wrapper.open").length == 0) {
    		document.querySelector("body").classList.remove("locked");
    	}
    }
  }
}
