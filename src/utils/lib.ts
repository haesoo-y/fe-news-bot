import axios from 'axios';
import fs from 'fs';
import { ObjType } from '@/type';

export const getHtml = async (url: string) => {
  try {
    return await axios.get(url);
  } catch (err) {
    console.error(err);
  }
};

export const makeMarkDown = (lst: ObjType[]) => {
  let result = '# 오늘의 포스팅 \n';
  result += new Date() + '기준 \n';
  for (const obj of lst) {
    result += `### ${obj.title} \n${obj.desc} \n[바로가기](${obj.url}) \n`;
  }
  fs.writeFileSync('README.md', result, 'utf-8');
};
