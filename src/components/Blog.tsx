'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

interface Post {
    id: number;
    title: string;
    excerpt: string;
    image: string;
}

export default function Blog() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        async function fetchPosts() {
            const { data } = await supabase
                .from("blog")
                .select("*")
                .order("created_at", { ascending: false })
                .limit(3);

            setPosts(data as Post[]);
        }

        fetchPosts();
    }, []);

    return (
        <section className="container mx-auto py-12">
            <h2 className="text-3xl font-bold text-center">Últimas Noticias</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {posts?.map((post) => (
                    <div key={post.id} className="border p-4 rounded-lg shadow-lg">
                        <Image src={post.image} alt={post.title} width={300} height={200} className="rounded-md" />
                        <h3 className="text-xl font-semibold mt-2">{post.title}</h3>
                        <p className="text-gray-500">{post.excerpt}</p>
                        <a href={`/blog/${post.id}`} className="text-verde-goodkidz font-bold mt-2 inline-block">Leer más</a>
                    </div>
                ))}
            </div>
        </section>
    );
}
