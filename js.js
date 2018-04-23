function addNewPosts(){
    div = document.getElementById('faceExtractor');
    ul = document.getElementById('listOfPosts');

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

    div.appendChild(ul);
}

var mutationObserver = new MutationObserver(
    function(mutations) {
        mutations.forEach(function(mutation) {
        console.log(mutation);
        });
    }
);

mutationObserver.observe(document.getElementById('contentArea'), {
  attributes: false,
  characterData: true,
  childList: true,
  subtree: false,
  attributeOldValue: false,
  characterDataOldValue: false
});




//script.innerHTML = 'function addNewPosts(){alert(\'hi from addNewPosts\');} $(\'body\').on(\"DOMSubtreeModified\", \"#contentArea\",function(){addNewPosts();});';

function sendPost(type){
    alert('You clicked me');
}



function test(){
    alert('just a test function');
}

