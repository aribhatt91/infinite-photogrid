import { ThemeProvider } from "@/lib/providers/ThemeProvider";
import { RoutePresence } from '@/lib/motion/RoutePresence';
import { ThemeToggle } from "@/components/ThemeToggle";
import QueryProvider from '@/lib/providers/QueryProvider';
import "./globals.css";

// app/layout.tsx
export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <QueryProvider>
          <ThemeProvider>
            <ThemeToggle />
            <RoutePresence modal={modal}>
              {children}
            </RoutePresence>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}