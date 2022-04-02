import { ObjType } from '@/type';
import { makeMarkDown } from '@/utils/lib';
import { getYozmList } from '@/yozm';

const main = async () => {
  const result: ObjType[] = [];
  result.push(...(await (await getYozmList()).slice(0, 3)));
  makeMarkDown(result);
};

main();
