var listOfContainers;
var listOfLikeBars;
var listOfPosterName = [];
var listOfText = [];

var RedFrameObject;
var RedFrameBoolean = false;

//function to refresh the list of posts
function addNewPosts(){
    //get the list of posts and empty it first so it can be filled with the new posts
    ul = document.getElementById('listOfPosts');
    $(ul).empty();

    //get all the containers for the post
    listOfContainers = document.querySelectorAll('._5pcr.userContentWrapper:not(._4nef)');
    
    //refresh the content of the post item holders
    listOfText = [];
    listOfPosterName = [];
    
    //each container holds a post. For each container the name and more has to displayed
    for (var count=0; count < listOfContainers.length; count++){
        var posterName = listOfContainers.item(count).getElementsByClassName("fwb fcg");
        var postText = listOfContainers.item(count).getElementsByClassName("_5pbx userContent");
        
        
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

    }
    if (RedFrameBoolean){
        RedFrameObject.style.border = "";
        RedFrameBoolean = false;
    }
}

//mutation observer to be fired when the DOM changes of the facebook site
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
    var index = getNumberOfSelectedPost();
    var postID = listOfContainers.item(index).getElementsByClassName("_5pcq");
    postID = postID.item(0).href;
    //alert(postID);
    alert(document.getElementById("faceExtractor").getBoundingClientRect().top);
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


function test(){
    alert('just a test function');
}

window.onscroll = function () {
    var topDistance = document.getElementById("faceExtractor").getBoundingClientRect().top;
    document.getElementById("faceExtractor").style.top = (($(window).scrollTop()) + 50) + "px";
};


function homeRefresh() {
  window.setTimeout(function(){
      alert('hi');
    addNewPosts();
    }, 2000);

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

