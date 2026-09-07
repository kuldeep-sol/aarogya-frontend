import { QUESTIONS } from '../data/demoData'
import type { ConversationAnswer, ConversationQuestion } from '../types'
import { wait } from './api'

export function getQuestions(): ConversationQuestion[] {
  return QUESTIONS
}

// Replace with POST /api/conversation
export async function submitConversation(answers: ConversationAnswer[]): Promise<ConversationAnswer[]> {
  await wait(700)
  return answers
}
