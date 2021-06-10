function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function hoverLabelOut(x) {
    x.previousElementSibling.style.opacity = 0;

}

function hoverLabel(x) {

    x.previousElementSibling.style.opacity = 1;

    /*
    var hoverTriggers = document.getElementsByClassName("hoverLabel");
    console.log(hoverTriggers);

    for (i = 0; i < hoverTriggers.length; i++) {
    
        hoverTriggers[i].nextElementSibling.addEventListener("mouseover", async function() {
            console.log(this);
            console.log(this.previousElementSibling);
            this.previousElementSibling.style.opacity = 1;
            await sleep(1000);
    
        })
    }
    */
}


function renderArticles() {
// take articles.json and render text

    $.getJSON("articles.json", function (data) {
        numberOfArticles = Object.keys(data).length;

        for(i = 0; i < numberOfArticles; i++) {

            var doubleText = document.createElement("span");

            var div = document.createElement("div");

            var header = document.createElement("h2");
            header.setAttribute("class", "forma");
            var textBody = document.createElement("p");
            textBody.setAttribute("class", "quicksandRegular");

            var articleBody =document.createElement("div");
            articleBody.setAttribute("class", "articleBody");
            var lowerContent = document.getElementById("lowerContent");

            lowerContent.appendChild(articleBody);

            articleBody.appendChild(doubleText);
            articleBody.appendChild(div);

            div.appendChild(header);
            div.appendChild(textBody);

            header.textContent = data[i].articleHeader;
            doubleText.textContent = data[i].articleHeader;
            textBody.textContent = data[i].articleText;
        }
    })
}


// Page switching 

function navbarSwitching(x) {
    var pastActive = document.getElementsByClassName("navbarActive")[0];

    pastActive.removeAttribute("class");
    pastActive.setAttribute("class", "navbar-item quicksandLight ")

    x.setAttribute("class", "navbarActive");
}

async function fadeOutContent() {
    var mainContent = document.getElementById("mainContent");
    
    mainContent.childNodes.forEach(async function (child) {
        if (child.nodeName != "#text") {
            child.style.opacity = 0;
            await sleep(501);
            child.remove();
        } else {
            await sleep(501);
        }
    })
}

async function fadeInContent() {
    console.log("Fading in content");
    var mainContent = document.getElementById("mainContent");
    
    mainContent.childNodes.forEach(async function (child) {
        if (child.nodeName != "#text") {
            child.style.opacity = 1;
            await sleep(501);
        } else {
            await sleep(501);
        }
    })
}


async function homeTransition() {
    fadeOutContent();
    var mainContent = document.getElementById("mainContent");

    function drawContent(json) {

        for (i = 1; i < Object.keys(json).length; i++) {

            // get parent
            var parentElement = document.getElementById(json[0].parent);

            var temp = document.createElement(json[i].type);

            if(json[i].attributes.id != undefined) {
                temp.setAttribute("id", json[i].attributes.id);
            } else {
                temp.setAttribute("class", json[i].attributes.class);
            }
            
            // assign text content
            if(json[i].name == "text") {
                temp.textContent = json[i].textContent;
            }

            mainContent.appendChild(temp);

            parentElement.appendChild(temp);
        }

    }

    // general divs
        var mainContentChildren = 
        [
            {
                "parent" : "mainContent"
            },
            {
                "name" : "upper",
                "type" : "div",
                "attributes": {"id" : "upper"},
            },
            {
                "name" : "lowerContent",
                "type" : "div",
                "attributes": {"id" : "lowerContent"},
            }
        ];

        drawContent(mainContentChildren);

        var upperChildren = 
        // "upperLeftSide","div", "upperRightSide","div", "learnMore", "div"
        [ 
            {
                "parent" : "upper",
            },
            {
                "name" : "upperleftSide",
                "type" : "div",
                "attributes": {"id" : "upperleftSide"},
            },
            {
                "name" : "upperRightSide",
                "type" : "div",
                "attributes": {"id" : "upperRightSide"},
            },
            {
                "name" : "learnMore",
                "type" : "div",
                "attributes": {"id" : "learnMore"},
            }
            
        ];
        drawContent(upperChildren);

        //drawContent(upperChildren);

        var upperLeftSideChildren = [ 
            // ["upperLeftSide", "title","h1", "subtitle","p", "calcBody", "div"];
            {
                "parent" : "upperleftSide",
            },
            {
                "name" : "text",
                "type" : "h1",
                "attributes": {"class" : "forma"},
                "textContent" : "Take the bus"
            },
            {
                "name" : "text",
                "type" : "h4",
                "attributes": {"class" : "alexa"},
                "textContent" : "because why not"
            },
            {
                "name" : "calcBody",
                "type" : "div",
                "attributes": {"id" : "calcBody"},
            }
            
        ];
        drawContent(upperLeftSideChildren);
        //drawContent(upperLeftSideChildren);

        var calcBodyChildren =  [ 
            //["calcBody", "button", "button"];
            {
                "parent" : "calcBody",
            },
            {
                "name" : "inputOuter",
                "type" : "div",
                "attributes": {"class" : "inputOuter"},
            },
            {
                "name" : "inputOuter",
                "type" : "div",
                "attributes": {"class" : "inputOuter"},
            },
            {
                "name" : "text",
                "type" : "button",
                "attributes": {"class" : "forma calcCommitBtn btn-primary btn"},
                "textContent": "Go!"
            }
        ];
        drawContent(calcBodyChildren);

        var inputOuter = document.getElementsByClassName("inputOuter");

        for (i = 0; i < inputOuter.length;i++) {

            var label = document.createElement("label");
            label.setAttribute("class", "inputLabel");
            label.setAttribute("for", "whereAreYou");
            label.textContent = "Where are you?";

            inputOuter[i].appendChild(label);

            var inputWrapper = document.createElement("div");
            inputWrapper.setAttribute("class", "inputWrapper");

            inputOuter[i].appendChild(inputWrapper);

            var inputGreenBox = document.createElement("div");
            inputGreenBox.setAttribute("class", "inputGreenBox");
            inputWrapper.appendChild(inputGreenBox);

            var arrow = document.createElement("img");
            arrow.setAttribute("class", "arrow inputArrow");
            arrow.setAttribute("src", "icons/arrowRight.svg");
            inputGreenBox.append(arrow);

            var input = document.createElement("input");
            input.setAttribute("name", "whereAreYou");
            input.setAttribute("type", "text");
            input.setAttribute("placeholder", "Alexanderplatz, Berlin");
            inputWrapper.appendChild(input);

        }

        var inputs = document.querySelectorAll("input");
        inputs[1].setAttribute("name", "whereGo")

        var labels = document.getElementsByClassName("inputLabel");
        labels[1].setAttribute("for","whereGo");
        labels[1].textContent = "Where would you like to go?";

    // upper Right side

        var bus = document.createElement("img");
        bus.setAttribute("id", "busIllustration");
        bus.setAttribute("src", "icons/illustration.png");

        var upperRightSide = document.getElementById("upperRightSide");
        upperRightSide.appendChild(bus);

        var learnMoreChilds = 
        [
            {
                "parent" : "learnMore"
            },
            {
                "name" : "text",
                "type" : "label",
                "attributes" : {"id" : "learnMoreLabel"},
                "textContent" : "learn more"
            },
            {
                "name" : "learnMoreBtn",
                "type" : "button",
                "attributes" : {"id" : "learnMoreBtn"}
            }
        ]

        drawContent(learnMoreChilds);

        var learnMoreLabel = document.getElementById("learnMoreLabel");
        learnMoreLabel.setAttribute("for", "moreBtn");
        learnMoreLabel.setAttribute("class", "hoverLabel quicksandLight");


        var learnMoreBtn = document.getElementById("learnMoreBtn");
        learnMoreBtn.setAttribute("onmouseover", "hoverLabel(this);");
        learnMoreBtn.setAttribute("onmouseout", "hoverLabelOut(this);");
        learnMoreBtn.setAttribute("name", "moreBtn");
        learnMoreBtn.setAttribute("type", "button");

        var learnMoreArrow = document.createElement("img");
        learnMoreArrow.setAttribute("class", "arrow moreInfoArrow");
        learnMoreArrow.setAttribute("src", "icons/arrowDown.svg");
        learnMoreBtn.appendChild(learnMoreArrow);
    
    // lower content 
        // re-render articles
        renderArticles();

    await sleep(500);
    fadeInContent();
}


async function aboutTransition() {
    console.log("about transition");

    fadeOutContent();

    var mainContent = document.getElementById("mainContent");

    var h1 = document.createElement("h1");
    h1.textContent = "Under construction.";

    mainContent.appendChild(h1);

    await sleep(500);
    fadeInContent();
}

async function openPopup()  {

    console.log("Creating popup");

    var mainContent = document.getElementById("mainContent");

    var popupWrapper = document.createElement("div");
    var routeWrapper = document.createElement("div");
    var routeWrapper2 = document.createElement("div");
    

    popupWrapper.setAttribute("id", "popupWrapper");
    routeWrapper.setAttribute("class", "routeWrapper");
    routeWrapper2.setAttribute("class", "routeWrapper");



    mainContent.prepend(popupWrapper);

    popupWrapper.appendChild(routeWrapper);
    popupWrapper.appendChild(routeWrapper2);
    

    // route Wrapper
    var inputGreenBox = document.createElement("div");
    inputGreenBox.setAttribute("class", "inputGreenBox");
    routeWrapper.appendChild(inputGreenBox);

        var currentLocationImg = document.createElement("img");
        currentLocationImg.setAttribute("src", "icons/currentLocation.svg");
        inputGreenBox.appendChild(currentLocationImg);




    var routeDetails = document.createElement("div")
    routeDetails.setAttribute("class", "routeDetails");
    routeWrapper.appendChild(routeDetails);

        var startLocationSpan = document.createElement("span");
        startLocationSpan.setAttribute("class", "quicksandRegular");
        startLocationSpan.textContent = "Start location";
        routeDetails.appendChild(startLocationSpan);

            var locationStartImg = document.createElement("img");
            locationStartImg.setAttribute("src", "icons/location.svg");
            startLocationSpan.prepend(locationStartImg);

        var startTimeSpan = document.createElement("span");
        startTimeSpan.setAttribute("class", "quicksandRegular");
        startTimeSpan.textContent = "14:52";
        routeDetails.appendChild(startTimeSpan);

            var timeStartImg = document.createElement("img");
            timeStartImg.setAttribute("src", "icons/clock.svg");
            startTimeSpan.prepend(timeStartImg);
    

    var inputGreenBox2 = document.createElement("div")
    inputGreenBox2.setAttribute("class", "inputGreenBox");
    routeWrapper2.appendChild(inputGreenBox2);

        var destinationImg = document.createElement("img");
        destinationImg.setAttribute("src", "icons/destination.svg");
        inputGreenBox2.appendChild(destinationImg);


    var routeDetails2 = document.createElement("div")
    routeDetails2.setAttribute("class", "routeDetails");
    routeWrapper2.appendChild(routeDetails2);

        var destinationSpan = document.createElement("span");
        destinationSpan.setAttribute("class", "quicksandRegular");
        destinationSpan.textContent = "Destination";
        routeDetails2.appendChild(destinationSpan);

            var locationEndImg = document.createElement("img");
            locationEndImg.setAttribute("src", "icons/location.svg");
            destinationSpan.prepend(locationEndImg);

        var destinationTimeSpan = document.createElement("span");
        destinationTimeSpan.setAttribute("class", "quicksandRegular");
        destinationTimeSpan.textContent = "14:52";
        routeDetails2.appendChild(destinationTimeSpan);

            var timeEndImg = document.createElement("img");
            timeEndImg.setAttribute("src", "icons/clock.svg");
            destinationTimeSpan.prepend(timeEndImg);



    var buttons = document.createElement("div");
    buttons.setAttribute("class", "flexCenter");
    popupWrapper.appendChild(buttons);

    var btn = document.createElement("button");
    btn.setAttribute("class", "forma calcCommitBtn btn-primary btn");
    btn.setAttribute("onclick", "remindMe();");
    btn.textContent = "Remind me";
    buttons.appendChild(btn);

    var h5 = document.createElement("h5");
    h5.setAttribute("class", "quicksandRegular");
    h5.setAttribute("onclick", "closePopup();");
    h5.textContent = "cancel";
    buttons.appendChild(h5);

    await sleep(150);
    popupWrapper.style.opacity = 1;
}



async function closePopup() {
    var popupWrapper = document.getElementById("popupWrapper");

    popupWrapper.style.opacity = 0;
    popupWrapper.style.width = 0;
    await sleep(501);

    popupWrapper.remove();
}