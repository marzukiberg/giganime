import { chain, trim } from "lodash";
import Scraper from "scraperjs";
import { server1, server2, server3 } from "../utils/constants";

export const getGenres = async () => {
  const items1 = await Scraper.StaticScraper.create(server1).scrape(function (
    $
  ) {
    const lists = $("ul.genre li")
      .map(function () {
        if (
          $(this).find("a").attr("href") !==
          "https://animeindo.one/genre/styledisplay-nonemusic/"
        ) {
          return {
            // abjad: $(this).find(".listabj").text(),
            link: $(this)
              .find("a")
              .attr("href")
              .replace(server1 + "genre/", "/genres/"),
            text: $(this).find("a").get(0).children[0].data,
            abjad: $(this).find("a").get(0).children[0].data.charAt(0),
          };
        }
      })
      .get();
    const data = chain(lists)
      .groupBy("abjad")
      .map((value, key) => ({ abjad: key, lists: value }))
      .value();

    return { source: server1, data };
  });

  if (items1.data.length > 0) {
    return items1;
  }

  const items2 = await Scraper.StaticScraper.create(
    server2 + "list-genre/"
  ).scrape(function ($) {
    const temp = $(".list-genre a")
      .map(function () {
        return {
          link: $(this).attr("href"),
          text: $(this).text(),
          abjad: $(this).text().charAt(0),
        };
      })
      .get();

    const data = chain(temp)
      .groupBy("abjad")
      .map((val, key) => ({ abjad: key, lists: val }))
      .value();

    return { source: server2, data: data };
  });

  if (items2.data.length > 0) {
    return items2;
  }

  const items3 = await Scraper.StaticScraper.create(server3 + "a-z/").scrape(
    function ($) {
      const lists = $("ul.genre li")
        .map(function () {
          return {
            link: $(this)
              .find("a")
              .attr("href")
              .replace(server3 + "genre/", "/genres/"),
            text: $(this).find("a").get(0).children[0].data,
            abjad: $(this).find("a").get(0).children[0].data.charAt(0),
          };
        })
        .get();
      const data = chain(lists)
        .groupBy("abjad")
        .map((value, key) => ({ abjad: key, lists: value }))
        .value();

      return { source: server3, data };
    }
  );

  if (items3.data.length > 0) {
    return items3;
  }

  return [];
};

export const getAnimeByGenre = async (genre) => {
  const items1 = await Scraper.StaticScraper.create(
    `${server1}genre/${genre}/`
  ).scrape(function ($) {
    const title = $(".widget-title").text().trim();
    const data = $(".animepost")
      .map(function () {
        const link = $(this).find("a").attr("href").split("/");
        return {
          path: "/anime/" + link[link.length - 2] + "/",
          title: $(this).find(".data .title").text(),
          img: $(this).find("img").attr("src"),
          eps: "",
          type: $(this).find(".data .type").text(),
          rating: $(this).find(".score").text().trim(),
        };
      })
      .get();

    const pagination = $(".pagination")
      .map(function () {
        return {
          current: $(this).find(".current").text(),
          prev: $(this)
            .find("a.arrow_pag ")
            .has("#prevpagination")
            .attr("href")
            ?.replace(server1 + "genre/", "/genres/"),
          next: $(this)
            .find("a.arrow_pag")
            .has("#nextpagination")
            .attr("href")
            ?.replace(server1 + "genre/", "/genres/"),
          links: $(this)
            .find("a")
            .not(".arrow_pag")
            .map(function () {
              return {
                link: $(this)
                  .attr("href")
                  ?.replace(server1 + "genre/", "/genres/"),
                text: $(this).text(),
              };
            })
            .get(),
        };
      })
      .get(0);

    return { source: server1, title, data, pagination };
  });

  if (items1.data.length > 0) {
    return items1;
  }

  const items2 = await Scraper.StaticScraper.create(
    `${server2}genres/${genre}/`
  ).scrape(function ($) {
    const title = $(".ngiri .title").text().trim();
    const data = $("table tr")
      .map(function () {
        if ($(this).find("a").attr("href") !== "/anime-list/") {
          return {
            path: $(this).find("a").attr("href"),
            title: $(this).find("a").text().trim(),
            img: server2.slice(0, -1) + $(this).find("img").attr("src"),
            type: $(this)
              .find(".videsc span")
              .map(function () {
                return $(this).text().trim();
              })
              .get(0),
            rating: $(this).find(".score").text().trim(),
          };
        }
      })
      .get();

    const pagination = $(".pag")
      .map(function () {
        return {
          current: $(this).find(".cur").text(),
          prev: $(this)
            .find("a:contains('«')")
            .attr("href")
            ?.replace(server2, "/"),
          next: $(this)
            .find("a:contains('»')")
            .attr("href")
            ?.replace(server2, "/"),
          links: $(this)
            .find("a")
            .not(":contains('»')")
            .not(":contains('«')")
            .map(function () {
              return {
                link: $(this).attr("href")?.replace(server2, "/"),
                text: $(this).text(),
              };
            })
            .get(),
        };
      })
      .get(0);

    return { source: server2, title, data, pagination };
  });

  if (items2.data.length > 0) {
    return items2;
  }

  const items3 = await Scraper.StaticScraper.create(
    `${server3}genre/${genre}/`
  ).scrape(function ($) {
    const title = $(".widget-title").text().trim();
    const data = $(".animepost")
      .map(function () {
        const link = $(this).find("a").attr("href").split("/");
        return {
          path: "/anime/" + link[link.length - 2] + "/",
          title: $(this).find(".data .title").text(),
          img: $(this).find("img").attr("src"),
          eps: "",
          type: $(this).find(".data .type").text(),
          rating: $(this).find(".score").text().trim(),
        };
      })
      .get();

    const pagination = $(".pagination")
      .map(function () {
        return {
          current: $(this).find(".current").text(),
          prev: $(this)
            .find("a.arrow_pag ")
            .has("#prevpagination")
            .attr("href")
            ?.replace(server3 + "genre/", "/genres/"),
          next: $(this)
            .find("a.arrow_pag")
            .has("#nextpagination")
            .attr("href")
            ?.replace(server3 + "genre/", "/genres/"),
          links: $(this)
            .find("a")
            .not(".arrow_pag")
            .map(function () {
              return {
                link: $(this)
                  .attr("href")
                  ?.replace(server3 + "genre/", "/genres/"),
                text: $(this).text(),
              };
            })
            .get(),
        };
      })
      .get(0);

    return { source: server3, title, data, pagination };
  });

  if (items3.data.length > 0) {
    return items3;
  }

  return [];
};
