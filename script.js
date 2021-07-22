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

            console.log("Rendering Article ", i, " out of ", numberOfArticles, ".", " Title: ", data[i].articleHeader, ".");
            console.log("==============");
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

            // make backround text smaller if title longer than 15 chars

            /*if(data[i].articleHeader.length >=15) {
                doubleText.style.fontSize()
            }*/
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

Date.prototype.calcTimeFrom1970 = function(time) {
    let hours = new Date(time).getHours();
    let minutes = new Date(time).getMinutes();
    let seconds = new Date(time).getSeconds();

    let timeArray = [hours, minutes, seconds];

    const newArray = timeArray.map(unit => unit < 10 ? "0" + unit : unit)

    return `${newArray[0]}:${newArray[1]}:${newArray[2]}`
}

Date.prototype.formatMMDDYYYY = function(){
    let day, month;

    if(this.getDate() < 10) {
        // needs a 0 in front
        day = "0" + this.getDate();
    } else {
        day = this.getDate();
    }

    if((this.getMonth() + 1) < 10) {
        // needs a 0 in front
        month = "0" + (this.getMonth() + 1);
    } else {
        month = this.getMonth() + 1
    }

    return month + "-" +  day + "-" +  this.getFullYear();
};

Date.prototype.getCurrentTime = function() {
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();

    let timeArray = [hours, minutes, seconds];

    const newArray = timeArray.map(unit => unit < 10 ? "0" + unit : unit)

    return `${newArray[0]}:${newArray[1]}:${newArray[2]}`
}

async function calcRoute() {

    // --- Time -- 
        const currentDate = new Date().formatMMDDYYYY();
        const currentTime = new Date().getCurrentTime();
        console.log(currentDate, currentTime);
    //  

    // --- Location -- 
        let whereYou = document.getElementById("whereYou").value;
            if(!whereYou.includes("Bremen")) {
                whereYou+=", Bremen, Deutschland"
            } else {
                whereYou+=",Deutschland"
            }
            
        let whereGo = document.getElementById("whereGo").value;
            if(!whereGo.includes("Bremen")) {
                whereGo+=", Bremen, Deutschland"
            } else {
                whereGo+=", Deutschland"
            }

        console.log("Locations:")
        console.log(whereYou, "\n", whereGo);


    // gets route

        console.log("Getting route");

        //const url = `http://localhost:56565/api`
        const url = `https://take-the-bus.herokuapp.com/api`

        const data = {
            from: whereYou,
            to: whereGo,
            date: currentDate,
            time: currentTime
        }
        
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
        }
        
        fetch(url, requestOptions)
        .then(reponse => reponse.json())
        .then(result => {
            console.log(result);


            try {

                if(result == "error") {
                    alert("Die Route Konnte nicht berechnet werden, bitte versuche eine andere.");
                    return;
                }


            const startTime = result.startTime;
            const startPlace = result.startPlace;

            const endTime = result.endTime;
            const endPlace = result.endPlace;
            
            console.log(`From ${startPlace} to ${endPlace}`);

            // change popupWrapper

                //startLocation
                document.querySelector("#startLocation span").textContent = startPlace;
                document.querySelector("#startTime span").textContent = new Date().calcTimeFrom1970(startTime);

                //end
                document.querySelector("#endLocation span").textContent = endPlace;
                document.querySelector("#endTime span").textContent = new Date().calcTimeFrom1970(endTime);

            openPopup()
            }
            catch (e) {
                console.log(e);
                alert("Die Route Konnte nicht berechnet werden, bitte versuche eine andere.");
            }
        });
    
}

async function openPopup()  {

    console.log("Creating popup");

    let popup = document.getElementById("popupWrapper");
    popup.style.display = "flex"
    popup.style.opacity = 1;
    
}



async function closePopup() {
    var popupWrapper = document.getElementById("popupWrapper");

    popupWrapper.style.opacity = 0;
    await sleep(501);
    popupWrapper.style.display = "none";
}

function remindMe() {
    
}