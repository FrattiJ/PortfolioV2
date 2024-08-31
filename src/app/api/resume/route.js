import connectMongo from '../../../lib/mongodb.js';
import ResumePost from '../../../models/ResumePost.js';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { db } = await connectMongo();
    const posts = await db.collection('resumeposts').find().toArray();
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.error('Error fetching resume posts:', error);
    return new Response('Error fetching resume posts', { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectMongo();
    const { company, role, duration, details } = await req.json();
    const newPost = new ResumePost({ company, role, duration, details });
    await newPost.save();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error creating resume post:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}