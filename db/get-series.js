import Scraper from "scraperjs";
import { server1, server2, server3 } from "../utils/constants";

export const getSeries = async (slug) => {
  const items1 = await Scraper.StaticScraper.create(
    `${server1}anime/${slug}/`
  ).scrape(function ($) {
    const content = $(".bigcontent")
      .map(function () {
        return {
          title: $(this).find("h1.entry-title").text(),
          keywords: $(this).find(".mindesc").text().trim(),
          infoContent: $(this)
            .find(".info-content span")
            .map(function () {
              return $(this).text();
            })
            .get(),
          thumb: $(this).find(".thumb img").attr("src"),
          rating: $(this).find(".rating strong").text(),
          tags: $(this)
            .find(".genxed a")
            .map(function () {
              return $(this).text();
            })
            .get(),
        };
      })
      .get(0);
    const desc = $(".entry-content p").text().trim();
    const episodeList = $(".lsteps li")
      .map(function () {
        return {
          title: $(this)
            .find("a")
            .get(1)
            ?.children[0].data.replace("Episode ", ""),
          link: `/anime/${
            $(this).find("a").attr("href").split("/").reverse()[1]
          }/`,
        };
      })
      .get();

    return {
      content: { ...content, desc },
      episodeList: episodeList.reverse(),
    };
  });

  if (items1?.content) {
    return items1;
  }

  const items2 = await Scraper.StaticScraper.create(
    `${server2}anime/${slug}/`
  ).scrape(function ($) {
    const content = $(".detail")
      .map(function () {
        return {
          title: $(this).find("h2").text(),
          keywords: $(this).find(".mindesc").text().trim(),
          infoContent: $(this)
            .find(".info-content span")
            .map(function () {
              return $(this).text();
            })
            .get(),
          thumb: server2.slice(0, -1) + $(this).find("img").attr("src"),
          rating: $(this).find(".rating strong").text(),
          tags: $(this)
            .find("li")
            .map(function () {
              return $(this).text();
            })
            .get(),
          desc: $(this).find("p").text().trim(),
        };
      })
      .get(0);

    const episodeList = $(".ep a")
      .map(function () {
        return {
          title: $(this).text().trim(),
          link: `/anime${$(this).attr("href")}`,
        };
      })
      .get();

    return { content, episodeList };
  });

  if (items2?.content) {
    return items2;
  }

  const items3 = await Scraper.StaticScraper.create(
    `${server3}anime/${slug}/`
  ).scrape(function ($) {
    const content = $(".post-body")
      .map(function () {
        return {
          title: $(this).find("h1.entry-title").text(),
          keywords: $(this).find(".mindesc").text().trim(),
          infoContent: $(this)
            .find(".infox span")
            .map(function () {
              return (
                $(this).text().split(" ")[0] +
                ": " +
                $(this).text().split(" ").slice(1).join(" ")
              );
            })
            .get(),
          thumb: $(this).find("img").attr("src"),
          rating: $(this).find(".rating-area [itemprop=ratingValue]").text(),
          tags: $(this)
            .find(".genre-info a")
            .map(function () {
              return $(this).text();
            })
            .get(),
          desc: $(this).find(".desc").text().trim(),
        };
      })
      .get(0);

    const episodeList = $(".listeps li")
      .map(function () {
        return {
          title: $(this)
            .find("a")
            .map(function () {
              return $(this).text();
            })
            .get(1),
          link: `/anime${$(this).find("a").attr("href").replace(server3, "/")}`,
        };
      })
      .get();

    return { content, episodeList };
  });

  if (items3?.content) {
    return items3;
  }

  return [];
};
