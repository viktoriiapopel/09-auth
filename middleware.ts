//
// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";
import { checkSession } from "./lib/serverApi";

const privateRoutes = ["/profile", "/notes"];
const authRoutes = ["/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  console.log({
    pathname,
    isAuthRoute,
    isPrivateRoute,
    accessToken: Boolean(accessToken),
    refreshToken: Boolean(refreshToken),
  });

  // 🧩 1. Якщо є accessToken — користувач залогінений
  if (accessToken) {
    // Не пускаємо на сторінки /sign-in або /sign-up
    if (isAuthRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    // Дозволяємо доступ до приватних маршрутів
    if (isPrivateRoute) {
      return NextResponse.next();
    }
  }

  // 🧩 2. Якщо немає accessToken, але є refreshToken — перевіряємо сесію
  if (!accessToken && refreshToken) {
    const response = await checkSession();

    if (response?.headers?.["set-cookie"]) {
      const cookieHeader = response.headers["set-cookie"];
      const cookieArray = Array.isArray(cookieHeader)
        ? cookieHeader
        : [cookieHeader];

      const newResponse = NextResponse.next();

      // Копіюємо всі cookies з бекенду у відповідь middleware
      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);
        const name = Object.keys(parsed)[0];
        const value = parsed[name];
        if (name && value) {
          newResponse.cookies.set({
            name,
            value,
            path: parsed.Path || "/",
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          });
        }
      }

      // Якщо користувач намагається перейти на сторінку авторизації — відправляємо його на головну
      if (isAuthRoute) {
        return NextResponse.redirect(new URL("/", request.url));
      }

      // Якщо приватний маршрут — дозволяємо доступ
      if (isPrivateRoute) {
        return newResponse;
      }
    }
  }

  // 🧩 3. Якщо користувач неавторизований
  if (!accessToken && !refreshToken) {
    // Дозволяємо доступ до сторінок входу/реєстрації
    if (isAuthRoute) {
      return NextResponse.next();
    }

    // Редіректимо з приватних сторінок на логін
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
