"use client";
import Link from "next/link";
import { IoIosBug } from "react-icons/io";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import { Box } from "@radix-ui/themes";

const NavBar = () => {
	const pathname = usePathname();
	const { status, data: session } = useSession();
	const links = [
		{ name: "Dashboard", href: "/" },
		{ name: "Issues", href: "/issues" },
	];

	return (
		<nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
			<Link href="/" className="flex items-center space-x-2">
				<IoIosBug />
			</Link>
			<ul className="flex space-x-6">
				{links.map((link) => (
					<li key={link.href}>
						<Link
							href={link.href}
							className={classnames({
								"hover:text-zinc-800 transition-colors": true,
								"text-zinc-900": link.href === pathname,
								"text-zinc-500": link.href !== pathname,
							})}
						>
							{link.name}
						</Link>
					</li>
				))}
			</ul>
			<Box>
				{status === "authenticated" && <Link href="/api/auth/signout">Sign Out</Link>}
				{status === "unauthenticated" && <Link href="/api/auth/signin">Login</Link>}
			</Box>
		</nav>
	);
};
export default NavBar;
