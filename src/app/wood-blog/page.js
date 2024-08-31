"use client";

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function WoodBlogPage() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/wood-posts');
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/wood-posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      // Refresh the posts after creating a new one
      const res = await fetch('/api/wood-posts');
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setPosts(data);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      <h1>Wood Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>

      {/* {session && ( */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            required
          />
          <button type="submit">Create Post</button>
        </form>
      {/* )} */}
    </div>
  );
}
