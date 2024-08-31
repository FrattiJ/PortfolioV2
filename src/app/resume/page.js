"use client";

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function ResumePage() {
  const [posts, setPosts] = useState([]);
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [duration, setDuration] = useState('');
  const [details, setDetails] = useState('');
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/resume');
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
      await fetch('/api/resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ company, role, duration, details: details.split(',') }),
      });

      // Refresh the posts after creating a new one
      const res = await fetch('/api/resume');
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setPosts(data);
      setCompany('');
      setRole('');
      setDuration('');
      setDetails('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      <h1>Resume</h1>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h2>{post.company}</h2>
            <p>{post.role}</p>
            <p>{post.duration}</p>
            <ul>
              {post.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      {/* {session && ( */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company"
            required
          />
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Role"
            required
          />
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Duration"
            required
          />
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Details (comma-separated)"
            required
          />
          <button type="submit">Add Resume Post</button>
        </form>
      {/* )} */}
    </div>
  );
}
