import { Submission } from './Models/Submission';


const API_URL = 'https://ce.judge0.com'


export function GET_LANGUAGES(){
    return {
        url: `${API_URL}/languages`,
        options: {
			method: 'GET',
		}
    }
}


export function POST_SUBMISSION(submission: Submission){
    return {
        url: `${API_URL}/submissions/?base64_encoded=true&wait=true`,
        options: {
            method: 'POST',
            headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(submission)
        }
    }
}
