import "./globals.css";


export const metadata = {
  title: "TravelPay",
  description: "TravelPay is a simple app to split bills between friends.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
