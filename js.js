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

//script.innerHTML = 'function addNewPosts(){alert(\'hi from addNewPosts\');} $(\'body\').on(\"DOMSubtreeModified\", \"#contentArea\",function(){addNewPosts();});';

function sendPost(type){
    alert('You clicked me');
}

function test(){
    alert('just a test function');
}

