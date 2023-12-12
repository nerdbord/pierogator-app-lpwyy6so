import { API } from "../api";
import { ApiModelsEnum } from "@/enums/ApiModels.enum";
import { ApiTypeEnum } from "@/enums/ApiType.enum";
import { postData } from "../global.service";

type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

interface GetNamePayload {
  model: ApiModelsEnum;
  messages: Message[];
}

interface Choice {
  index: number;
  finish_reason: string;
  message: Message;
}

interface GetNameResponse {
  // [key: string]: string | number;
  choices: Choice[];
  [key: string]: string | number | Choice[];
}

export async function getFactors(promptList: string) {
  console.log(promptList);
  const data = await postData<GetNamePayload, any>(
    "/openai/chat/completions",
    {
      model: ApiModelsEnum.GPT,
      messages: [
        {
          role: "user",
          content: promptList,
        },
      ],
    },
    ApiTypeEnum.OPENAI
  );
  const choices: Choice[] = data.choices;
  const generatedName = choices[0].message.content;

  return generatedName;
}
