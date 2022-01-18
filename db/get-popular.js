import Scraper from "scraperjs";
import { server1, server2, server3 } from "../utils/constants";

export const getPopular = async () => {
  const items1 = await Scraper.StaticScraper.create(
    server1 + "populer/"
  ).scrape(function ($) {
    const data = $(".animepost")
      .map(function () {
        const link = $(this).find("a").attr("href").split("/");
        return {
          source: server1,
          path: `/series/${link[link.length - 2]}/`,
          title: $(this).find(".data .entry-title").text(),
          img: $(this).find("img").attr("src"),
          eps: $(this).find(".data .episode").text(),
          tags: [],
          type: $(this).find(".data .type").text(),
        };
      })
      .get();
    return { data };
  });

  if (items1?.data.length > 0) {
    return items1;
  }

  const items2 = await Scraper.StaticScraper.create(server2).scrape(function (
    $
  ) {
    const data = $(".nganan table")
      .map(function () {
        return {
          source: server2,
          path: $(this).find("a").attr("href").replace("/anime/", "/series/"),
          title: $(this).find(".zvidesc a").text().trim(),
          img: server2.slice(0, -1) + $(this).find("img").attr("src"),
          eps: "",
          tags: $(this).find(".zvidesc").text().trim().split("\n")[1],
        };
      })
      .get();
    return { data };
  });
  if (items2?.data.length > 0) {
    return items2;
  }

  const items3 = await Scraper.StaticScraper.create(server3).scrape(function (
    $
  ) {
    const data = $(".widgets li")
      .map(function (idx) {
        return {
          source: server3,
          path: $(this)
            .find("a")
            .attr("href")
            .replace(server3 + "anime/", "/series/"),
          title: $(this).find("h2 a").text(),
          img: $(this).find("img").attr("src"),
          eps: $(this).find(".data .episode").text(),
          tags: $(this)
            .find(".lftinfo span a")
            .map(function () {
              return $(this).text();
            })
            .get(),
          type: $(this).find(".data .type").text(),
        };
      })
      .get();

    return { data };
  });
  if (items3?.data.length > 0) {
    return items3;
  }

  return [];
};
