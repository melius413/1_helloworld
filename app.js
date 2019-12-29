// es6는 import abc from

const http = require('http'); // common.js
//console.log(http);
const host = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {    // 접속하면 콜백 함수 실행
    // 데몬으로 있다가 요청들 들어오면 콜백함수 실행
    // res.setHeader('Content-type', 'text/plain'); // 태그실행 안되고 문자로 찍힘
    // html 문서는 항상 헤드가 있고 바디가 있다.
    // 헤드설정 필요
    res.setHeader('Content-type', 'text/html');
    res.end('<h1>Hellow world</h1>');
});

// 리스닝 성공하면 콜백함수 실행
server.listen(port, host, () => {
    console.log(`http://${host}:${port}`);
});

// ctrl + 클릭 하면 콜솔창 주소접속 가능
// https://expressjs.com
// 익스프레스 프레임웍

