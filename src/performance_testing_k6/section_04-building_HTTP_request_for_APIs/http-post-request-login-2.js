import http from 'k6/http';
import { check } from 'k6';


export default function () {
    const credentials = {
        username: 'test_24654641' + Date.now(),
        password: 'test' + Date.now(),
    }

    http.post(
        'https://test-api.k6.io/user/register/', 
        JSON.stringify(credentials), 
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    let res = http.post(
        'https://test-api.k6.io/auth/token/login/', 
        JSON.stringify(
            {
                username: credentials.username,
                password: credentials.password
            }
        ),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    const accessToken = res.json().access;
    console.log(accessToken);
}

/*

k6 run --http-debug="full" http-post-request.js
*/