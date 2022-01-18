import { chain } from "lodash";
import Scraper from "scraperjs";
import { server1, server2, server3 } from "../utils/constants";

export const getAnimeList = async (query = "") => {
  const items1 = await Scraper.StaticScraper.create(
    server1 + "daftar-anime/?list"
  ).scrape(function ($) {
    const data = $(".listbar")
      .map(function () {
        return {
          abjad: $(this).find(".listabj").text(),
          lists: $(this)
            .find("ul li")
            .map(function () {
              return {
                link: $(this)
                  .find("a")
                  .attr("href")
                  .replace(server1 + "anime/", "/series/"),
                text: $(this).find("a").text(),
              };
            })
            .get(),
        };
      })
      .get();

    return { source: server1, data };
  });

  if (items1.data.length > 0) {
    return items1;
  }

  const items2 = await Scraper.StaticScraper.create(
    server2 + "anime-list/"
  ).scrape(function ($) {
    const temp = $(".anime-list li")
      .map(function () {
        return {
          link: $(this).find("a").attr("href").replace("/anime/", "/series/"),
          text: $(this).find("a").text(),
          abjad: $(this).find("a").text().charAt(0),
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

  const items3 = await Scraper.StaticScraper.create(
    server3 + "a-z/" + query
  ).scrape(function ($) {
    const allAbjad = $(".letter_az a")
      .map(function () {
        return {
          link: $(this).attr("href"),
          text: $(this).text(),
        };
      })
      .get();
    let data = $("article .item")
      .map(function () {
        return {
          link: $(this).find(".info a").attr("href"),
          text: $(this).find(".info a").text(),
          abjad: $(this).find(".info a").text().charAt(0),
        };
      })
      .get();
    data = chain(data)
      .groupBy("abjad")
      .map((val, key) => ({
        abjad: key,
        lists: val,
      }))
      .value();
    return { source: server3, allAbjad, data };
  });

  if (items3.data.length > 0) {
    return items3;
  }

  return [];
};
