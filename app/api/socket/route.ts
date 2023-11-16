'use server';
import { NextResponse } from 'next/server';

export async function GET(req: any, res: any) {
  console.log({ req, res });
  // if (res.socket.server.io) {
  //   console.log('Socket is already running');
  // } else {
  //   console.log('Socket is initializing');
  //   const io = new Server(res.socket.server);
  //   res.socket.server.io = io;
  // }
  return NextResponse.json({ ok: 'ok' });
}
