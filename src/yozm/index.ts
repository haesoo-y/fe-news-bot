import { ObjType } from "@/type";
import { getHtml } from "@/utils/lib";
import { MAX_DESC_LENGTH } from "@/utils/static";
import { AxiosResponse } from "axios";
import * as cheerio from "cheerio";

export const getYozmList = async () => {
  const yozm = "https://yozm.wishket.com";
  const result: ObjType[] = [];
  let html:AxiosResponse<any> | undefined;
  let $:cheerio.CheerioAPI;
  try {
    html = await getHtml(yozm + "/magazine/list/develop");
    $ = cheerio.load(html?.data);
  } catch (error) {
    console.log('ERROR : getYozmList');
    return result;
  }
  
  const $bodyList = $("div.list-cover ").children("div.list-item-link");

  $bodyList.each((i, elem) => {
    result.push({
      title: $(elem).find(".list-item .item-main a.item-title").text(),
      desc:
        $(elem)
          .find(".list-item .item-description")
          .text()
          .slice(0, MAX_DESC_LENGTH) + "...",
      url:
        yozm + $(elem).find(".list-item .item-main a.item-title").attr("href"),
    });
  });
  return result;
};
