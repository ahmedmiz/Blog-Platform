'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Post } from '@/types';
import { api } from '@/lib/api';

interface PostCardProps {
    post: Post;
    onDelete?: (id: number) => void;
    onUpdate?: (id: number, newTitle: string) => void;
}

export default function PostCard({ post, onDelete, onUpdate }: PostCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(post.title);
    const [isLoading, setIsLoading] = useState(false);

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
                        <button
                            onClick={handleUpdate}
                            disabled={isLoading}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                            {isLoading ? 'Saving...' : 'Save'}
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">
                        <Link href={`/posts/${post.id}`} className="hover:text-blue-600 transition-colors">
                            {post.title}
                        </Link>
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.body}</p>
                    <div className="flex justify-between items-center">
                        <Link
                            href={`/authors/${post.userId}`}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                        >

                            Author : {post.userName || post.userId}
                        </Link>
                        <div className="space-x-2">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isLoading}
                                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                            >
                                {isLoading ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}