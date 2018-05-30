var listOfContainers;
var listOfLikeBars;


var listOfPosterName = [];
var listOfText = [];
var listOfDatesPublished = [];
var listOfPrivacyStatus = [];
var listOfShares = [];

var RedFrameObject;
var RedFrameBoolean = false;

var shallRefresh = false;
var topDistance = 50;

var refreshCounter = 0;

var listCounter = 0;

//function to refresh the list of posts
function addNewPosts(){
    
    //check how many items are in the list and if that amount changed
    if (listCounter != document.querySelectorAll('._5pcr.userContentWrapper:not(._4nef)').length){
        
    } else {
        
    }
    
    //get the list of posts and empty it first so it can be filled with the new posts
    ul = document.getElementById('listOfPosts');
    $(ul).empty();

    //get all the containers for the post
    listOfContainers = document.querySelectorAll('._5pcr.userContentWrapper:not(._4nef)');
    
    //refresh the content of the post item holders
    listOfText = [];
    listOfPosterName = [];
    listOfDatesPublished = [];
    listOfPrivacyStatus = [];
    listOfShares = [];
    
    //each container holds a post. For each container the name and more has to displayed
    for (var count=0; count < listOfContainers.length; count++){
        var posterName = listOfContainers.item(count).getElementsByClassName("fwb fcg");
        var postText = listOfContainers.item(count).getElementsByClassName("_5pbx userContent");
        var postDate = listOfContainers.item(count).querySelectorAll('.timestamp');
        var postPrivacy = listOfContainers.item(count).querySelectorAll('.uiStreamPrivacy');
        var postShares = listOfContainers.item(count).querySelectorAll('._ipm._2x0m');
        
        //check if items are zero
        if (postPrivacy.item(0) == null){
            postPrivacy = listOfContainers.item(count).querySelectorAll('._6a._29ee._4f-9._43_1');
        }
        
        if (posterName.item(0) == null){
            var posterName = listOfContainers.item(count).getElementsByClassName("fwb");
            if (postText.item(0) == null){
                //create the element to add to the list of posts without the text!
                var li = document.createElement("li");
                var a = document.createElement("a");
                a.setAttribute('href', '#');
                a.innerHTML = posterName.item(0).children[0].innerHTML;
                li.appendChild(a);
                ul.appendChild(li);
            } else {
                //create the element to add to the list of posts
                var li = document.createElement("li");
                var a = document.createElement("a");
                a.setAttribute('href', '#');
                postText = postText.item(0).textContent;
                var startText = postText.substring(0, 20);
                a.innerHTML = posterName.item(0).children[0].innerHTML + ': ' + startText;
                li.appendChild(a);
                ul.appendChild(li);
            }
        } else {
            if (postText.item(0) == null){
                //create the element to add to the list of posts without the text!
                var li = document.createElement("li");
                var a = document.createElement("a");
                a.setAttribute('href', '#');
                a.innerHTML = posterName.item(0).children[0].innerHTML;
                li.appendChild(a);
                ul.appendChild(li);
            } else {
                //create the element to add to the list of posts
                var li = document.createElement("li");
                var a = document.createElement("a");
                a.setAttribute('href', '#');
                postText = postText.item(0).textContent;
                var startText = postText.substring(0, 20);
                a.innerHTML = posterName.item(0).children[0].innerHTML + ': ' + startText;
                li.appendChild(a);
                ul.appendChild(li);
            }    
        }
        //check if there is a subcontainer in the container
        if (listOfContainers.item(count).getElementsByClassName("_5pcr userContentWrapper").length >= 1){
            //do something because 2 items were added to the list that belong to the same post
            //listOfContainers.item(count + 1).remove();
            //count++;
        }
        //add the attributes of each
        listOfText.push(postText);
        listOfPosterName.push(posterName.item(0).children[0].innerHTML);
        listOfPrivacyStatus.push(postPrivacy.item(0).getAttribute("aria-label"));
        
        if (postDate.item(0) == null){
            listOfDatesPublished.push("undefined");
        } else {
            listOfDatesPublished.push(postDate.item(0).title);
        }
        
        if (postShares.item(0) == null){
            listOfShares.push(0);
        } else {
            listOfShares.push(postShares.item(0).textContent);
        }
        

    }
    if (RedFrameBoolean){
        RedFrameObject.style.border = "";
        RedFrameBoolean = false;
    }
}

//mutation observer to be fired when a new post is added
var mutationObserver = new MutationObserver(
    function(mutations) {
        mutations.forEach(function(mutation) {
        //alert (mutation.addedNodes);
        console.log(mutation);
        });
        addNewPosts();
    }

);

mutationObserver.observe(document.getElementById('contentArea'), {
 // attributes: true,
 // characterData: true,
  childList: true,
  subtree: true
//  attributeOldValue: true,
//  characterDataOldValue: true
});

//mutation observer to be fired when the DOM changes of the facebook site
var mutationObserverBig = new MutationObserver(
    function(mutations) {
        console.log("eins eins eins eins eins eins + " + shallRefresh);
        if (document.getElementById('listOfPosts').getElementsByTagName("li") == null){
            console.log("kein Wert in der Liste");
        }
       if (shallRefresh) {
           refreshCounter++;
           addNewPosts();
           if (refreshCounter > 10){
               shallRefresh = false;
               refreshCounter = 0;
           }   
       }       
    }
);

mutationObserverBig.observe(document.getElementById('u_0_j'), {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true,
  attributeOldValue: true,
  characterDataOldValue: true
});





document.getElementById('listOfPosts').addEventListener('click', function(e) {
  var selected;

  if(e.target.tagName === 'A') {
    selected = document.getElementById('selected');
    if(selected) selected.setAttribute('id', '');
    e.target.setAttribute('id', 'selected');
    getNumberOfSelectedPost();
  }
});

//function to set a red border around a post so the user know which post is selected
function setRedFrame(number){
    if (RedFrameBoolean){
        RedFrameObject.style.border = "";
        RedFrameObject = listOfContainers.item(number);
        RedFrameObject.style.border = "2px solid red";
    } else {
        RedFrameObject = listOfContainers.item(number);
        RedFrameObject.style.border = "2px solid red";
        RedFrameBoolean = true;
    }

}

function getNumberOfSelectedPost(){
    ul = document.getElementById('listOfPosts');
    ulList = ul.children;
    for(var i = 0;i < ulList.length;i++){
        if (ulList[i].children[0].getAttribute('id') == 'selected'){
            setRedFrame(i);
            return i;
            break;
        }
    }
}

function sendPost(type){
   var csrftoken = getCookie('csrftoken');
   var data = {number_of_words : 10, csrfmiddlewaretoken: csrftoken};
    $.post('https://lennie-masterthesis.herokuapp.com/setFeatures/', data, function(response){

            alert('hi');
    });
    
    var index = getNumberOfSelectedPost();
    console.log('Anzahl Shares: ' + listOfShares[index]);
    
//    ul = document.getElementById('listOfPosts');
//    ulList = ul.children;
//    for(var i = 0;i < ulList.length;i++){
//        if (ulList[i].children[0].getAttribute('id') == 'selected'){
//            alert('Text:' + listOfText.item(i).children[0].innerHTML + '<br>' + 'Likes: ' + listOfLikes.item(i).children[0].innerHTML)
//            break;
//        }
//    }
        //listOfBars = document.getElementsByClassName("_42nr _1mtp");
    //listOfLikeBars = document.getElementsByClassName("_3399 _1f6t _4_dr _20h5")
    //alert('You clicked me');
    //
    //FB.login(function(response) { alert(response.authResponse.accessToken);
    // });
//    FB.api('/10156448134209295', function(response) {
//            console.log(response);}
//    );

}

function facebookLogin(){
        FB.login(function(response) { alert(response.authResponse.accessToken);
        });
}

function postForGraphAPI(){
     var index = getNumberOfSelectedPost();
     var postID = listOfContainers.item(index).getElementsByClassName("_5pcq");
     postID = postID.item(0).href;
     alert(document.getElementById("faceExtractor").getBoundingClientRect().top);
}


function test(){
    alert('just a test function');
}


function loopRefresh () {
    console.log("loop refresh method call");
//    if (shallRefresh){
//        setTimeout(function(){
//            alert('hi from loopRefresh');
//            addNewPosts();
//            loopRefresh()
//    }, 5000);
//    } else {
//        console.log("Shall Refresh is false");
//        setTimeout(function(){
//            loopRefresh()
//    }, 5000);
//    }
}

//function that gets added to the onclick event on the Home button
function homeRefresh() {
    shallRefresh = true;
    console.log("Home Button was pressed");
 // var timer = setTimeout(function(){
    //  alert('hi');
    //addNewPosts();
   // }, 2000);

}


dragElement(document.getElementById(("faceExtractor")));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// using jQuery, to get cookie by name
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

