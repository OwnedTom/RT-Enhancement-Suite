$(document).ready(function() {
    // Get options from Chrome Profile
    chrome.storage.sync.get({
        autoResume: true,
        enableQueue: true
    }, function(items) {
        // If autoResume and video on page
        if(items.autoResume && $(".jwplayer").length > 0) {
            addAutoResumeScript();
        }
        /*if(items.enableQueue) {
            enableQueue();
        }
        if($(".jwplayer").length > 0) {
            showCinemaBtn();
        }*/
    });
});

// Not Implemented Yet
/*function showCinemaBtn() {
    var v = $(".jwplayer").first()
    v.parent().append($("<button id='cinemaMode'>Cinema</button>"));
    $("#cinemaMode").on("click", function() {
        v.data("oldHeight", v.height());
        v.data("oldWidth", v.width());
        v.css({"position": "absolute", "top": "0px", "left": "0px", "z-index": "100"});
        var scriptContent = 
        'var videoID = document.getElementsByClassName("jwplayer")[0].id;' +
        'var v = jwplayer(videoID);' +
        'v.resize($(window).width(), $(window).height());';
        var script = document.createElement("script");
        script.onload = function() {
            this.parentNode.removeChild(this);
        };
        script.appendChild(document.createTextNode(scriptContent));
        (document.head||document.documentElement).appendChild(script);
        setTimeout(function() {
            scriptContent
        })
    });
}*/

/*function enableQueue() {
    $(".episode-action-bar").each(function() {
        var qCont = $("<div id='addQueue'></div>");
        var qBtn = $("<button id='addQueueBtn'>+</button>");
        qCont.append(qBtn);
        $(this).prepend(qCont);
    })
}*/

function addAutoResumeScript() {
    // Inject auto resume script into page
    var script = document.createElement("script");
    script.src = chrome.extension.getURL('autoResume.js');
    script.onload = function() {
        this.parentNode.removeChild(this);
    }
    // Wait for event with current video time
    document.addEventListener('RTES_autoResume_set', function(e) {
        var data = {};
        data[e.detail.videoID] = e.detail.time;
        // Sync video time with Chrome profile
        chrome.storage.sync.set(data);
    });
    // Wait for page to request the previous video time
    document.addEventListener('RTES_autoResume_getPrevious', function(e) {
        var data = {};
        data[e.detail.videoID] = 0;
        chrome.storage.sync.get(data, function(items) {
            var t = items[e.detail.videoID];
            // Send previous video time to page
            document.dispatchEvent(new CustomEvent('RTES_autoResume_gotPrevious', {
                detail: {
                    videoID: e.detail.videoID,
                    time: t
                }
            }));
        });
    });
    (document.head||document.documentElement).appendChild(script);
}

