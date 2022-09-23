import { Base } from "../Base";
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import Reveal from 'reveal.js';
import { html } from "lit";

export class AppReveal extends Base {
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

  updated() {
    this.deck = new Reveal({
      plugins: [ Markdown ],
      center: false,
      embedded: false,
      disableLayout: true
    });

    this.deck.initialize();
  }

  stringToHTML = function (str) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, 'text/html');
    return doc.documentElement.textContent;
  };

  render() {
    return html`
      <div class="reveal">
        <div class="slides">
          ${this.presentation.slides.map((slide, index) => html `
            <section class="${index === 0 ? 'present' : 'future'}">
              ${this.stringToHTML(Object.values(slide)[0])}
            </section>
          `)}
        </div>
      </div>
    `;
  }
}

customElements.define("app-reveal", AppReveal);