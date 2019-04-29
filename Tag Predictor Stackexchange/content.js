chrome.runtime.onMessage.addListener(msg);


function msg(message, sender, sendResponse) {
    if (message.txt == "search") {
        selection = window.getSelection();
        var text = selection.toString();
        text = text.toLowerCase();
        var t = document.getElementById('title').value;
        var xhttp;
        var flag = 1;
        xhttp = new XMLHttpRequest();
        //alert('Hello');
        xhttp.onreadystatechange = function() {
            //alert(this.response);
            var str = this.response;
            var tags = str.split(',');
            tags = [...new Set(tags)];
            //alert(tags[0]);
            console.log(tags);
            document.getElementsByClassName('tag-editor s-input')[0].getElementsByTagName('span')[0].innerHTML = "";
            for (var i = 0; i < tags.length; i++) {
                if (i == 0) {
                    document.getElementsByClassName('tag-editor s-input')[0].getElementsByTagName('span')[0].innerHTML = "";
                    //<span class="s-tag rendered-element">cooking                                                                                                              <a class="js-delete-tag s-tag--dismiss" title="Remove tag"><svg style="pointer-events:none;" class="svg-icon iconClearSm" width="12" height="12" viewBox="0 0 14 14"><path d="M12 3.41L10.59 2 7 5.59 3.41 2 2 3.41 5.59 7 2 10.59 3.41 12 7 8.41 10.59 12 12 10.59 8.41 7z"></path></svg></a></span>
                }
                if (tags[i] != '' && tags[i] != null)
                    if ((document.getElementsByClassName('tag-editor s-input')[0].getElementsByTagName('span')[0].innerHTML).search("<span class=\"s-tag rendered-element\">" + tags[i] + "<a class=\"js-delete-tag s-tag--dismiss\" title=\"Remove tag\"><svg style=\"pointer-events:none;\" class=\"svg-icon iconClearSm\" width=\"12\" height=\"12\" viewBox=\"0 0 14 14\"><path d=\"M12 3.41L10.59 2 7 5.59 3.41 2 2 3.41 5.59 7 2 10.59 3.41 12 7 8.41 10.59 12 12 10.59 8.41 7z\"></path></svg></a></span>") < 0)
                        document.getElementsByClassName('tag-editor s-input')[0].getElementsByTagName('span')[0].innerHTML += "<span class=\"s-tag rendered-element\">" + tags[i] + "<a class=\"js-delete-tag s-tag--dismiss\" title=\"Remove tag\"><svg style=\"pointer-events:none;\" class=\"svg-icon iconClearSm\" width=\"12\" height=\"12\" viewBox=\"0 0 14 14\"><path d=\"M12 3.41L10.59 2 7 5.59 3.41 2 2 3.41 5.59 7 2 10.59 3.41 12 7 8.41 10.59 12 12 10.59 8.41 7z\"></path></svg></a></span>";
            }
            if (tags.length == 1) {
                // alert('No tags')
                flag = 0;
            }
        }
        console.log(t);
        console.log(document.domain);
        var domainName = document.domain;
        xhttp.open("GET", "http://127.0.0.1:5000/" + domainName + "/" + t, true);
        xhttp.send();
        //if(flag == 1)
        alert('Tags are inserted successfully!');
    }
}