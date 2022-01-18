import Scraper from "scraperjs";
import { server1, server2, server3 } from "../utils/constants";

export const getUpdated = async (extraPath = "") => {
  const items1 = await Scraper.StaticScraper.create(
    server1 + "anime-terbaru/" + extraPath
  ).scrape(function ($) {
    const data = $(".animepost")
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
            .match(/\d/g)
            ?.join(""),
          next: $(this)
            .find("a.arrow_pag")
            .has("#nextpagination")
            .attr("href")
            .match(/\d/g)
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

    return { source: server1, pagination, data };
  });

  if (items1?.data.length > 0) {
    return items1;
  }

  const items2 = await Scraper.StaticScraper.create(server2 + extraPath).scrape(
    function ($) {
      const list = $(".list-anime")
        .map(function () {
          return {
            path: "/anime" + $(this).parent().get(0).attribs?.href,
            title: $(this).find("p").text(),
            img: $(this).find("img").attr("data-original"),
            eps: $(this).find(".eps").text(),
          };
        })
        .get();

      const pagination = $(".pag")
        .map(function () {
          return {
            current: $(this).find(".cur").text(),
            prev: $(this)
              .find("a:contains(«)")
              .attr("href")
              .match(/\d/g)?
              .join(""),
            next: $(this)
              .find("a:contains(»)")
              .attr("href")
              .match(/\d/g)?
              .join(""),
            links: $(this)
              .find("a")
              .not(":contains(«)")
              .not(":contains(»)")
              .map(function () {
                return {
                  link: $(this).attr("href").match(/\d/g)?.join(""),
                  text: $(this).text(),
                };
              })
              .get(),
          };
        })
        .get(0);

      return { source: server2, pagination, data: list };
    }
  );

  if (items2?.data.length > 0) {
    return items2;
  }

  const items3 = await Scraper.StaticScraper.create(server3 + extraPath).scrape(
    function ($) {
      const data = $(".post-show")
        .map(function (idx) {
          if (idx === 0) {
            const list = $(this)
              .find("li")
              .map(function () {
                return {
                  path:
                    "/anime" +
                    $(this).find(".thumb a").attr("href").replace(server3, "/"),
                  title: $(this).find("h2.entry-title").text(),
                  img: $(this).find(".thumb img").attr("src"),
                  eps: $(this)
                    .find(".dtla span")
                    .map(function () {
                      return $(this).text().trim();
                    })
                    .get(0),
                };
              })
              .get();
            return list;
          }
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
              ?.replace(server3, "")
              .match(/\d/g)
              ?.join(""),
            next: $(this)
              .find("a.arrow_pag")
              .has("#nextpagination")
              .attr("href")
              ?.replace(server3, "")
              .match(/\d/g)
              ?.join(""),
            links: $(this)
              .find("a")
              .not(".arrow_pag")
              .map(function () {
                return {
                  link: $(this)
                    .attr("href")
                    ?.replace(server3, "")
                    .match(/\d/g)
                    ?.join(""),
                  text: $(this).text(),
                };
              })
              .get(),
          };
        })
        .get(0);

      return { source: server3, pagination, data };
    }
  );

  if (items3?.data.length > 0) {
    return items3;
  }

  return [];
};
