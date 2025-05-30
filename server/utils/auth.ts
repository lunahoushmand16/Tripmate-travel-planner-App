import * as jwt from 'jsonwebtoken';
import { Request } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET || '';
const expiration = '2h';

interface Payload {
  username: string;
  email: string;
  _id: string;
}

export function signToken({ username, email, _id }: Payload): string {
  return jwt.sign({ data: { username, email, _id } }, secret, { expiresIn: expiration });
}

export function authMiddleware({ req }: { req: Request & { user?: Payload } }): Request {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (token && token.startsWith('Bearer ')) {
    token = token.split(' ').pop()?.trim();
  }

  if (!token) return req;

  try {
    const { data } = jwt.verify(token, secret) as { data: Payload };
    req.user = data;
  } catch {
    console.warn('Invalid token');
  }

  return req;
}
