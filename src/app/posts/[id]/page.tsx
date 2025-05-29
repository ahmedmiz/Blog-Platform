import { api } from '@/lib/api';
import CommentList from '@/components/CommentList';
import Link from 'next/link';
import { Post, Comment, User } from '@/types';

interface PostPageProps {
    params: { id: string };
}

export default async function PostPage({ params }: PostPageProps) {
    const postId = parseInt(params.id);

    try {
        const [post, comments, author]: [Post, Comment[], User] = await Promise.all([
            api.getPost(postId),
            api.getComments(postId),
            api.getPost(postId).then(p => api.getUser(p.userId))
        ]);

        return (
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
                    ← Back to Posts
                </Link>

                <article className="bg-white rounded-lg shadow-md p-8 mb-8">
                    <header className="mb-6">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
                        <div className="flex items-center text-gray-600">
                            <span>By </span>
                            <Link
                                href={`/authors/${author.id}`}
                                className="text-blue-600 hover:text-blue-800 ml-1"
                            >
                                {author.name}
                            </Link>
                        </div>
                    </header>

                    <div className="prose max-w-none">
                        <p className="text-gray-700 leading-relaxed text-lg">{post.body}</p>
                    </div>
                </article>

                <CommentList comments={comments} />
            </div>
        );
    } catch (error) {
        return (
            <div className="text-center py-12">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Post Not Found</h1>
                <Link href="/" className="text-blue-600 hover:text-blue-800">
                    Return to Home
                </Link>
            </div>
        );
    }
}

export async function generateStaticParams() {
    const posts = await api.getPosts();
    return posts.map((post) => ({
        id: post.id.toString(),
    }));
}