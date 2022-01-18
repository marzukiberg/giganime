import Scraper from "scraperjs";
import { server1, server2, server3 } from "../utils/constants";

export const getDetail = async (slug) => {
  const detail1 = await Scraper.StaticScraper.create(server1 + slug).scrape(
    function ($) {
      const downloads = $(".links_table tr")
        .map(function (idx) {
          if (idx !== 0) {
            return {
              link: $(this).find("td a").attr("href"),
              quality: $(this).find("td .quality").text(),
              size: $(this).find("td").get(2).children[0]?.data,
            };
          }
        })
        .get();

      return $("main")
        .map(function () {
          return {
            mainSource: server1,
            title: $(this).find("h1.entry-title").text(),
            img: $(this).find(".infoanime img").attr("src"),
            eps: $(this).find(".epx").text().split("\n")[0],
            desc: $(this).find(".desc .entry-content").text().trim(),
            tags: $(this).find(".infox .alternati").text().trim().split("\n"),
            downloads,
            navigation: {
              before: `/anime/${
                $(this)
                  .find(".naveps .nvs a")[0]
                  .attribs.href?.split("/")
                  .reverse()[1]
              }/`,
              all: `/series/${
                $(this)
                  .find(".naveps .nvs a")[1]
                  .attribs.href?.split("/")
                  .reverse()[1]
              }/`,
              next: `/anime/${
                $(this)
                  .find(".naveps .nvs a")[2]
                  .attribs.href?.split("/")
                  .reverse()[1]
              }/`,
            },
            iframeSrc: $(this).find("#player_embed iframe").attr("src"),
          };
        })
        .get();
    }
  );

  if (detail1.length > 0) {
    return detail1[0];
  }

  const detail2 = await Scraper.StaticScraper.create(
    `${server2 + slug}/`
  ).scrape(function ($) {
    return $(".ngiri")
      .map(function () {
        return {
          mainSource: server2,
          title: $(this).find("h1.title").text(),
          img: server2.slice(0, -1) + $(this).find(".detail img").attr("src"),
          eps: "",
          desc: $(this).find(".detail p").text().trim(),
          tags: [],
          iframeSrc: $(this).find("iframe").attr("src"),
        };
      })
      .get();
  });

  if (detail2.length > 0) {
    return detail2[0];
  }

  const detail3 = await Scraper.StaticScraper.create(
    `${server3 + slug}/`
  ).scrape(function ($) {
    const downloads = $(".download-eps li")
      .map(function () {
        const type =
          $(this).parent().parent().get(0).children[0].children[0].children[0]
            .data || "";
        return {
          link: $(this).find("a").attr("href"),
          quality: $(this).find("strong").text().trim(),
          size: "-",
          type,
        };
      })
      .get();
    const data = $("article")
      .map(function () {
        return {
          mainSource: server3,
          title: $(this).find("h1.entry-title").text(),
          img: $(this).find(".thumb img").attr("src"),
          eps: `Episode ${$(this).find("span[itemprop=episodeNumber]").text()}`,
          desc: $(this).find(".entry-content").text().trim(),
          tags: [],
          iframeSrc: false,
          downloads,
        };
      })
      .get();
    return data;
  });

  if (detail3.length > 0) {
    return detail3[0];
  }

  return [];
};
