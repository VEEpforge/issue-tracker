'use client'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai';
import { useState } from 'react';

export default function Home() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });
  const [input, setInput] = useState('');
  console.log(messages)

  return (
    <main className="flex w-full h-screen flex-col items-center justify-center p-24">
      {/* <h1>Hello, World!</h1> */}
      <div className={`flex flex-col items-center gap-4 w-full max-w-2xl`}>

        {/* {messages.map(message => (
          <div
            key={message.id}
            className={`flex w-full ${message.role === "user" ? "justify-end" : "justify-start"} mb-2`}
          >
            {message.role === 'user' ? 'User: ' : 'AI: '}
            {message.parts.map((part, index) =>
              part.type === 'text' ? <span key={index}>{part.text}</span> : null,
            )}
          </div>
        ))} */}

        {messages.map(message => (
          <div
            key={message.id}
            className={`flex w-full ${message.role === "user" ? "justify-end" : "justify-start"} mb-2`}
          >
            <div
              className={`max-w-[50%] rounded-xl px-4 py-3 text-sm shadow-sm ${
                message.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              {message.role === 'user' ? 'User: ' : 'AI: '}
              {message.parts.map((part, index) =>
                part.type === 'text' ? <span key={index}>{part.text}</span> : null,
              )}
            </div>
          </div>
        ))}

        <form
          onSubmit={e => {
            e.preventDefault();
            if (input.trim()) {
              sendMessage({ text: input });
              setInput('');
            }
          }}
        >
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={status !== 'ready'}
            placeholder="Say something..."
          />
          <button type="submit" disabled={status !== 'ready'}>
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
