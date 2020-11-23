const fileEl = document.querySelector('input');
const overlapEl = document.querySelector('.drop-area');
const previewContainer = document.querySelector('.preview-container');

class Image {
  constructor(url, id = Date.now()) {
    this.url = url;
    this.id = id;
  }
}

const images = [];

const deleteEl = document.createElement('a');
deleteEl.className = 'delete';
deleteEl.setAttribute('href', '#');
deleteEl.textContent = 'x';

function showImg() {
  previewContainer.innerHTML = '';
  images.forEach((imageEl) => {
    previewContainer.innerHTML += `<div data-id="${imageEl.id}" class='image'><img src="${imageEl.url}" class='preview'></div>`;
    Array.from(previewContainer.querySelectorAll('.image')).forEach((element) => {
      element.insertAdjacentElement('beforeend', deleteEl);
    });
  });
}

deleteEl.addEventListener('click', (e) => {
  e.preventDefault();
  images.forEach((img, index, array) => {
    if (img.id === parseInt(e.currentTarget.closest('.image').dataset.id, 10)) {
      array.splice(index, 1);
      showImg();
    }
  });
});

function addPreview(files, evt) {
  const image = new Image(URL.createObjectURL(files[0]));
  images.push(image);
  showImg();
  const element = evt.target;
  element.value = '';
}

function fileHandler(evt) {
  evt.preventDefault();
  if (evt.type === 'change') {
    addPreview(Array.from(evt.currentTarget.files), evt);
  } else if (evt.type === 'drop') {
    addPreview(Array.from(evt.dataTransfer.files), evt);
  }
}

overlapEl.addEventListener('click', () => {
  fileEl.dispatchEvent(new Event('click'));
});

fileEl.dispatchEvent(new MouseEvent('click'));

fileEl.addEventListener('change', fileHandler);

overlapEl.addEventListener('dragover', (evt) => {
  evt.preventDefault();
});

overlapEl.addEventListener('drop', fileHandler);
