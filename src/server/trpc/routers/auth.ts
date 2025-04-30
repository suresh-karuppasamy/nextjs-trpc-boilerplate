import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export const authRouter = router({
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
      })
    )
    .mutation(async ({ input }) => {
      const user = await User.findOne({ email: input.email });
      
      if (!user) {
        throw new Error('User not found');
      }

      const isValid = await bcrypt.compare(input.password, user.password);
      
      if (!isValid) {
        throw new Error('Invalid password');
      }

      return {
        user: {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        },
      };
    }),

  register: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
        name: z.string().min(2),
      })
    )
    .mutation(async ({ input }) => {
      const existingUser = await User.findOne({ email: input.email });
      
      if (existingUser) {
        throw new Error('Email already in use');
      }

      const hashedPassword = await bcrypt.hash(input.password, 10);
      
      const user = await User.create({
        ...input,
        password: hashedPassword,
      });

      return {
        user: {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        },
      };
    }),
}); 