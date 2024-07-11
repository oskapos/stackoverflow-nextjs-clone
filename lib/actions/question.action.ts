'use server';

import { connectToDatabase } from '../mongoose';
import Question from '@/database/question.model';
import Tag from '@/database/tag.model';

export async function createQuestion(params: any) {
  try {
    await connectToDatabase();

    const { title, content, tags, author, path } = params;

    //create the question
    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagsDocument = [];

    //establish relations Question <--> Tag

    //create the tags or get them if they already exist
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
  } catch (error) {
    console.error(error);
  }
}
