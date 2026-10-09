import type { Metadata } from "next";
import "./globals.css";
export const metadata:Metadata={title:"BFI-44 Profile Studio",description:"Strumento condivisibile per un profilo BFI-44"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="zh-CN"><body>{children}</body></html>;}
