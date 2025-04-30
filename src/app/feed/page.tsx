'use client';

import { trpc } from '@/utils/trpc';
import { useState } from 'react';

// Mock feed data
const mockPosts = [
  {
    id: '1',
    content: 'This is the first post!',
    author: 'John Doe',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    content: 'Another interesting post here.',
    author: 'Jane Smith',
    createdAt: new Date().toISOString(),
  },
];

export default function FeedPage() {
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState(mockPosts);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post = {
      id: String(posts.length + 1),
      content: newPost,
      author: 'Current User',
      createdAt: new Date().toISOString(),
    };

    setPosts([post, ...posts]);
    setNewPost('');
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Feed</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's on your mind?"
            className="flex-1 border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Post
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border p-4 rounded-lg shadow-sm bg-white"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold">{post.author}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            <p className="text-gray-800">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 