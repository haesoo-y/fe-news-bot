import { ObjType } from "@/type";
import { makeMarkDown } from "@/utils/lib";
import { getYozmList } from "@/yozm";
import { getKFAList } from "@/korean-fe-article";
import { getFilteredMediumList } from "@/medium";
import { showPreview } from "@/utils/preview";

const main = async () => {
  const mediumList: ObjType[] = (await getFilteredMediumList()).slice(0, 4);
  const kfaList: ObjType[] = (await getKFAList()).slice(0, 2);
  const yozmList: ObjType[] = (await getYozmList()).slice(0, 2);

  if (process.env.PREVIEW_KFA) {
    showPreview(kfaList);
  } else if (process.env.PREVIEW_MEDIUM) {
    showPreview(mediumList);
  } else if (process.env.PREVIEW_YOZM) {
    showPreview(yozmList);
  } else {
    makeMarkDown([...mediumList, ...kfaList, ...yozmList]);
  }
};

main();
