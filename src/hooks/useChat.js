import { useCallback, useState } from 'react';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import { getOllamaUrl } from '../utils';

const ngrokURL = 'https://9374-2400-adc5-439-bd00-ac2d-4d26-3b78-421b.ngrok-free.app';

export const useChat = (
  model = 'llama3.2',
  baseUrl = getOllamaUrl(),   // override per platform
) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error,   setError]     = useState(null);

  const send = useCallback(async (prompt) => {
    const userMsg = {
      id: uuid(),
      role: 'user',
      content: prompt,
      createdAt: Date.now(),
    };
    setMessages(prev => [userMsg,...prev ]);
    setLoading(true);
    setError(null);
        console.log("BASEURL", baseUrl)

    try {
      const requestBody = JSON.stringify({
          model,
          stream: false,
          messages: [...messages, userMsg].map(({ role, content }) => ({ role, content })),
        })
      const res = await fetch(`${baseUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: requestBody,
      });
      console.log("REQUEST ERROR", JSON.stringify(res))
      if (!res.ok) {
        console.log("REQUEST ERROR", JSON.stringify(res))
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      const assistantText = data.message.content;

      setMessages(prev => [
        {
          id: uuid(),
          role: 'assistant',
          content: assistantText,
          createdAt: Date.now(),
        },
        ...prev
      ]);
    } catch (e) {
      console.log("EEEEE", e)
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [messages, baseUrl, model]);

  return { messages, send, loading, error };
}