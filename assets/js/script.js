async function customstatus() {
    const presence = (await fetch("https://api.lanyard.rest/v1/users/280696584889696257").then(_res => _res.json()).catch(() => null))?.data;
    if (!presence) return;
    const customStatus = presence.activities.find(_activity => _activity.name === "Custom Status");
    if (customStatus) document.getElementsByClassName("statuss")[0].innerHTML = `${customStatus.emoji?.id ? `<img id="custom-status-emoji" src="https://cdn.discordapp.com/emojis/${customStatus.emoji.id}.${customStatus.emoji.animated ? "gif" : "png"}?size=24&quality=lossless">` : ""} ${customStatus.state}`;

}

customstatus();
setInterval(customstatus, 5000);

var statusIcon = document.getElementById("statusIcon");
        var statusContent = document.getElementById("statusContent");

        const lanyard = new WebSocket("wss://api.lanyard.rest/socket");

        var api = {};
        var received = false;

        lanyard.onopen = function () {
            lanyard.send(
                JSON.stringify({
                    op: 2,
                    d: {
                        subscribe_to_id: "280696584889696257", // YOUR DISCORD ID
                    },
                })
            );
        };

        setInterval(() => {
            if (received) {
                lanyard.send(
                    JSON.stringify({
                        op: 3,
                    })
                );
            }
        }, 30000);

        lanyard.onmessage = function (event) {
            received = true;
            api = JSON.parse(event.data);

            if (api.t === "INIT_STATE" || api.t === "PRESENCE_UPDATE") {
                update_presence();
            }
        };

        

function update_presence() {
    if (statusIcon != null) {
        update_status(api.d.discord_status);
    }
    if(api.d.activities.find(_activity => _activity.name === "Code")) {
        let state = api.d.activities.find(_activity => _activity.name === "Code").state;
        let details = api.d.activities.find(_activity => _activity.name === "Code").details;
        vscode.innerHTML = `<img
        src="https://cdn.discordapp.com/emojis/967448980847997019.png?size=20&quality=lossless"
        draggable="false" style="position: relative; top: 3px;"><i class="fab fa-spotify text-green-500 ml-1"></i> <strong>Workspace:</strong> ${details} - ${state}`;
    } else {
        vscode.innerHTML = ``;
    }
    if (api.d.listening_to_spotify == true) {
        spotifyContent.innerHTML = `<img
        src="https://cdn.discordapp.com/emojis/918241354172227665.png?size=20&amp;quality=lossless"
        draggable="false" style="position: relative; top: 3px;"><i class="fab fa-spotify text-green-500 ml-1"></i> Listening <a class="link" target="_blank" href="https://open.spotify.com/track/${api.d.spotify.track_id}"><b>${api.d.spotify.song}</b></a> by <b>${api.d.spotify.artist.split(";")[0].split(",")[0]}</b> on spotify.`;
    } else {
        spotifyContent.innerHTML = ``;
    }
}

function copymail() {
        navigator.clipboard.writeText('aw3rque@gmail.com') 
        console.log("mail kopyalandi!")
    }