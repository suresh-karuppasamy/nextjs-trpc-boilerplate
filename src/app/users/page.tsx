'use client';

import { trpc } from '@/utils/trpc';
import { useState } from 'react';

export default function UsersPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const utils = trpc.useUtils();
  const { data: users, isLoading } = trpc.user.getAll.useQuery();
  const createUser = trpc.user.create.useMutation({
    onSuccess: () => {
      utils.user.getAll.invalidate();
      setName('');
      setEmail('');
    },
  });
  const updateUser = trpc.user.update.useMutation({
    onSuccess: () => {
      utils.user.getAll.invalidate();
      setEditingId(null);
      setName('');
      setEmail('');
    },
  });
  const deleteUser = trpc.user.delete.useMutation({
    onSuccess: () => {
      utils.user.getAll.invalidate();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateUser.mutate({ id: editingId, name, email });
    } else {
      createUser.mutate({ name, email });
    }
  };

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {editingId ? 'Update' : 'Create'}
          </button>
        </div>
      </form>

      <div className="grid gap-4">
        {users?.map((user) => (
          <div
            key={user.id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingId(user.id);
                  setName(user.name);
                  setEmail(user.email);
                }}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteUser.mutate({ id: user.id })}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 