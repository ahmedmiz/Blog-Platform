import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { expect } from '@jest/globals';
import PostCard from '@/components/PostCard';
import { Post } from '@/types';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';

// Mock next/link
jest.mock('next/link', () => 
  function Link({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  }
);

// Mock the api
const mockUpdatePost = jest.fn();
const mockDeletePost = jest.fn();

jest.mock('@/lib/api', () => ({
    api: {
        updatePost: jest.fn(),
        deletePost: jest.fn(),
    }
}));

// Mock toast
const mockToast = {
    error: jest.fn(),
    success: jest.fn(),
};
jest.mock('react-hot-toast', () => mockToast);

describe('PostCard', () => {
    const mockPost: Post = {
        userId: 1,
        id: 1,
        title: 'Test Post',
        body: 'This is a test post body.',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('handles update error', async () => {
        const onUpdate = jest.fn();
        const error = new Error('Update failed');
        
        // Setup the mock to reject
        (api.updatePost as jest.Mock).mockRejectedValueOnce(error);

        render(<PostCard post={mockPost} onUpdate={onUpdate} />);

        // Trigger edit mode
        fireEvent.click(screen.getByText('Edit'));
        
        // Update the title
        const input = screen.getByDisplayValue('Test Post');
        fireEvent.change(input, { target: { value: 'Updated Title' } });
        
        // Click save and wait for error handling
        fireEvent.click(screen.getByText('Save'));

        await waitFor(() => {
            expect(api.updatePost).toHaveBeenCalledWith(1, 'Updated Title');
            expect(mockToast.error).toHaveBeenCalledWith('Failed to update post');
            expect(onUpdate).not.toHaveBeenCalled();
        });
    });

    // Add more test cases for success scenario
    it('handles successful update', async () => {
        const onUpdate = jest.fn();
        const updatedPost = { ...mockPost, title: 'Updated Title' };
        
        (api.updatePost as jest.Mock).mockResolvedValueOnce(updatedPost);

        render(<PostCard post={mockPost} onUpdate={onUpdate} />);

        fireEvent.click(screen.getByText('Edit'));
        const input = screen.getByDisplayValue('Test Post');
        fireEvent.change(input, { target: { value: 'Updated Title' } });
        fireEvent.click(screen.getByText('Save'));

        await waitFor(() => {
            expect(api.updatePost).toHaveBeenCalledWith(1, 'Updated Title');
            expect(mockToast.success).toHaveBeenCalledWith('Post updated successfully');
            expect(onUpdate).toHaveBeenCalled();
        });
    });
});