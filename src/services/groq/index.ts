import Env from "../../configs/dotenv"

export default async function Groq({ message }: { message: string }) {
    const importedGroq = Env.NODE_ENV === 'production' ? await import('./groq') : await import('./fakeGroq')
    return importedGroq.default({ message })
}