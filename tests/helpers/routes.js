export class LoginRoutes {
  async setup(page) {
    await page.route("**/api/auth/refresh-token", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          accessToken: "FAKE_TOKEN_STRING_HERE",
        }),
      });
    });

    await page.route("**/api/profile", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ emailVerified: true }),
      });
    });

    await page.route("**/api/strategy/actual/", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: [],
      });
    });

    await page.route("**/fonts.googleapis.com/**", (route) => {
      route.fulfill({
        status: 200,
        body: "",
      });
    });

    await page.route("**/static/media/**", (route) => {
      route.fulfill({
        status: 200,
        body: "",
      });
    });
  }
}

export class RegisterRoutes {
  async setup(page) {
    await page.route("/api/profile", (route) => {
      route.fulfill({ status: 200, body: "" });
    });
    await page.route("/api/auth/refresh-token", (route) => {
      route.fulfill({ status: 200, body: "" });
    });
    await page.route("/api/auth/register", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: {
          emailVerified: true,
        },
      });
    });

    await page.route("**/fonts.googleapis.com/**", (route) => {
      route.fulfill({
        status: 200,
        body: "",
      });
    });

    await page.route("**/static/media/**", (route) => {
      route.fulfill({
        status: 200,
        body: "",
      });
    });
  }
}


export class PostGenerateRoutes {
  constructor(socialMedia) {
    this.socialMedia = socialMedia;
  }

  async setup(page) {
    // Перехватываем запрос на сохранение поста
    await page.route("**/api/post/save", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          message: "Задание добавлено в очередь",
          jobId: 666,
        }),
      });
    });

    // Перехватываем запрос на получение контент-плана
    await page.route("**/api/content-plan/**", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: 2451,
          socialNetwork: this.socialMedia,
          week: 1,
          comment: null,
          weekDay: "",
          contentType: "Post",
          description: `Пост для ${this.socialMedia}`,
          leadingQuestions: null,
          details: null,
          date: new Date().toISOString(),
          model: "gpt-4o",
          deleted: false,
          deletedAt: null,
          forIndependentPosts: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          UserId: 196,
        }),
      });
    });

    // Перехватываем запрос на получение актуального поста
    await page.route("**/api/post/actual/*", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: 1308,
          post: `Мокнутый пост для ${this.socialMedia}`,
          hashtags:"#Mock #QA #Playwright #imean" ,
          media: "Искусственный интеллект тестирует сам себя" ,
          approved: false,
          approvedExtended: "not_approved",
          active: true,
          version: 1,
          images: [],
          video: null,
          countGenerateImage: 0,
          published: false,
          visible: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ContentPlanId: 2412,
          UserId: 196,
        }),
      });
    });
  }
}
