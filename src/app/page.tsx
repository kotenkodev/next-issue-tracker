import Pagination from "@/components/Pagination";

export default async function Home({ searchParams }: { searchParams: { page: string } }) {
	const queryFilter = await searchParams;

	return <Pagination itemCount={100} itemsPerPage={10} currentPage={parseInt(queryFilter.page) || 1} />;
}
