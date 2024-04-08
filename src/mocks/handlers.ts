import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://api.unsplash.com/search/photos", ({ request }) => {
    const url = new URL(request.url);

    const page = url.searchParams.get("page");
    const perPage = url.searchParams.get("per_page");
    const query = url.searchParams.get("query");
    const client_id = url.searchParams.get("client_id");

    if (
      page === "1" &&
      perPage === "20" &&
      query === "birds" &&
      client_id === "123"
    ) {
      return HttpResponse.json({
        data: [
          {
            id: "cssvEZacHvQ",
            urls: {
              small:
                "https://images.unsplash.com/photo-1433086966358-54859d0ed716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjEyNjB8MHwxfHNlYXJjaHwxfHxuYXR1cmV8ZW58MHx8fHwxNzEyNDUxNjc4fDA&ixlib=rb-4.0.3&q=80&w=400",
            },
            alt_description:
              "gray concrete bridge and waterfalls during daytime",
          },
          {
            id: "01_igFr7hd4",
            urls: {
              small:
                "https://images.unsplash.com/photo-1501854140801-50d01698950b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjEyNjB8MHwxfHNlYXJjaHwyfHxuYXR1cmV8ZW58MHx8fHwxNzEyNDUxNjc4fDA&ixlib=rb-4.0.3&q=80&w=400",
            },
            alt_description: "bird's eye view photograph of green mountains",
          },
        ],
        totalPages: 2,
      });
    }

    return new HttpResponse(null, { status: 404 });
  }),
];
