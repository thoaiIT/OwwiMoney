'use client';
import React, { useEffect, useState } from 'react';
import openSocket from 'socket.io-client';
let socket: any;

function Client() {
  const [data, setData] = useState<{ action: string; message: string }[]>([]);
  const fakeSendMessage = (e: any) => {
    e.preventDefault();
    // (async () => {
    //   const response = await fetch('/api/chat', {
    //     method: 'POST',
    //     body: JSON.stringify({ message: Math.round(Math.random() * 1000) }),
    //   });
    //   const data = await response.json();
    //   console.log({ data });
    // })();
    socket.emit('chat', { action: 'push', message: 'ok' });
  };
  useEffect(() => {
    // (async () => {
    //   const response = await fetch('/app/api/socket');
    //   const data = await response.json();

    //   const socket = openSocket();
    //   socket.on('chat', (data: { action: string; message: string }) => {
    //     if (data.action === 'push') {
    //       setData((prev) => {
    //         const update = [...prev];
    //         update.push({ ...data });
    //         return update;
    //       });
    //     }
    //   });
    //   setData(data.streamData);
    // })();
    socket = openSocket('http://localhost:3000/');
    socket.on('chat', (data: { action: string; message: string }) => {
      if (data.action === 'pushed') {
        console.log(`client on chat got emit ${data.message}`);
        setData((prev) => {
          const update = [...prev];
          update.push({ ...data });
          return update;
        });
      }
    });
    // return () => {
    //   socket.disconnect();
    // };
  }, []);
  return (
    <div>
      <form onSubmit={fakeSendMessage}>
        {data.map((item, i) => {
          return <div key={i}>{item.message}</div>;
        })}
        <button type="submit">Send message</button>
      </form>
    </div>
  );
}

export default Client;
