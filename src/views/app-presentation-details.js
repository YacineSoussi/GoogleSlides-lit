import { Base } from "../Base";
import { html } from "lit";
import page from "page";

export class AppPresentationDetails extends Base {
  constructor() {
    super();

    this.presentation = {
      slides: []
    };
  }

  static get properties() {
    return {
      presentation: { type: Object },
    }
  }

  firstUpdated() {
    let codox = new Codox();
    const editor = new FroalaEditor('#wysiwyg', {
      events: {
        'initialized': function() {
          const frPlaceholder = document.querySelector('#wysiwyg .fr-placeholder');
          frPlaceholder.remove();
          let config = {
            "docId"    : "mydoc",
            "user"     : {"name": "Julio"},
            "editor"   : editor,
            "apiKey"   :"2813d206-de1d-4084-890d-99fe7f3a5058",
            "app"      : "froala",
          };
          codox.init(config);
        },
        'snapshot.after': function () {
          const currentSlide = document.querySelector('#slides div.slide.active');
          const frView = document.querySelector('#wysiwyg .fr-view');
          currentSlide.innerHTML = frView.innerHTML;
        },
      }
    });
  }

  updated() {
    const currentSlide = document.querySelector('#slides div.slide.active');
    const frView = document.querySelector('#wysiwyg .fr-view');
    if (frView) {
      frView.innerHTML = currentSlide.innerHTML;
    }
  }

  stringToHTML = function (str) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, 'text/html');
    return doc.body;
  };

  activePresentation() {
    const title = page.current.split('/')[2];
    page("/revealjs/" + title);
  }

  render() {
    return html `
      <div class="diaporama">
        <button @click="${this.activePresentation}">Diaporama</button>
      </div>
      <div class="d-flex justify-content-between edit-presentation">
        <div id="slides">
          ${this.presentation.slides.map((slide, index) => html `
            <div
              class="slide ${index === 0 ? 'active' : index}"
              id="${Object.keys(slide)[0]}"
              @click="${this.selectSlide}">
              ${this.stringToHTML(Object.values(slide)[0])}
            </div>
          `)}
        </div>
        <div id="wysiwyg"></div>
      </div>
      <div id="wysiwyg-buttons">
        <button
          class="wysiwyg-button"
          @click="${this.addSlide}">
          Add slide
        </button>
        <button
          class="wysiwyg-button delete"
          @click="${this.deleteSlide}">
          Delete slide
        </button>
        <input
          @change="${this.onInputChange}"
          class="wysiwyg-input"
          type="text"
          required
          id="presentationName"
          value="${this.presentation.title}"
          readonly>
        <button
          class="wysiwyg-button save"
          @click="${this.saveSlides}">
          Save
        </button>
      </div>
    `;
  }
}

customElements.define("app-presentation-details", AppPresentationDetails);