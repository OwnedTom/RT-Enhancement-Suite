$(document).ready(function() {
    loadPlayer();
});

function loadPlayer() {
    if(typeof videojs === "function") {
        var oldVideo = document.getElementsByClassName("jwplayer"); 
        var videoID = oldVideo[0].id; 
        var video = document.createElement("video");
        video.controls = "controls";
        video.id = videoID + "-vjs";
        var source = document.createElement("source");
        
        //videoDiv.appendChild(video);
        var v = jwplayer(videoID);
        var vjsOptions = {
            "controls": true,
            "preload": "auto",
            "autoplay": true,
            "poster": v.getConfig().image
        }
        $(video).attr("data-src")
        source.src = "https://crossorigin.me/" + v.getConfig().file;
        source.type = "application/x-mpegURL";
        video.appendChild(source);
        $(video).attr("class", "video-js vjs-default-skin");
        $(".container").empty().append($(video));
        var player = videojs(videoID + "-vjs", vjsOptions);
        $(document).on("resize", function() {
            var c = $(".container");
            $(".video-js").css({
                "height": ((c.width()/16)*9) + "px",
                "width": c.width() + "px"
            })
        });
        $(document).trigger("resize");
    } else {
        setTimeout(function() { loadPlayer(); }, 500);
    }
}