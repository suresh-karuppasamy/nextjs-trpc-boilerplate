import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';

// Mock database
let users = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
];

export const userRouter = router({
  getAll: protectedProcedure.query(() => {
    return users;
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return users.find((user) => user.id === input.id);
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(2),
        email: z.string().email(),
      })
    )
    .mutation(({ input }) => {
      const newUser = {
        id: String(users.length + 1),
        ...input,
      };
      users.push(newUser);
      return newUser;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(2).optional(),
        email: z.string().email().optional(),
      })
    )
    .mutation(({ input }) => {
      const index = users.findIndex((user) => user.id === input.id);
      if (index === -1) {
        throw new Error('User not found');
      }
      users[index] = { ...users[index], ...input };
      return users[index];
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      const index = users.findIndex((user) => user.id === input.id);
      if (index === -1) {
        throw new Error('User not found');
      }
      const deletedUser = users[index];
      users = users.filter((user) => user.id !== input.id);
      return deletedUser;
    }),
}); 