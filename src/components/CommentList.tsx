import { Comment } from '@/types';

interface CommentListProps {
    comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
    return (
        <div className="mt-8">
            <h3 className="text-2xl font-bold mb-6">Comments ({comments.length})</h3>
            <div className="space-y-4">
                {comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-800">{comment.name}</h4>
                            <span className="text-sm text-gray-500">{comment.email}</span>
                        </div>
                        <p className="text-gray-700">{comment.body}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}