import { ObjType } from "@/type";
import { getHtml } from "@/utils/lib";
import { MAX_DESC_LENGTH } from "@/utils/static";
import * as cheerio from "cheerio";

export const getKFAList = async () => {
  const kfa = "https://kofearticle.substack.com";
  const kfaTitle = "[Korean FE Article]";
  const result: ObjType[] = [];
  const html = await getHtml(kfa);
  const $ = cheerio.load(html?.data);
  const $bodyList = $(
    "div.portable-archive-list > div > div > div.pencraft > div.pencraft > div.pencraft"
  );

  $bodyList.each((i, elem) => {
    result.push({
      title: $(elem)
        .find(".pencraft > .pencraft:nth-child(1) a")
        .text()
        .replace(kfaTitle, ""),
      desc:
        $(elem)
          .find(".pencraft > .pencraft:nth-child(2) a")
          .text()
          .slice(0, MAX_DESC_LENGTH) + "...",
      url:
        "" + $(elem).find(".pencraft > .pencraft:nth-child(1) a").attr("href"),
    });
  });

  return result;
};
