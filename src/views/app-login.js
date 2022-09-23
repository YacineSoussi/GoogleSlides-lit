import { signInUser, signUpUser } from "../firebase";

import { Base } from "../Base";
import { html } from "lit";

export class AppLogin extends Base {
  constructor() {
    super();
  }

  signIn(event) {
    event.preventDefault();
    const email = event.target.querySelector("input[type=email]").value;
    const password = event.target.querySelector("input[type=password]").value;
    signInUser(email, password);
  }

  signUp(event) {
    event.preventDefault();
    const email = event.target.querySelector("input[type=email]").value;
    const password = event.target.querySelector("input[type=password]").value;
    signUpUser(email, password);
  }

  render() {
    return html`
      <div class="main">
        <input type="checkbox" id="chk" aria-hidden="true">
        <div class="signup">
          <form @submit="${this.signUp}">
            <label for="chk" aria-hidden="true">Sign up</label>
            <input type="email" name="email" placeholder="Email" required="">
            <input type="password" name="pswd" placeholder="Password" required="">
            <button>Sign up</button>
          </form>
        </div>
        <div class="login">
          <form @submit="${this.signIn}">
            <label for="chk" aria-hidden="true">Login</label>
            <input type="email" name="email" placeholder="Email" required="">
            <input type="password" name="pswd" placeholder="Password" required="">
            <button>Login</button>
          </form>
        </div>
      </div>
    `;
  }
}

customElements.define("app-login", AppLogin);