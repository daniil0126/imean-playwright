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
    await page.route("**/api/**", async (route, request) => {
      const url = request.url();
      const method = request.method();
      console.log(`[MOCK] ${method} ${url}`);

      if (url.includes("/api/post/generate/") && method === "POST") {
        return route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            message: "Задание добавлено в очередь",
            jobId: 666,
          }),
        });
      }

      if (url.includes("/api/content-plan/") && method === "GET") {
        return route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            id: 2451,
            socialNetwork: this.socialMedia,
            week: 1,
            comment: null,
            weekDay: "",
            contentType: "Post",
            description: "Пост мокнутный hellyeah",
            leadingQuestions: null,
            details: null,
            date: "2025-07-16T06:34:41.436Z",
            model: "gpt-4o",
            deleted: false,
            deletedAt: null,
            forIndependentPosts: true,
            createdAt: "2025-07-16T06:07:54.786Z",
            updatedAt: "2025-07-16T06:34:41.437Z",
            UserId: 196,
          }),
        });
      }

      if (url.includes("/api/post/actual/")) {
        return route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            id: 1308,
            post: "Mocked post hellyeah",
            hashtags: "#Mock #IT #QA #Automation #imean #imean.io",
            media: "Тестировщик сидит за ноутом и не понимает как правильно мокать запросы",
            approved: false,
            approvedExtended: "not_approved",
            active: true,
            version: 1,
            images: [],
            video: null,
            countGenerateImage: 0,
            published: false,
            published_statuses: null,
            publishedAt: null,
            broken: false,
            brokenFb: false,
            brokenIn: false,
            brokenLn: false,
            attempts: 0,
            attemptsFb: 0,
            attemptsIn: 0,
            publishError: null,
            url: null,
            visible: true,
            modifiedModerator: false,
            useLogo: false,
            imagesWithLogo: null,
            originalText: null,
            createdAt: "2025-07-15T12:16:00.476Z",
            updatedAt: "2025-07-15T12:16:00.519Z",
            ContentPlanId: 2412,
            UserId: 196,
          }),
        });
      }
      return route.continue();
    });
  }
}
