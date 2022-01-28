const axios = require("axios");
const cheerio = require("cheerio");
const { server1 } = require("../../utils/constants");

const dataServer1 = async () => {
  try {
    const { data } = await axios.get(server1 + "anime-terbaru/");
    const $ = cheerio.load(data);
    const animeData = $(".animepost")
      .map(function () {
        const link = $(this).find("a").attr("href").split("/");
        return {
          path: "/anime/" + link[link.length - 2] + "/",
          title: $(this).find(".dataver2 .title").text(),
          img: $(this).find("img").attr("src"),
          eps: $(this).find(".data .episode").text(),
        };
      })
      .get();

    const pagination = $(".pagination")
      .map(function () {
        return {
          current: $(this).find(".current").text(),
          prev: $(this)
            .find("a.arrow_pag")
            .has("#prevpagination")
            .attr("href")
            ?.match(/\d/g)
            ?.join(""),
          next: $(this)
            .find("a.arrow_pag")
            .has("#nextpagination")
            .attr("href")
            ?.match(/\d/g)
            ?.join(""),
          links: $(this)
            .find("a")
            .not(".arrow_pag")
            .map(function () {
              return {
                link: $(this).attr("href")?.match(/\d/g)?.join(""),
                text: $(this).text(),
              };
            })
            .get(),
        };
      })
      .get(0);

    return { source: server1, pagination, data: animeData };
  } catch (error) {
    return {
      source: server1,
      error,
      data: [],
    };
  }
};

module.exports = dataServer1;
