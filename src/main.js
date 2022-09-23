import { getUserPresentation, getUserPresentations } from "./firebase";

import page from "page";

(async (root) => {
  const main = root.querySelector("main");

  const AppHome = main.querySelector("app-home");
  const AppLogin = main.querySelector("app-login");
  const AppNavBar = root.querySelector("app-navbar");
  const AppPresentation = main.querySelector("app-presentation");
  const AppPresentationDetails = main.querySelector("app-presentation-details");
  const AppPresentationAdd = main.querySelector("app-presentation-add");
  const AppReveal = main.querySelector("app-reveal");

  page("*", async (ctx, next) => {
    await import("./views/app-navbar.js");
    await import("./views/app-footer.js");

    AppHome.active = false;
    AppLogin.active = false;
    AppPresentation.active = false;
    AppPresentationDetails.active = false;
    AppPresentationAdd.active = false;
    AppReveal.active = false;

    const user = JSON.parse(localStorage.getItem('user'));

    AppNavBar.routeActive = page.current;
    AppNavBar.userIsLogged = user ? true : false;

    next();
  });

  page("/", async () => {
    await import("./views/app-home.js");

    AppHome.active = true;
  });

  page("/login", async () => {
    await import("./views/app-login.js");

    const user = JSON.parse(localStorage.getItem('user'));

    AppLogin.active = true;

    if (user) {
      page('/');
    }
  });

  page("/presentations", async () => {
    await import("./views/app-presentation.js");

    const user = JSON.parse(localStorage.getItem('user'));

    AppPresentation.active = true;

    const presentations = await getUserPresentations();

    const data = Object.entries(presentations);
    AppPresentation.presentations = data.map(presentation => ({
      id: presentation[0],
      title: presentation[1].title,
      description: presentation[1].description,
      createdAt: presentation[1].createdAt
    }));

    if (!user) {
      page('/login');
    }
  });

  page("/presentation/add", async () => {
    await import("./views/app-presentation-add.js");

    const user = JSON.parse(localStorage.getItem('user'));

    AppPresentationAdd.active = true;

    if (!user) {
      page('/login');
    }
  });

  page("/presentation/:id", async (ctx) => {
    await import("./views/app-presentation-details.js");

    const user = JSON.parse(localStorage.getItem('user'));

    AppPresentationDetails.active = true;

    const presentation = await getUserPresentation(ctx.params.id);

    AppPresentationDetails.presentation = presentation;

    if (!user) {
      page('/login');
    }
  });

  page("/revealjs/:id", async (ctx) => {
    await import("./views/app-reveal.js");

    const user = JSON.parse(localStorage.getItem('user'));

    AppReveal.active = true;

    const presentation = await getUserPresentation(ctx.params.id);

    AppReveal.presentation = presentation;

    if (!user) {
      page('/login');
    }
  });

  page();
})(document.querySelector("#app"));