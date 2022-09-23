import { Base } from "../Base";
import { html } from "lit";
import { signOutUser } from "../firebase";

export class AppHome extends Base {
  constructor() {
    super();
  }

  signOut(event) {
    event.preventDefault();
    signOutUser();
  }

  render() {
    return html`
      <div class="header">
        <h1 class="text-center">The New Google Slides !</h1>
      </div>
    `;
  }
}

customElements.define("app-home", AppHome);