const XHR = new XMLHttpRequest();

const newsURL = "https://api.hnpwa.com/v0/news/1.json";

XHR.open("GET", newsURL, false);

XHR.send();

const newsFeed = JSON.parse(XHR.response);

console.log(newsFeed);

for (let i = 0; i < 10; i++) {
  const root = document.getElementById("root");

  root.innerHTML += `
  <ul>
    <li>${newsFeed[i].title}</li>
  </ul>
  `;
}
