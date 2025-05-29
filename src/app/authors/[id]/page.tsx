import { api } from '@/lib/api';
import AuthorCard from '@/components/AuthorCard';
import PostCard from '@/components/PostCard';
import Link from 'next/link';
import { User, Post } from '@/types';

interface AuthorPageProps {
    params: { id: string };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
    const userId = parseInt(params.id);

    try {
        const [author, allPosts]: [User, Post[]] = await Promise.all([
            api.getUser(userId),
            api.getPosts()
        ]);

        const authorPosts = allPosts.filter(post => post.userId === userId);

        return (
            <div className="max-w-6xl mx-auto">
                <Link href="/" className="text-blue-600 hover:text-blue-800 mb-6 inline-block">
                    ← Back to Posts
                </Link>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <AuthorCard author={author} />
                    </div>

                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">
                            Posts by {author.name} ({authorPosts.length})
                        </h2>

                        {authorPosts.length > 0 ? (
                            <div className="grid gap-6 md:grid-cols-2">
                                {authorPosts.map((post) => (
                                    <PostCard key={post.id} post={post} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600">No posts found for this author.</p>
                        )}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        return (
            <div className="text-center py-12">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Author Not Found</h1>
                <Link href="/" className="text-blue-600 hover:text-blue-800">
                    Return to Home
                </Link>
            </div>
        );
    }
}

export async function generateStaticParams() {
    const posts = await api.getPosts();
    const userIds = [...new Set(posts.map(post => post.userId))];

    return userIds.map((userId) => ({
        id: userId.toString(),
    }));
}