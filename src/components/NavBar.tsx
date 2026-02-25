"use client";
import Link from "next/link";
import { IoIosBug } from "react-icons/io";
import { usePathname } from "next/navigation";
import classnames from "classnames";

const NavBar = () => {
	const pathname = usePathname();
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
					<Link
						href={link.href}
						key={link.href}
						className={classnames({
							"hover:text-zinc-800 transition-colors": true,
							"text-zinc-900": link.href === pathname,
							"text-zinc-500": link.href !== pathname,
						})}
					>
						{link.name}
					</Link>
				))}
			</ul>
		</nav>
	);
};
export default NavBar;
