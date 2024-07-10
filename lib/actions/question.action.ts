'use server';

import { error } from 'console';
import { connectToDatabase } from '../mongoose';

export async function createQuestion(params: any) {
  try {
    await connectToDatabase();
  } catch (error) {
    console.error(error);
  }
}
