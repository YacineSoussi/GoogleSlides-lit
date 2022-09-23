import { Base } from "../Base";
import { html } from "lit";

export class AppFooter extends Base {
  constructor() {
    super();
  }

  render() {
    return html`
      <footer>
        <p class="text-center m-0">
          &copy; Google Slides
        </p>
      </footer>
    `;
  }
}

customElements.define("app-footer", AppFooter);