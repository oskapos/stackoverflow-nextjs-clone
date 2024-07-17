'use server';

import { connectToDatabase } from '../mongoose';
import Question from '@/database/question.model';
import Tag from '@/database/tag.model';
import { CreateQuestionParams, GetQuestionsParams } from './shared.types';
import User from '@/database/user.model';
import { revalidatePath } from 'next/cache';

export async function getQuestions(params: GetQuestionsParams) {
  try {
    await connectToDatabase();

    const questions = await Question.find({}).populate({ path: 'tags', model: Tag }).populate({ path: 'author', model: User }).sort({ createdAt: -1 });

    return { questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    await connectToDatabase();

    const { title, content, tags, author, path } = params;

    // create the question
    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagsDocument = [];

    // establish relations Question <--> Tag
    // create the tags or get them if they already exist
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, 'i') } },
        { $setOnInsert: { name: tag }, $push: { question: question._id } },
        { upsert: true, new: true }
      );

      tagsDocument.push(existingTag._id);

      await Question.findByIdAndUpdate(question._id, {
        $push: { tags: { $each: tagsDocument } },
      });
    }

    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}
