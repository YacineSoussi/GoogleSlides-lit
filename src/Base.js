import { LitElement } from 'lit';
import { addUserPresentation } from "./firebase"

export class Base extends LitElement {
  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {
      userIsLogged: {
        type: Boolean,
        reflect: true
      },
      active: {
        type: Boolean,
        reflect: true
      },
      routeActive: {
        type: String,
        reflect: true
      }
    }
  }

  selectSlide(event) {
    const slide = event.target;
    const slideContent = slide.innerHTML;
    const slidesChildren = Array.from(document.querySelector('#slides').children);

    slidesChildren.forEach(slide => slide.classList.remove('active'));
    slide.classList.add('active');
    document.querySelector('#wysiwyg div.fr-element').innerHTML = slideContent;
  }

  addSlide() {
    const slides = document.querySelector('#slides');
    const slidesChildren = Array.from(document.querySelector('#slides')?.children);

    if (slidesChildren?.length > 0) {
      const slide = document.createElement('div');
      const slideId = (slidesChildren.length > 0) ? slidesChildren.length + 1 : 1;

      document.querySelector('#wysiwyg div.fr-element').innerHTML = '<p><br/></p>';

      slidesChildren.forEach(slide => slide.classList.remove('active'));

      slide.classList.add('slide', 'active');
      slide.id = `slide-${slideId}`;
      slide.addEventListener("click", this.selectSlide);
      slides.appendChild(slide);
    } else {
      this.runToast("#C70039", "Error during slide creation");
    }
  }

  deleteSlide() {
    const slides = document.querySelector('#slides').children;
    const slidesChildren = Array.from(document.querySelector('#slides').children);
    const frView = document.querySelector('#wysiwyg .fr-view');

    if (slidesChildren?.length > 1) {
      const slideActive = slidesChildren.findIndex(slide => slide.classList.contains('active'));

      if (slideActive || slideActive === 0) {
        slides[slideActive].remove();
      }

      if (slides.length === 1) {
        slides[0].classList.add('active');
        frView.innerHTML = slides[0].innerHTML;
      }

      if (slides.length > 1) {
        slides[slides.length - 1].classList.add('active');
        frView.innerHTML = slides[slides.length - 1].innerHTML;
      }
    } else {
      this.runToast("#002080", "Cannot delete the last slide");
    }
  }

  saveSlides = () => {
    const inputPresentationName = document.querySelector('#presentationName');

    if (inputPresentationName.value !== '') {
      const slides = Array.from(document.querySelector('#slides').children);
      const slidesContent = [];

      // slides content format
      slides.forEach(slide => {
        const content = slide.innerHTML;
        slidesContent.push({
          [`${slide.id}`]: content
        });
      });

      addUserPresentation(
        JSON.parse(localStorage.getItem('user')).user.providerData[0].email,
        inputPresentationName.value,
        slidesContent
      );
    } else {
      this.runToast("#002080", "Please enter a presentation name");
    }
  }

  runToast(color, message) {
    const snackbar = document.getElementById("snackbar");
    snackbar.className = "show";
    snackbar.style.backgroundColor = color;
    snackbar.style.color = "white";
    snackbar.innerHTML = message;
    setTimeout(() => {
      snackbar.className = snackbar.className.replace("show", "");
    }, 3000);
  }
}