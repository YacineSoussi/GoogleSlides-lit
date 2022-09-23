import { Base } from '../Base';
import { html } from 'lit';

export class PresentationData extends Base {
  constructor() {
    super();

    this.presentations = [];
  }

  static get properties() {
    return {
      presentations: { type: Array }
    };
  }

  render() {
    return html`
      <ul class="mb-2">
        ${this.presentations.map(presentation => html`
          <li class="mt-2 mb-2">
              <a
                class="presentation-link"
                href="/presentation/${presentation.title}">
                ${presentation.title}
              </a>
          </li>`
        )}
      </ul>
    `;
  }
}
customElements.define('presentation-data-component', PresentationData);