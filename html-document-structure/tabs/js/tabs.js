document.addEventListener('DOMContentLoaded', function() {
  const section = document.querySelector('.tabs-content');
  const tabsNav = document.querySelector('.tabs-nav');
  const articles = document.querySelectorAll('.tabs-content > *');

  let demoTab = document.querySelector('.tabs-nav li');
  demoTab.remove();

  for (let article of articles) {
    console.log(article.dataset);
    let newTab = demoTab.cloneNode(true);
    const link = newTab.querySelector('a');
    link.innerHTML = article.dataset['tabTitle'];
    link.classList.add(article.dataset['tabIcon']);
    tabsNav.appendChild(newTab);
  }
});
