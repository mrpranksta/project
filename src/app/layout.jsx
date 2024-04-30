
import { Inter } from "next/font/google";
import "./style.css";
import Navbar from "../components/nav";
import AuthContextProvider from "../components/authContext"

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <Navbar />
          <main>{children}</main>
        </AuthContextProvider>
      </body>
    </html>
  );
}
