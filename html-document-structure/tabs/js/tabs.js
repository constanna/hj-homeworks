document.addEventListener('DOMContentLoaded', function() {
  const section = document.querySelector('.tabs-content');
  const tabsNav = document.querySelector('.tabs-nav');
  const articles = document.querySelectorAll('.tabs-content > *');

  let demoTab = document.querySelector('.tabs-nav li');
  demoTab.remove();

  function tabClick() {
    for (let article of articles) {
      article.classList.add('hidden');
    }

    for (let tab of tabs) {
      tab.classList.remove('ui-tabs-active');
    }

    articles[this.dataset['article']].classList.remove('hidden');
    this.parentElement.classList.add('ui-tabs-active');
  }

  let counter = 0;

  for (let article of articles) {
    let newTab = demoTab.cloneNode(true);
    const link = newTab.querySelector('a');
    link.innerHTML = article.dataset['tabTitle'];
    link.classList.add(article.dataset['tabIcon']);
    link.dataset['article'] = counter;

    tabsNav.appendChild(newTab);
    link.addEventListener('click', tabClick);

    counter++;
  }

  let tabs = document.querySelectorAll('.tabs-nav > li');

  for (let article of articles) {
    article.classList.add('hidden');
  }
  
  articles[0].classList.remove('hidden');
  tabs[0].classList.add('ui-tabs-active');
});
