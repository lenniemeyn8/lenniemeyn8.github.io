var listOfContainers;
var listOfLikeBars;
var listOfPosterName;
var listOfText;

function addNewPosts(){
    ul = document.getElementById('listOfPosts');
    $(ul).empty();

    listOfContainers = document.getElementsByClassName("_5pcr userContentWrapper");
    listOfLikeBars = document.getElementsByClassName("_3399 _1f6t _4_dr _20h5");
    listOfPosterName = document.getElementsByClassName("fwb fcg");
    listOfText = document.getElementsByClassName("js_2vw");

    for (var count=0;count < listOfPosterName.length ; count++){
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.setAttribute('href', '#');
        var titleChildren = listOfPosterName.item(count).children;
        a.innerHTML = titleChildren[0].innerHTML;
        li.appendChild(a);
        ul.appendChild(li);
    }
}

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

function setRedFrame(number){
    alert(number);
    listOfContainers.item(number).style.border = "1px solid red";
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
    alert('You clicked me');
}





function test(){
    alert('just a test function');
}

