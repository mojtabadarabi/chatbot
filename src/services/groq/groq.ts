import Groq from "groq-sdk";
import Env from "../../configs/dotenv";

const groq = new Groq({ apiKey: Env.GROQ_API_KEY });

export default async function CallGroq({ message }: { message: string }) {
    try {
        const response = await groq.chat.completions
            .create({
                messages: [
                    {
                        role: "user",
                        content: message,
                    },
                ],
                model: "llama-3.3-70b-versatile",
            })
        const validResponse = response?.choices?.[0]?.message?.content
        if (validResponse) {
            return validResponse
        }
        console.log('Call groq get error +++++++++++++++++++');
        return null
    } catch (error) {
        console.log(error);
        console.log('Call groq get error +++++++++++++++++++');
        return null
    }
}