import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

export const Prompt = () => {
    const [prompt, setPrompt] = useState('')
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
// open ai config
const configuration = new Configuration({
  apiKey: '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',
});
// open ai instance
const openai = new OpenAIApi(configuration);
 
const generateTemp = async() => {
  console.log('generating...')
    setIsLoading(true)
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "user", content: `Here is a text. Write a short letter body on it of only 25 words: ${prompt}` },
    ],
  });
  console.log('response', response)
  setPrompt(response.data.choices[0].message.content)
  setIsLoading(false)

}
    return(
        <div>
            <input onChange={(e) => setInput(e.target.value)} value={input} />
            <button onClick={generateTemp}>Generate</button>
            <p>{prompt}</p>
        </div>
    )
}