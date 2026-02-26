import Link from "next/link";

const IssueNotFound = () => {
	return (
		<div className=" flex flex-col items-center justify-center min-h-screen">
			<h1 className="text-6xl font-bold mb-4">404</h1>
			<h2 className="text-2xl mb-4">Issue Not Found</h2>
			<p className="text-gray-600 mb-8">The issue you are looking for does not exist.</p>
			<Link href="/issues" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
				Go to Issues List
			</Link>
		</div>
	);
};
export default IssueNotFound;
