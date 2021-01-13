import defaultExport from "./gallery-items.js";

const galleryRef = document.querySelector(".js-gallery");
const modalWindowRef = document.querySelector(".js-lightbox");
const closeModalBtnRef = document.querySelector(
  "button[data-action='close-lightbox']"
);
const imgModalRef = document.querySelector(".lightbox__image");
const overlayRef = modalWindowRef.querySelector(".lightbox__overlay");

const createMarkup = function ({ preview, original, description, index }) {
  const containerRef = document.createElement("li");
  containerRef.classList.add("gallery__item");

  const linkRef = document.createElement("a");
  linkRef.classList.add("gallery__link");
  linkRef.href = original;

  const imageRef = document.createElement("img");
  imageRef.classList.add("gallery__image");
  imageRef.src = preview;
  imageRef.dataset.source = original;
  imageRef.alt = description;
  imageRef.dataset.index = index;

  linkRef.appendChild(imageRef);
  containerRef.appendChild(linkRef);

  return containerRef;
};

const images = defaultExport.map((image) => {
  return createMarkup(image);
});

galleryRef.append(...images);

galleryRef.addEventListener("click", handleImageOpenModal);
closeModalBtnRef.addEventListener("click", handleCloseModal);
overlayRef.addEventListener("click", handleCloseModal);
window.addEventListener("keydown", handleEscapeClose);
window.addEventListener("keydown", handleImageRemote);

function handleImageOpenModal(event) {
  event.preventDefault();

  if (event.target.nodeName === "IMG") {
    imgModalRef.src = event.target.dataset.source;
    imgModalRef.alt = event.target.alt;
    imgModalRef.dataset.index = event.target.dataset.index;

    modalWindowRef.classList.add("is-open");
  }
}

function handleCloseModal() {
  modalWindowRef.classList.remove("is-open");

  imgModalRef.src = "";
}

function handleEscapeClose(event) {
  if (modalWindowRef.classList.contains("is-open")) {
    if (event.code === "Escape") {
      handleCloseModal();
    }
  }
}

function handleImageRemote(event) {
  if (modalWindowRef.classList.contains("is-open")) {
    if (event.code === "ArrowRight") {
      let indexImage = Number(imgModalRef.dataset.index);
      if (indexImage === 8) {
        return;
      }
      const nextImageSrc = defaultExport[indexImage + 1].original;
      imgModalRef.src = nextImageSrc;
      imgModalRef.dataset.index = defaultExport[indexImage + 1].index;
    }
    if (event.code === "ArrowLeft") {
      let indexImage = Number(imgModalRef.dataset.index);
      if (indexImage === 0) {
        return;
      }
      const nextImageSrc = defaultExport[indexImage - 1].original;
      imgModalRef.src = nextImageSrc;
      imgModalRef.dataset.index = defaultExport[indexImage - 1].index;
    }
  }
}
