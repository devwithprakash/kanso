import { ClerkProvider } from "@clerk/nextjs";

import { GlobalProviders } from "~/providers/global";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <GlobalProviders>{children}</GlobalProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
