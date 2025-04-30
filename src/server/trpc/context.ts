import { inferAsyncReturnType } from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/auth.config';
import connectDB from '@/lib/mongodb';

export async function createContext(opts: CreateNextContextOptions) {
  const session = await getServerSession(authConfig);
  await connectDB();

  return {
    session,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>; 