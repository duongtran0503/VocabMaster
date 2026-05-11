import { Roboto } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/lib/providers/query-provider";

// Giữ nguyên phần import Roboto và cấu hình như trước
const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto", // Biến này phải khớp với var() trong globals.css
  subsets: ["latin", "vietnamese"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
          <QueryProvider>
            {children}
          </QueryProvider>
      </body>
    </html>
  );
}