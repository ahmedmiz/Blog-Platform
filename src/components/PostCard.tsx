'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Post } from '@/types';
import { api } from '@/lib/api';
import { usePathname } from 'next/navigation';
interface PostCardProps {
    post: Post;
    onDelete?: (id: number) => void;
    onUpdate?: (id: number, newTitle: string) => void;
}

export default function PostCard({ post, onDelete, onUpdate }: PostCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(post.title);
    const [isLoading, setIsLoading] = useState(false);


    const pathname = usePathname();
    const [showAuthor] = useState(pathname?.includes('/authors/'));
    const handleUpdate = async () => {
        if (!editTitle.trim()) return;

        setIsLoading(true);
        try {
            await api.updatePost(post.id, editTitle);
            onUpdate?.(post.id, editTitle);
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update post:', error);
        }
        setIsLoading(false);
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this post?')) return;

        setIsLoading(true);
        try {
            await api.deletePost(post.id);
            onDelete?.(post.id);
        } catch (error) {
            console.error('Failed to delete post:', error);
        }
        setIsLoading(false);
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            {isEditing ? (
                <div className="mb-4">
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        disabled={isLoading}
                    />
                    <div className="mt-2 space-x-2">
                        <button aria-label="Update"
                            onClick={handleUpdate}
                            disabled={isLoading}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                            {isLoading ? 'Saving...' : 'Save'}
                        </button>
                        <button aria-label="Edit"
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">
                        <Link href={`/posts/${post.id}`} className="hover:text-blue-600 transition-colors">
                            {post.title}

                        </Link>
                    </h2>
                    <div style={{ display: 'flex', alignItems: "flex-end" }} className='mb-4'>
                        <p className="text-gray-600 line-clamp-3 text-sm">{(post.body.slice(0, 130).concat('...'))}</p>
                        {post.body.length > 130 && (
                            <Link href={`/posts/${post.id}`} className="text-blue-600 hover:text-blue-800 text-sm " style={{ textWrap: 'nowrap' }}>
                                Read more
                            </Link>
                        )}
                    </div>

                    <div className="flex justify-between items-center">
                        {!showAuthor && < Link
                            href={`/authors/${post.userId}`}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                        >

                            Author : {post.userName || post.userId}
                        </Link>}
                        <div className="space-x-2">
                            <button aria-label="Edit"
                                onClick={() => setIsEditing(true)}
                                className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
                            >
                                Edit
                            </button>
                            <button
                                aria-label="Delete"
                                onClick={handleDelete}
                                disabled={isLoading}
                                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                            >
                                {isLoading ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )
            }
        </div >
    );
}