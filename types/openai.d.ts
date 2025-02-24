declare module 'openai' {
  export default class OpenAI {
    constructor(options: {
      baseURL: string;
      apiKey: string;
      defaultHeaders?: Record<string, string>;
    });

    chat: {
      completions: {
        create: (params: {
          model: string;
          messages: Array<{ role: string; content: string }>;
        }) => Promise<{ choices: Array<{ message: { content: string } }> }>;
      };
    };
  }
}
