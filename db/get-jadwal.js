import Scraper from "scraperjs";
import { server1, server2, server3 } from "../utils/constants";

export const getJadwal = async () => {
  const items1 = await Scraper.StaticScraper.create(server1 + "jadwal/").scrape(
    function ($) {
      const data = $(".tab-dates")
        .map(function (idx) {
          const day = $(this).text();
          const lists = $(".result-schedule")
            .map(function () {
              const list = $(this)
                .find(".schedule_list")
                .map(function () {
                  return {
                    title: $(this).find(".title").text(),
                  };
                })
                .get();

              return list;
            })
            .get(idx);
          return { day, lists };
        })
        .get();

      return { source: server1, data };
    }
  );

  //   if (items1.data.length > 0) {
  return items1;
  //   }

  //   return [];
};
