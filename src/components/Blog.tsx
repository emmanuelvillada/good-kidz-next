'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "lucide-react";

interface Post {
    id: number;
    title: string;
    excerpt: string;
    image?: string;
    created_at: string;

}

export default function Blog() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPosts() {
            try {
                setIsLoading(true);
                const { data, error } = await supabase
                    .from("blog")
                    .select("*")
                    .order("created_at", { ascending: false })
                    .limit(3);

                if (error) throw error;
                setPosts(data as Post[]);
            } catch (err) {
                setError("Error al cargar las noticias");
                console.error("Error fetching posts:", err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchPosts();
    }, []);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-verde-goodkidz"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <div className="bg-red-50 p-4 rounded-lg inline-block">
                    <p className="text-red-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <section className="container mx-auto py-16 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
            >
                <h2 className="text-4xl md:text-5xl text-gray-800 font-bold mb-4">
                    Últimas Noticias
                </h2>
                <div className="bg-verde-goodkidz w-24 h-1 mx-auto mb-6"></div>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Mantente informado sobre nuestras actividades y el impacto en la comunidad
                </p>
            </motion.div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {posts?.map((post) => (
                    <motion.div
                        key={post.id}
                        variants={item}
                        className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="relative h-48 overflow-hidden">
                            <Image
                                src={post.image || "/placeholder.png"}
                                alt={post.title}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="p-6">
                            {post.created_at && (
                                <div className="flex items-center gap-2 text-gray-500 mb-3">
                                    <Calendar className="w-4 h-4" />
                                    <span className="text-sm">
                                        {format(new Date(post.created_at), 'dd MMMM yyyy', { locale: es })}
                                    </span>
                                </div>
                            )}
                            <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                                {post.title}
                            </h3>
                            <p className="text-gray-600 mb-4 ">
                                {post.excerpt}
                            </p>

                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mt-12"
            >
                <a
                    href="/blog"
                    className="inline-flex items-center gap-2 bg-verde-goodkidz text-white px-6 py-3 
                            rounded-full font-semibold hover:bg-verde-goodkidz/90 transition-colors duration-300"
                >
                    Ver todas las noticias
                    <ArrowRight className="w-5 h-5" />
                </a>
            </motion.div> */}
        </section>
    );
}
