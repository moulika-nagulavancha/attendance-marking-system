"use strict";

var $ = (id) => document.getElementById(id);

document.addEventListener("DOMContentLoaded", () => {
    // implementation of slide show

    // the actual image where the slideshow needs to be shown
    const mainImage = $("main_image");
    // get all te images that needs to be shown in the slideshow
    const imageLinks = document.getElementsByClassName("hide");

    let imageCache = [];
    // Get the images which needs to be shown on the slideshow into a cache variable.
    for(let imageLink of imageLinks) {
        let image = new Image();
        image.src = imageLink.src;
        image.alt = imageLink.alt;

        imageCache[imageCache.length] = image;
    }

    // counter and setInterval functions to calculate the timelapse on the slideshow
    let imageCounter = 0;
    const timeFunc = setInterval(() => {
        imageCounter = (imageCounter + 1) % imageCache.length;

        let image = imageCache[imageCounter];
        mainImage.src= image.src;
        mainImage.alt = image.alt;
    }, 2000);

    // set the number of absent students to 0 and keep the text color in green.
    $("absentStudentsText").innerHTML = "The number of students absent = 0";
    $("absentStudentsText").style.color = "green";

    // check the click listener for the tabe cell and highlight accordingly for table
    $("table").addEventListener("click", (e) => {
        e.preventDefault();
        // Function only when the click is done on the table cell and not on the hidden cells or the table.
        if (e.target != null && (e.target.tagName == "td" || e.target.tagName == "TD")) {
            highlightAndCountAbsentStudents(e.target);
        }
    });

});

function highlightAndCountAbsentStudents(td) {
    // Counter variable to keep check on the number of absent students.
    var absentCount = 0;

    // toggle the selected table cell to red marking as absent.
    td.classList.toggle("highlight_in");

    // After highlighting the absent student need to increase the absentCount counter.
    const tableList = $("table").querySelectorAll("td");
    
    // iterate over the table cells of students tables and count the cells which are highlighted.
    for(let i = 0; i < tableList.length; i++) {
        if(tableList[i].className == "highlight_in") {
            absentCount++;
        }
    }

    /** update the counter value for the h3 tag created to show the absent student count.
     *  Also, change the text color to red if the count >0
     *  else color should be green if count =0
     *  */ 
    $("absentStudentsText").innerHTML = "The number of students absent = " + absentCount;
    if (absentCount > 0) {
        $("absentStudentsText").style.color = "red";
    } else {
        $("absentStudentsText").style.color = "green";
    }
}