var video = document.createElement("div");
var staticImage = document.querySelector("#static_image");
var bg = document.querySelector("#water_background");
function onResize() {
    var W = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var H = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    if (bg.getBoundingClientRect) {
        W = bg.getBoundingClientRect().width;
        H = bg.getBoundingClientRect().height;
    }
    var aspect = 16/9;
    if (H*aspect < W) {
        staticImage.style.left = staticImage.style.right = 
        video.style.left = video.style.right = "0px";
        staticImage.style.top = video.style.top = ~~((H - W/aspect)/2) + "px";
        staticImage.style.width = (video.width = W) + "px";
        staticImage.style.height = (video.height = W/aspect) + "px";
    } else {
        staticImage.style.top = staticImage.style.bottom = 
        video.style.top = video.style.bottom = "0px";
        staticImage.style.left = video.style.left = ~~((W - H*aspect)/2) + "px";
        staticImage.style.width = (video.width = H*aspect) + "px";
        staticImage.style.height = (video.height = H) + "px";        
    }
}
//video.defaultPlaybackRate = 10;
//video.play();
onResize();
window.onresize = onResize;

var loading = document.querySelector("#loading");
window.onload = function () {
    loading.style.opacity = 0;
    setTimeout(function () {
        loading.style.display = "none";
    }, 750);
}

// Google Play Button
var gpBtn = document.querySelector("#googleplay-button");
var countryCode = null;
request("http://ip-api.com/json").then(data => {
    countryCode = data.countryCode.toLowerCase();
    
    var image = new Image();
    // if badge available in this country
    image.onload = function () {
        gpBtn.src = image.src;
    }
    image.src = "https://play.google.com/intl/en_us/badges/images/generic/"+countryCode+"_badge_web_generic.png";
}); 

function request(url, cb) {
    var c = {cb: cb};
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.send();
    req.onreadystatechange = function () {
        if (req.readyState != 4) return;
        
        if (req.status != 200) {
            console.log("XMLHttpRequest: Request (" + url + ") error (" + req.status + ":" + req.statusText + ")");
        } else {
            if (c.cb) {
                result = req.responseText;
                try { result = JSON.parse(result); } catch (e) {}
                c.cb(result);
            }
        }
    };
    return {
        then: function (cb1) {
            c.cb = cb1;
        }
    }
}
