'use client';
import { useState, useMemo } from 'react';
import PostCard from './PostCard';
import SearchBar from './SearchBar';
import LoadingSpinner from './LoadingSpinner';
import { usePosts } from '@/hooks/usePosts';
import { Pagination } from 'antd';

const POSTS_PER_PAGE = 6;

export default function PostList() {
    const { posts, isLoading, error, refetch } = usePosts();
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredPosts = useMemo(() => {
        return posts.filter(post =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.body.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [posts, searchQuery]);

    const paginatedPosts = useMemo(() => {
        const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
        return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
    }, [filteredPosts, currentPage]);


    const handleDelete = (_deletedId: number) => {
        refetch();
    };

    const handleUpdate = (_updatedId: number, _newTitle: string) => {
        refetch();
    };

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div className="text-red-600">Error loading posts: {error.message}</div>;

    return (
        <div>
            <SearchBar onSearch={setSearchQuery} />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {paginatedPosts.map((post) => (
                    <PostCard
                        key={post.id}
                        post={post}

                        onDelete={handleDelete}
                        onUpdate={handleUpdate}
                    />
                ))}
            </div>


            <div className="mt-8 flex justify-center space-x-2">
                <Pagination showSizeChanger={false} defaultCurrent={1} total={posts.length} current={currentPage} onChange={(e) => setCurrentPage(e)} defaultPageSize={POSTS_PER_PAGE} />

            </div>
        </div>
    );
}
