const root = document.getElementById("root");

let currPage = 1;

//Ajax 호출 함수
const Ajax = (URL) => {
  const XHR = new XMLHttpRequest();

  XHR.open("GET", URL, false);
  XHR.send();

  const data = JSON.parse(XHR.response);

  return data;
};

// 뉴스 리스트 보여주는 함수
const newsLists = () => {
  const newsURL = `https://api.hnpwa.com/v0/news/${currPage}.json`;

  const newsFeed = Ajax(newsURL);
  let template = `
  <div>
    <h1>Hacker News</h1>
    <ul>
      {{__news_feed__}}
    </ul>
    <div>
      <a href="#/page/{{__prev_page__}}">이전페이지</a>
      <a href="#/page/{{__next_page__}}">다음페이지</a>
    </div>
  </div>
  `;

  const newsList = [];
  for (let i = 0; i < 30; i++) {
    newsList.push(`
    <li>
      <a href="#/show/${newsFeed[i].id}">
        ${newsFeed[i].title} (${newsFeed[i].comments_count})
      </a>
    </li>
  `);
  }

  template = template.replace("{{__news_feed__}}", newsList.join(""));
  template = template.replace(
    "{{__prev_page__}}",
    currPage > 1 ? currPage - 1 : 1
  );
  template = template.replace(
    "{{__next_page__}}",
    currPage === 10 ? 10 : currPage + 1
  );

  root.innerHTML = template;
};

// 뉴스 내용 보여주는 함수
const newsDetail = () => {
  root.innerHTML = "";
  const id = location.hash.slice(7);

  const contentURL = `https://api.hnpwa.com/v0/item/${id}.json`;
  const newsContent = Ajax(contentURL);

  if (newsContent) {
    root.innerHTML += `
      <h1>${newsContent.title}</h1>

      <div>
        <a href="#">목록으로</a>
      </div>
    `;
  }
};

const router = () => {
  const routePath = location.hash;

  if (routePath === "") {
    newsLists();
  } else if (routePath.indexOf("#/show/") >= 0) {
    newsDetail();
  } else {
    currPage = Number(routePath.slice(7));
    newsLists();
  }
};

window.addEventListener("hashchange", router);
