import axios from 'axios';
import { Post, User, Comment } from '@/types';
import toast from 'react-hot-toast';

const API_BASE = 'https://jsonplaceholder.typicode.com';

export const api = {
    async getPosts(): Promise<Post[]> {
        try {
            const response = await axios.get(`${API_BASE}/posts`);
            const userNamesResponse = await axios.get(`${API_BASE}/users`);
            const userNames = userNamesResponse.data.reduce((acc: Record<number, string>, user: User) => {
                acc[user.id] = user.name;
                return acc;
            }, {});
            response.data.forEach((post: Post) => {
                post.userName = userNames[post.userId];
            });
            return response.data;
        } catch (error) {
            toast.error('Failed to fetch posts');
            throw error;
        }
    },

    async getPost(id: number): Promise<Post> {
        try {
            const response = await axios.get(`${API_BASE}/posts/${id}`);
            return response.data;
        } catch (error) {
            toast.error('Failed to fetch post');
            throw error;
        }
    },

    async updatePost(id: number, title: string): Promise<Post> {
        try {
            const response = await axios.patch(`${API_BASE}/posts/${id}`, { title });
            toast.success('Post updated successfully');
            return response.data;
        } catch (error) {
            toast.error('Failed to update post');
            throw error;
        }
    },

    async deletePost(id: number): Promise<void> {
        try {
            await axios.delete(`${API_BASE}/posts/${id}`);
            toast.success('Post deleted successfully');
        } catch (error) {
            toast.error('Failed to delete post');
            throw error;
        }
    },

    async getUser(id: number): Promise<User> {
        try {
            const response = await axios.get(`${API_BASE}/users/${id}`);
            return response.data;
        } catch (error) {
            toast.error('Failed to fetch user');
            throw error;
        }
    },

    async getComments(postId: number): Promise<Comment[]> {
        try {
            const response = await axios.get(`${API_BASE}/posts/${postId}/comments`);
            return response.data;
        } catch (error) {
            toast.error('Failed to fetch comments');
            throw error;
        }
    },
};