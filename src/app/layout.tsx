import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./theme-config.css";
import NavBar from "@/components/NavBar";
import { Container, Theme, ThemePanel } from "@radix-ui/themes";
import AuthProvider from "@/components/Provider";
import Provider from "@/components/QueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
});

export const metadata: Metadata = {
	title: "Issue Tracker",
	description: "A simple issue tracker built with Next.js and TypeScript.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.variable}>
				<Provider>
					<AuthProvider>
						<Theme accentColor="purple" grayColor="sage">
							<NavBar />
							<Container>
								<main className="p-5">{children}</main>
							</Container>
							{/* <ThemePanel /> */}
						</Theme>
					</AuthProvider>
					<ReactQueryDevtools initialIsOpen={false} />
				</Provider>
			</body>
		</html>
	);
}
