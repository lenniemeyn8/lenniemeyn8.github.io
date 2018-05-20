var listOfContainers;
var listOfLikeBars;
var listOfPosterName;
var listOfText;

var RedFrameObject;
var RedFrameBoolean = false;

//function to refresh the list of posts
function addNewPosts(){
    //get the list of posts and empty it first so it can be filled with the new posts
    ul = document.getElementById('listOfPosts');
    $(ul).empty();


    //listOfContainers = document.getElementsByClassName("_5pcr userContentWrapper");
    listOfPosterName = document.querySelectorAll('div.userContentWrapper:not(._4nef)');
    
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
                var text = postText.item(0).children[0].innerHTML;
                var startText = text.substring(0, 20);
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
                var text = postText.item(0).children[0].innerHTML;
                var startText = text.substring(0, 10);
                a.innerHTML = posterName.item(0).children[0].innerHTML + ': ' + startText;
                li.appendChild(a);
                ul.appendChild(li);
            }
            
        }
        
    }
    if (RedFrameBoolean){
        RedFrameObject.style.border = "";
        RedFrameBoolean = false;
    }



    
//    listOfLikeBars = document.getElementsByClassName("_3399 _1f6t _4_dr _20h5");
//    listOfLikes = document.getElementsByClassName("_1g5v");
//    //listOfPosterName = document.getElementsByClassName("fwb");
//    listOfPosterName = document.querySelectorAll('span.fwb fcg:not(._d_q)');
//    listOfText = document.getElementsByClassName("_5pbx userContent");


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
    getNumberOfSelectedPost ();
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
            break;
        }
    }
}

function sendPost(type){
//    ul = document.getElementById('listOfPosts');
//    ulList = ul.children;
//    for(var i = 0;i < ulList.length;i++){
//        if (ulList[i].children[0].getAttribute('id') == 'selected'){
//            alert('Text:' + listOfText.item(i).children[0].innerHTML + '<br>' + 'Likes: ' + listOfLikes.item(i).children[0].innerHTML)
//            break;
//        }
//    }
    //alert('You clicked me');
    
    FB.login(function(response) {
        if (response.authResponse) {
         console.log('Welcome!  Fetching your information.... ');
         FB.api('/me', function(response) {
           console.log('Good to see you, ' + response.name + '.');
         });
        } else {
         console.log('User cancelled login or did not fully authorize.');
        }
    });
    
    FB.api('/10156448134209295', function(response) {
            console.log(response);}
    );

}


function test(){
    alert('just a test function');
}

