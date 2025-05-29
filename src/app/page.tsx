import PostList from '@/components/PostList';

export default function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Latest Posts</h1>
      <PostList />
    </div>
  );
}