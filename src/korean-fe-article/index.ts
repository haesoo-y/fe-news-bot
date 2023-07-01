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
    const $titleLink = $(elem).find(".pencraft > a").eq(0);
    const $descLink = $(elem).find(".pencraft > a").eq(1);

    result.push({
      title: $titleLink.text().replace(kfaTitle, ""),
      desc:
        $descLink
          .text()
          .replace(/글 링크: .+?\s/, "")
          .slice(0, MAX_DESC_LENGTH) + "...",
      url: "" + $titleLink.attr("href"),
    });
  });
  return result;
};
