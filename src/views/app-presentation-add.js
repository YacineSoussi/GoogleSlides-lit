import { Base } from "../Base";
import { html } from "lit";

export class AppPresentationAdd extends Base {
  constructor() {
    super();
  }

  firstUpdated() {
    new FroalaEditor('div#wysiwyg');
  }

  render() {
    return html`
      <div class="d-flex justify-content-between add-presentation">
        <div id="slides">
          <div
            class="slide active"
            id="slide-1"
            @click="${this.selectSlide}">
          </div>
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
          class="wysiwyg-input"
          type="text"
          required
          id="presentationName"
          placeholder="Presentation name ...">
        <button
          class="wysiwyg-button save"
          @click="${this.saveSlides}">
          Save
        </button>
      </div>
    `;
  }
}

customElements.define("app-presentation-add", AppPresentationAdd);