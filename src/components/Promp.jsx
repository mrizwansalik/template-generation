import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

export const Prompt = () => {
  const [prompt, setPrompt] = useState(
    "Here is a text. Write a short letter body on it of only 25 words"
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // open ai config
  const configuration = new Configuration({
    apiKey: "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",
  });
  // open ai instance
  const openai = new OpenAIApi(configuration);

  const generateTemp = async () => {
    console.log("generating...");
    setIsLoading(true);
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Here is a text. Write a short letter body on it of only 25 words: ${input}`,
        },
      ],
    });
    console.log("response", response);
    setPrompt(response.data.choices[0].message.content);
    setIsLoading(false);
  };
  return (
    <div className="container">
      <div className="input-container">
        <input
          className="input-field"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder="Enter your prompt..."
        />
        <button className="generate-button" onClick={generateTemp}>
          Generate
        </button>
      </div>
      {prompt && (
        <div className="output-container">
          <h2 className="output-header">AI Output:</h2>
          <p className="output-prompt">{prompt}</p>
        </div>
      )}
    </div>
  );
};
