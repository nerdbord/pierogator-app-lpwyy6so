import { AxiosError } from "axios";
import { ApiModelsEnum } from "@/enums/ApiModels.enum";
import { postData } from "../global.service";
import { avoidMultipleRequest } from "@/helpers.ts/avoidMultipleRequest";
import { ApiTypeEnum } from "@/enums/ApiType.enum";

type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

interface GetNamePayload {
  model: ApiModelsEnum;
  messages: Message[];
}

interface GetNameResponse {
  choices: Choice[];
  [key: string]: string | number | Choice[];
}

type GPTResponse = {
  [key: string]: string | number | Choice[];
};

interface Choice {
  index: number;
  finish_reason: string;
  message: Message;
}

interface Ingredient {
  name: string;
  quantity: string;
}

function parseIngredients(input: string): Ingredient[] {
  return input.split(",").map((item) => {
    const [name, quantity] = item.split(":");
    return { name, quantity };
  });
}

export const getDoughIngredientsDetails = async (
  prompt: string
): Promise<Ingredient[]> => {
  const messages: Message[] = [
    {
      role: "user",
      content: prompt,
    },
  ];

  const data = await postData<GetNamePayload, GetNameResponse>(
    "/openai/chat/completions",
    {
      model: ApiModelsEnum.GPT,
      messages,
    },
    ApiTypeEnum.OPENAI
  );

  const choices: Choice[] = data.choices;
  const gptRes = choices[0].message.content;
  const result: Ingredient[] = parseIngredients(gptRes);

  return result;
};

export const getFillIngredientsDetails = async (
  prompt: string
): Promise<Ingredient[]> => {
  const messages: Message[] = [
    {
      role: "user",
      content: prompt,
    },
  ];

  const data = await postData<GetNamePayload, GetNameResponse>(
    "/openai/chat/completions",
    {
      model: ApiModelsEnum.GPT,
      messages,
    },
    ApiTypeEnum.OPENAI
  );

  const choices: Choice[] = data.choices;
  const gptRes = choices[0].message.content;
  const result: Ingredient[] = parseIngredients(gptRes);
  return result;
};
