import connectMongo from '../../../lib/mongodb.js';
import TechPost from '../../../models/TechPost.js';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { db } = await connectMongo();
    const posts = await db.collection('techposts').find().toArray();
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.error('Error fetching tech posts:', error);
    return new Response('Error fetching tech posts', { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectMongo();
    const { title, content } = await req.json();
    const newPost = new TechPost({ title, content });
    await newPost.save();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error creating tech post:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
