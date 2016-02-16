var t = 0; var firstPlay = true; 

// Store the current video time and loop
var setCurrentTime = function(videoID, url) { 
    if(!firstPlay) 
    { 
        var v = jwplayer(videoID); 
        var t = v.getPosition(); 
        if(v.getState() == "playing"){
            document.dispatchEvent(new CustomEvent('RTES_autoResume_set', {
                detail: {videoID: videoID, time: t}
            }));
            setTimeout(function() { setCurrentTime(videoID,url) }, 1000); 
        } 
    }  
}
if(typeof jwplayer !== "undefined") { 
    var url = window.location.href; 
    var video = document.getElementsByClassName("jwplayer"); 
    var videoID = video[0].id; 
    var v = jwplayer(videoID); 
    v.onPlay(function() { 
        if(firstPlay) { 
            firstPlay = false;
            // Get the previous video time 
            document.dispatchEvent(new CustomEvent("RTES_autoResume_getPrevious", {
                detail: {
                    videoID: videoID
                }
            }));
            document.addEventListener("RTES_autoResume_gotPrevious", function(e) {
                var v = jwplayer(videoID); 
                v.seek(e.detail.time);
            })
        }
        setCurrentTime(videoID,url); 
    }); 
}