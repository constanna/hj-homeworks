const addClass = (className, context) => context.classList.add(className),
  removeClass = (className, context) => context.classList.remove(className),
  hasClass = (className, context) => context.classList.contains(className);

class iLayout {
  constructor(container) {
    this.container = container;
    this.positionsContainer = container.querySelector('.layout__positions');
    this.actionButton = container.querySelector('.layout__button');
    this.result = container.querySelector('.layout__result');
    this.result.value = '';
    this.layout = {
      left: null,
      top: null,
      bottom: null
    };
    this.registerEvents();
  }
  registerEvents() {
    this.positionsContainer.addEventListener('dragover', event => {
      if (!hasClass('layout__item', event.target)) {
        return;
      }
      event.preventDefault();
      addClass('layout__item_active', event.target);
    });

    this.positionsContainer.addEventListener('dragleave', event => {
      if (!hasClass('layout__item', event.target)) {
        return;
      }
      event.preventDefault();
      removeClass('layout__item_active', event.target);
    });

    this.positionsContainer.addEventListener('drop', event => {
      event.preventDefault();
      removeClass('layout__item_active', event.target);
      let file = event.dataTransfer.files[0];
      if (!file.type.startsWith('image/')) {
        alert('Файл не является изображением!');
        return;
      }

      let url = URL.createObjectURL(file);
      let img = new Image;
      img.src = url.replace('image/png', 'image/octet-stream');
      addClass('layout__image', img);
      event.target.appendChild(img);
    });

    this.actionButton.addEventListener('click', event => {
      const leftContainer = document.querySelector('.layout__item_left');
      let leftContainerWidth = leftContainer.getBoundingClientRect().width;
      let leftContainerHeight = leftContainer.getBoundingClientRect().height;
      const topContainer = document.querySelector('.layout__item_top');
      let topContainerWidth = topContainer.getBoundingClientRect().width;
      let topContainerHeight = topContainer.getBoundingClientRect().height;

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = leftContainerWidth + topContainerWidth;
      canvas.height = leftContainerHeight;

      let leftImage = document.querySelector('.layout__item_left img');
      ctx.drawImage(leftImage, 0, 0);
      let topImage = document.querySelector('.layout__item_top img');
      ctx.drawImage(topImage, leftContainerWidth, 0);
      let bottomImage = document.querySelector('.layout__item_bottom img');
      ctx.drawImage(bottomImage, leftContainerWidth, topContainerHeight);

      let resultUrl = canvas.toDataURL().replace('image/png', 'image/octet-stream');
      this.result.value = `<img src="${resultUrl}" alt="">`;
    });
  }
}

new iLayout(document.getElementById('layout'));
