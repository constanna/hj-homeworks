const prop = (data, name) => data.map(item => item[name]),
  summ = data => data.reduce((total, value) => total + value, 0);

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

class SpriteGenerator {
  constructor(container) {
    this.uploadButton = container.querySelector('.sprite-generator__upload');
    this.submitButton = container.querySelector('.sprite-generator__generate');
    this.imagesCountContainer = container.querySelector('.images__added-count-value');
    this.codeContainer = container.querySelector('.sprite-generator__code');
    this.imageElement = container.querySelector('.sprite-generator__result-image');

    this.images = [];
    this.imagesCount = 0;
    this.registerEvents();
  }

  registerEvents() {
    this.uploadButton.addEventListener('change', event => {
      for (let file of event.target.files) {
        let url = URL.createObjectURL(file);
        let img = new Image;
        img.src = url;
        this.images.push(img);
      }
      this.imagesCount = this.images.length;
      this.imagesCountContainer.innerHTML = this.imagesCount;
    });

    this.submitButton.addEventListener('click', event => {
      canvas.width = summ(prop(this.images, 'width'));
      canvas.height = Math.max(...prop(this.images, 'height'));
      let currX = 0;
      let code = `
      .icon {
        display: inline-block;
        background-image: url(img/sprite.png);
      }`;
      for (let i in this.images) {
        let img = this.images[i];
        ctx.drawImage(img, currX, 0);
        let cssClassNum = parseInt(i) + 1;
        code += `
        .icon_${cssClassNum} {
          background-position: -${currX}px 0;
          width: ${img.width}px;
          height: ${img.height}px;
        }`;
        currX += img.width;
      }
      this.imageElement.src = canvas.toDataURL().replace('image/png', 'image/octet-stream');
      this.codeContainer.innerHTML = code;
    });
  }
}

new SpriteGenerator(document.getElementById('generator'));
