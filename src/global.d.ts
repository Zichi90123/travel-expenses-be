import { User } from './auth/entity/user.type';

declare global {
  interface Request {
    user?: User; // Replace `any` with the actual type of `user` if known
  }
}

export {};
