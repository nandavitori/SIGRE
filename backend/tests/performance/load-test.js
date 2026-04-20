import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 50 }, 
    { duration: '1m',  target: 50 },
    { duration: '20s', target: 0  },
  ],
};

export default function () {
  const url = 'http://localhost:8000/auth/login'; 
  
  const payload = JSON.stringify({
    username: 'teste', 
    password: 'teste',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params); 
  
  check(res, {
    'status code = 200': (r) => r.status === 200,
    'tempo de resposta < 800ms': (r) => r.timings.duration < 800,
  });

  sleep(1);
}