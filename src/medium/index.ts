import { ObjType } from "@/type";
import { getHtml } from "@/utils/lib";
import { MAX_DESC_LENGTH } from "@/utils/static";
import * as cheerio from "cheerio";

export const getFilteredMediumList = async () => {
  const tags = [
    "frontend",
    "reactjs",
    "nextjs",
    "front-end-development",
    "react",
    "javascript",
    "typescript",
  ];
  const result: ObjType[] = [];

  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay();
  // 요일에 따라 tags의 순서를 미루어 재정렬
  const modifiedTags = [...tags.slice(dayOfWeek), ...tags.slice(0, dayOfWeek)];

  for (const tag of modifiedTags) {
    const obj = await getMediumObj(tag);
    result.push(obj);
  }

  return result;
};

const getMediumObj = async (tag: string) => {
  const medium = "https://medium.com";
  const obj: ObjType = { title: "", desc: "", url: "" };
  const html = await getHtml(medium + `/tag/${tag}`);
  const $ = cheerio.load(html?.data);
  const $content = $("article").first();

  obj.title = $content.find("h2").text();
  obj.desc = $content.find("p").text().slice(0, MAX_DESC_LENGTH) + "...";
  obj.url = medium + $content.find("a").last().attr("href");
  return obj;
};
