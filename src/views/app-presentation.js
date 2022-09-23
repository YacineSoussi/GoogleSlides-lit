import "../components/presentationData";

import { Base } from "../Base";
import { html } from "lit";
import page from "page";

export class AppPresentation extends Base {
  constructor() {
    super();

    this.presentations = [];
  }

  static get properties() {
    return {
      presentations: { type: Array }
    };
  };

  goToAddPresentation() {
    page("/presentation/add");
  }

  render() {
    return html`
      <div class="app-presentation-container">
        <h1 class="text-center">List of presentations</h1>
          <presentation-data-component
            .presentations="${this.presentations}">
          </presentation-data-component>
        <button @click="${this.goToAddPresentation}">Add presentation</button>
      </div>
    `;
  }
}

customElements.define("app-presentation", AppPresentation);