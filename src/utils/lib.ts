import axios from 'axios';
import fs from 'fs';
import { BlogType, ObjType } from '@/type';
import { DEV_BLOG_LIST } from './static';

export const getHtml = async (url: string) => {
  try {
    return await axios.get(url);
  } catch (err) {
    console.error("getHtml Error");
  }
};

export const makeMarkDown = (lst: ObjType[]) => {
  let result = '# 오늘의 포스팅 \n';
  result += getKoreaTime() + '기준 \n\n';
  for (const obj of lst) {
    result += `### ${obj.title} \n\n ${obj.desc} \n\n [바로가기](${obj.url}) \n\n`;
  }
  result += getReferenceText(DEV_BLOG_LIST);
  fs.writeFileSync('README.md', result, 'utf-8');
};

const getReferenceText = (refList: BlogType[]) => {
  let result = '---\n\n**참조 링크**\n\n';
  for (const blog of refList) {
    result += `- [${blog.name}](${blog.url}) \n\n`;
  }
  return result;
};

const getKoreaTime = () => {
  const now = new Date();
  const diffConfig = now.getTimezoneOffset() * 60 * 1000;
  const diffKorea = 9 * 60 * 60 * 1000;
  const koreaTime = new Date(now.getTime() + diffConfig + diffKorea);
  return (
    koreaTime.getFullYear() +
    '년 ' +
    (koreaTime.getMonth() + 1) +
    '월 ' +
    koreaTime.getDate() +
    '일 ' +
    koreaTime.getHours() +
    '시 '
  );
};
