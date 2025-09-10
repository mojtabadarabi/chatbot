import { getRandomInt } from "../../utils";

export default async function fakeCallGroq({ message, pass = true }: { message: string, pass?: boolean }) {
    try {
        const randomNumber = await getRandomInt(200,1000)
        console.log(randomNumber);
        
        const response = await new Promise((res, rej) => {
            setTimeout(() => {
                if (pass) {
                    return res('hi there')
                }
                return rej('failure')
            }, randomNumber)
        },)
        return response
    } catch (error) {
        console.log(error);
        console.log('Call groq get error +++++++++++++++++++');
        return null
    }
}