import { ObjType } from '@/type';
import { makeMarkDown } from '@/utils/lib';
import { getYozmList } from '@/yozm';
import { getKFAList } from '@/korean-fe-article';

const main = async () => {
  const result: ObjType[] = [];
  result.push(...(await (await getYozmList()).slice(0, 3)));
  result.push(...(await (await getKFAList()).slice(0, 3)));
  makeMarkDown(result);
};

main();
