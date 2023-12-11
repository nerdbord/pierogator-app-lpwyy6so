import { API } from "../api";
import { ApiModelsEnum } from "@/enums/ApiModels.enum";
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

export async function getFactors(promptList: Message[]) {
  console.log(promptList);
  const data = await postData<GetNamePayload, any>("/openai/chat/completions", {
    model: ApiModelsEnum.GPT,
    messages: [
      {
        role: "user",
        content:
          "Wygeneruj  po przecinku przykładowe przymiotniki opisujace ciasto na pierogi",
      },
      {
        role: "user",
        content:
          "Wygeneruj przykładowe po przecinku przymiotniki opisujace nadzienie na pierogi",
      },
      {
        role: "user",
        content: "Wygeneruj przykładowe składniki na pierogi-po przecinku ",
      },
    ],
  });
  console.log(data);
}
