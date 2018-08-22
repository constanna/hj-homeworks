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
      const file = event.dataTransfer.files[0];
      if (!file.type.startsWith('image/')) {
        alert('Файл не является изображением!');
        return;
      }

      const url = URL.createObjectURL(file),
        img = new Image;
      img.src = url;
      addClass('layout__image', img);
      event.target.appendChild(img);
    });

    this.actionButton.addEventListener('click', event => {
      const leftContainer = document.querySelector('.layout__item_left'),
        topContainer = document.querySelector('.layout__item_top'),
        leftContainerRect = leftContainer.getBoundingClientRect(),
        topContainerRect = topContainer.getBoundingClientRect();
      let leftContainerWidth = leftContainerRect.width,
        leftContainerHeight = leftContainerRect.height,
        topContainerWidth = topContainerRect.width,
        topContainerHeight = topContainerRect.height;

      const canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
      canvas.width = leftContainerWidth + topContainerWidth;
      canvas.height = leftContainerHeight;

      let leftImage = document.querySelector('.layout__item_left img'),
        topImage = document.querySelector('.layout__item_top img'),
        bottomImage = document.querySelector('.layout__item_bottom img');
      ctx.drawImage(leftImage, 0, 0);
      ctx.drawImage(topImage, leftContainerWidth, 0);
      ctx.drawImage(bottomImage, leftContainerWidth, topContainerHeight);

      let resultUrl = canvas.toDataURL();
      this.result.value = `<img src="${resultUrl}" alt="">`;
    });
  }
}

new iLayout(document.getElementById('layout'));
