import http from 'k6/http';
import { check } from 'k6';


export default function () {
    const body = JSON.stringify({
        username: 'test_5544555787' + Date.now(),
        password: 'test'
    });

    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    http.post('https://test-api.k6.io/user/register/', body, params);
}

/*

k6 run --http-debug="full" http-post-request.js
*/