// Save and load extension options

function saveOptions() {
    var autoResume = document.getElementById("autoResume");
    //var enableQueue = document.getElementById("enableQueue");
    var RTESOptions = {
        autoResume: autoResume.checked,
        //enableQueue: enableQueue.checked
    }
    //localStorage.setItem("RTESOptions", JSON.stringify(RTESOptions));
    chrome.storage.sync.set(RTESOptions, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

function saveExpFeatures() { 
    var HTML5Player = document.getElementById("HTML5Player");
    var RTESOptions = {
        HTML5Player: HTML5Player.checked
    }
    chrome.storage.sync.set(RTESOptions, function() {
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

function loadSavedOptions() {
    chrome.storage.sync.get({
        autoResume: true,
        //enableQueue: true
    }, function(items) {
        document.getElementById('autoResume').checked = items.autoResume;
        //document.getElementById('enableQueue').checked = items.enableQueue;
    });
}

function loadSavedExpFeatures() {
    chrome.storage.sync.get({
        HTML5Player: false
    }, function(items) {
        document.getElementById("HTML5Player").checked = items.HTML5Player;
    });
}

$(document).ready(function() {
    if(window.location.href.indexOf("experimental") > -1) {
        loadSavedExpFeatures();
    } else if(window.location.href.indexOf("options") > -1) {
        loadSavedOptions();
    }
    $("#saveOptions").on("click", function() {
        saveOptions();
    });
    $("#saveExpFeatures").on("click", function() {
        saveExpFeatures();
    });
})