import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

interface Config {
    PORT: number;
    NODE_ENV: 'development' | 'production' | 'test';
    GROQ_API_KEY: string;
}

const Env: Config = {
    PORT: parseInt(process.env.PORT || '3001'),
    NODE_ENV: (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'development',
    GROQ_API_KEY: process.env.GROQ_API_KEY || '',
};


export default Env;