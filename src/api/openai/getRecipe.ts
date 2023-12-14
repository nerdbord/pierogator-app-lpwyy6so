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
  // [key: string]: string | number;
  choices: Choice[];
  [key: string]: string | number | Choice[];
}

interface Choice {
  index: number;
  finish_reason: string;
  message: Message;
}

export async function getRecipe(prompt: string, notes: string = "") {
  const isApiCallAvailable = await avoidMultipleRequest("getName");
  if (isApiCallAvailable) {
    const messages: Message[] = [
      {
        role: "user",
        // content: `Wygeneruj przepis na pierogi na podstawie podanych składników: ${promptFactors}, uwzglednij rowniez podane uwagi w przepisie:${notes}`,
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

    console.log(data);

    const choices: Choice[] = data.choices;
    const generatedName = choices[0].message.content;

    return generatedName;
  }
}
