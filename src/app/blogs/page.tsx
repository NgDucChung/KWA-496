'use client'

import DataTable from "../component/app.table";
import useSWR from "swr";

const BlogsPage = () => {

    const fetcher = (url: string) => fetch(url)
        .then((res) => res.json());

    const { data, error, isLoading } = useSWR(
        "http://localhost:8000/blogs",
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );

    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <div className="mx-10">
            <DataTable blogs={data?.sort((a: any, b: any) => b.id - a.id)} />

        </div>
    )
}

export default BlogsPage;