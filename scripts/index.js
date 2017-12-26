import {html, render} from 'lit-html';

import { CLIENT_SECRET } from './secret';

var imageArray = null;

const getApi = (endpoint, params) => {
  if (params)
    params = `&${params}`;
  else
    params = '';
  const url = `https:\/\/api.dribbble.com/v1/${endpoint}?access_token=${CLIENT_SECRET}${params}`;
  return fetch(url).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
};

const imageTemplate = (shots) => html`
  ${shots.map(shot => html`
    <a href="${shot.html_url}">
      <div class="img">
        <img src="${shot.images.normal}" alt="${shot.title}"/>
        <span class="desc">${shot.title} - ${shot.user.name}</span>
      </div>
    </a>
  `)}
`;

const populatePage = (json) => {
  const container = document.querySelector('.container');

  render(imageTemplate(json), container);
};

const init = () => {
  getApi('shots').then((json) => {
    imageArray = json;
    getApi('shots', 'page=2').then((p2) => {
      imageArray = imageArray.concat(p2);
      populatePage(imageArray);
      let page = 3;
      let loading = false;

      window.addEventListener('scroll', () => {
        if (loading)
          return
        const html = document.querySelector('html');
        let viewportHeight = html.clientHeight;
        let contentHeight = html.offsetHeight;
        let scrolled = html.scrollTop;

        let scrollPercentage = (scrolled + viewportHeight) / contentHeight;
        if (scrollPercentage > 0.9 && !loading) {
          loading = true;
          console.log(page);
          getApi('shots', `page=${page}`).then((json) => {
            imageArray = imageArray.concat(json);
            populatePage(imageArray);
            page += 1;
            loading = false;
          });
        }
      });
    });
  });
};

window.onload = init();
