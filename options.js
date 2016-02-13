// Save and load extension options

function save_options() {
    var autoResume = document.getElementById("autoResume");
    var enableQueue = document.getElementById("enableQueue");
    var RTESOptions = {
        autoResume: autoResume.checked,
        enableQueue: enableQueue.checked
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

function loadSaved() {
    chrome.storage.sync.get({
        autoResume: true,
        enableQueue: true
    }, function(items) {
        document.getElementById('autoResume').checked = items.autoResume;
        document.getElementById('enableQueue').checked = items.enableQueue;
    });
}

$(document).ready(function() {
    loadSaved()
    $("#saveOptions").on("click", function() {
        save_options();
    });
})