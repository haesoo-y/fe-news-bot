import type { ObjType } from "@/type";

export const showPreview = (lst: ObjType[]) => {
  for (const obj of lst) {
    console.log("▽====================▽====================▽");
    console.log("TITLE :", obj.title);
    console.log("DESC :", obj.desc);
    console.log("URL :", obj.url);
    console.log("△====================△====================△\n");
  }
};
