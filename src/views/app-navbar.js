import { Base } from "../Base";
import { html } from "lit";
import { signOutUser } from "../firebase";

export class AppNavBar extends Base {
  constructor() {
    super();
  }

  render() {
    return (this.userIsLogged) ?
      html`
        <nav class="navbar navbar-expand-lg">
          <div class="container-fluid">
            <a class="navbar-brand" href="/">Google Slides</a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-between" id="navbarNavDropdown">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link" href="/presentations">Presentations</a>
                </li>
              </ul>
              <span class="nav-item" id="logout">
                <button class="ps-0" @click="${signOutUser}">Logout</button>
              </span>
            </div>
          </div>
        </nav>
      ` :
      html`
        <nav class="navbar navbar-expand-lg">
          <div class="container-fluid">
            <a class="navbar-brand" href="/">Google Slides</a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-between" id="navbarNavDropdown">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link" href="/presentations">Presentations</a>
                </li>
              </ul>
              <span class="nav-item" id="login">
                <a class="nav-link" href="/login">Login</a>
              </span>
            </div>
          </div>
        </nav>
      `;
  }
}

customElements.define("app-navbar", AppNavBar);