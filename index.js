const PORT = 8080;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const app = express();
app.listen(PORT);

const url = "https://www.techcrunch.com";
let articles = [];

axios(url).then((res) => {
  const html = res.data;
  const $ = cheerio.load(html);

  $(".post-block__title", html).each(function () {
    const title = $(this)
      .text()
      .trim()
      .replace(/[\t\n\r]+/g, "");
    const newsURL = $(this).find("a").attr("href");
    articles.push({
      title: title,
      newsURL: newsURL,
    });
  });
});

app.get("/", (req, res) => {
  res.send(articles);
});
