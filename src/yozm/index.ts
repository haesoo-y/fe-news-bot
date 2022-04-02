import { ObjType } from '@/type';
import { getHtml } from '@/utils/lib';
import * as cheerio from 'cheerio';
import { Url } from 'url';

export const getYozmList = async () => {
  const yozm = 'https://yozm.wishket.com';
  const result: ObjType[] = [];
  const html = await getHtml(yozm + '/magazine/list/develop');
  const $ = cheerio.load(html?.data);
  const $bodyList = $('div.list-cover ').children('div.list-item-link');

  $bodyList.each((i, elem) => {
    result.push({
      title: $(elem).find('.list-item .item-main a.item-title').text(),
      desc: $(elem).find('.list-item .item-description').text().slice(0, 50) + '...',
      url: yozm + $(elem).find('.list-item .item-main a.item-title').attr('href'),
    });
  });
  return result;
};
