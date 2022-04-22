import { ObjType } from '@/type';
import { getHtml } from '@/utils/lib';
import * as cheerio from 'cheerio';

export const getKFAList = async () => {
  const kfa = 'https://kofearticle.substack.com';
  const kfaTitle = '[Korean FE Article]';
  const result: ObjType[] = [];
  const html = await getHtml(kfa);
  const $ = cheerio.load(html?.data);
  const $bodyList = $('div.home-page .post-preview-content');

  $bodyList.each((i, elem) => {
    result.push({
      title: $(elem).find('a.post-preview-title').text().replace(kfaTitle, ''),
      desc: $(elem).find('a.post-preview-description').text().slice(0, 50) + '...',
      url: '' + $(elem).find('a.post-preview-title').attr('href'),
    });
  });

  return result;
};
