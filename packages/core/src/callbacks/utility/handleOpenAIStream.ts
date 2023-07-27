import { ChatCompletionChunk } from "openai/resources/chat";
import { globalsHelper } from "../../GlobalsHelper";
import { StreamCallbackResponse, Event } from "../CallbackManager";
import { APIResponse } from "openai/core";
import { Stream } from "openai/streaming";
import { MessageType } from "../../llm/LLM";

/**
 * Handles the stream of responses from OpenAI.
 * @param response - The stream of responses from OpenAI.
 * @param onLLMStream - The callback to call with each response.
 * @param parentEvent - The parent event, if any.
 * @returns A promise that resolves to an object containing the cumulative message and the role of the last message.
 * 
 * Example:
 * 
 * ```typescript
 * const response = await openai.chatCompletion({ model: "text-davinci-002", messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: "Who won the world series in 2020?" }] });
 * handleOpenAIStream({ response, onLLMStream: (data) => console.log(data), parentEvent: new Event() }).then(({ message, role }) => console.log(`Message: ${message}, Role: ${role}`));
 * ```
 */
export async function handleOpenAIStream({
  response,
  onLLMStream,
  parentEvent,
}: {
  response: APIResponse<Stream<ChatCompletionChunk>>;
  onLLMStream: (data: StreamCallbackResponse) => void;
  parentEvent?: Event;
}): Promise<{ message: string; role: MessageType }> {
  const event = globalsHelper.createEvent({
    parentEvent,
    type: "llmPredict",
  });
  let index = 0;
  let cumulativeText = "";
  let messageRole: MessageType = "assistant";
  for await (const part of response) {
    const { content = "", role = "assistant" } = part.choices[0].delta;

    // ignore the first token
    if (!content && role === "assistant" && index === 0) {
      continue;
    }

    cumulativeText += content;
    messageRole = role;
    onLLMStream?.({ event, index, token: part });
    index++;
  }
  onLLMStream?.({ event, index, isDone: true });
  return { message: cumulativeText, role: messageRole };
}
