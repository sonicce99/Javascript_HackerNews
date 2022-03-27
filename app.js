const XHR = new XMLHttpRequest();

const newsURL = "https://api.hnpwa.com/v0/news/1.json";
const contentURL = "https://api.hnpwa.com/v0/item/:id.json";

XHR.open("GET", newsURL, false);

XHR.send();

const newsFeed = JSON.parse(XHR.response);

console.log(newsFeed);

window.addEventListener("hashchange", () => {
  const id = location.hash.slice(1);

  XHR.open("GET", contentURL.replace(/:id/g, id), false);
  XHR.send();

  const newsContent = JSON.parse(XHR.response);

  console.log(newsContent);

  if (newsContent) {
    root.innerHTML += `
      <div>${newsContent.title}</div>
    `;
  }
});

for (let i = 0; i < 10; i++) {
  const root = document.getElementById("root");

  root.innerHTML += `
  <ul>
    <li>
      <a href="#${newsFeed[i].id}">
        ${newsFeed[i].title} (${newsFeed[i].comments_count})
      </a>
    </li>
  </ul>
  `;
}
