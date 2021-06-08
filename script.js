function renderArticles() {
// take articles.json and render text

    $.getJSON("articles.json", function (data) {
        numberOfArticles = Object.keys(data).length;

        for(i = 0; i < numberOfArticles; i++) {
            var header = document.createElement("h2");
            header.setAttribute("class", "forma");
            var textBody = document.createElement("p");
            textBody.setAttribute("class", "quicksandRegular");

            var articleBody =document.createElement("div");
            articleBody.setAttribute("class", "articleBody");
            var lowerContent = document.getElementById("lowerContent");

            lowerContent.appendChild(articleBody);

            articleBody.appendChild(header);
            articleBody.appendChild(textBody);

            header.textContent = data[i].articleHeader;
            textBody.textContent = data[i].articleText;
        }
    })
}
