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
    await page.route("**/api/profile/", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: 196,
          username: "d7035821@gmail.com",
          name: "daniil",
          email: "d7035821@gmail.com",
          moderatorRole: null,
          adminRole: null,
          languageGeneration: "ru",
          auth_type: "local",
          facebook_refresh_token: null,
          google_refresh_token: null,
          linkedin_refresh_token: null,
          tiktok_refresh_token: null,
          apple_refresh_token: null,
          passwordResetToken: null,
          passwordResetExpires: null,
          timeZone: "UTC+5",
          threadId: "thread_leG9LnRHs7evXu17fv41pyKN",
          coordinates: null,
          isDeleted: false,
          requestDeleteAt: null,
          curator: false,
          moderatorOrg: false,
          vectorStoreId: "vs_687e2e02f50481918d50cedd99c1c075",
          facebookPageId: "745900831929601",
          linkedinPageId: "urn:li:person:rgPiX8Ifc-",
          gender: "other",
          cardSaved: false,
          emailVerified: true,
          emailVerifyToken: "9832",
          emailVerifyExpires: "2025-07-11T14:31:52.346Z",
          createdAt: "2025-07-11T13:31:51.314Z",
          updatedAt: "2025-07-22T07:10:30.577Z",
          OrganizationId: null,
          ProfileId: null,
          SupportId: null,
        }),
      });
    });

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
          hashtags: "#Mock #QA #Playwright #imean",
          media: "Искусственный интеллект тестирует сам себя",
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
