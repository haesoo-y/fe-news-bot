import { ObjType } from "@/type";
import { makeMarkDown } from "@/utils/lib";
import { getYozmList } from "@/yozm";
import { getKFAList } from "@/korean-fe-article";
import { getFilteredMediumList } from "@/medium";

const main = async () => {
  const result: ObjType[] = [];
  result.push(...(await (await getFilteredMediumList()).slice(0, 4)));
  result.push(...(await (await getKFAList()).slice(0, 2)));
  result.push(...(await (await getYozmList()).slice(0, 2)));
  makeMarkDown(result);
};

main();
