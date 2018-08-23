const prop = (data, name) => data.map(item => item[name]),
  summ = data => data.reduce((total, value) => total + value, 0);

class SpriteGenerator {
  constructor(container) {
    this.uploadButton = container.querySelector('.sprite-generator__upload');
    this.submitButton = container.querySelector('.sprite-generator__generate');
    this.imagesCountContainer = container.querySelector('.images__added-count-value');
    this.codeContainer = container.querySelector('.sprite-generator__code');
    this.imageElement = container.querySelector('.sprite-generator__result-image');

    this.images = [];
    this.imagesCount = 0;
    this.codeContainer.innerHTML = '';
    this.registerEvents();

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
  }

  upload(event) {
    for (let file of event.target.files) {
      const url = URL.createObjectURL(file);
      const img = new Image;
      img.src = url;
      this.images.push(img);
    }
    this.imagesCount = this.images.length;
    this.imagesCountContainer.innerHTML = this.imagesCount;
  };

  submit(event) {
    this.canvas.width = summ(prop(this.images, 'width'));
    this.canvas.height = Math.max(...prop(this.images, 'height'));
    let currX = 0,
      code = `
      .icon {
        display: inline-block;
        background-image: url(img/sprite.png);
      }`;
    for (let i in this.images) {
      const img = this.images[i];
      this.ctx.drawImage(img, currX, 0);
      let cssClassNum = parseInt(i) + 1;
      code += `
      .icon_${cssClassNum} {
        background-position: -${currX}px 0;
        width: ${img.width}px;
        height: ${img.height}px;
      }`;
      currX += img.width;
    }
    this.imageElement.src = this.canvas.toDataURL();
    this.codeContainer.innerHTML = code;
  }

  registerEvents() {
    this.uploadButton.addEventListener('change', this.upload.bind(this));
    this.submitButton.addEventListener('click', this.submit.bind(this));
  }
}

new SpriteGenerator(document.getElementById('generator'));
