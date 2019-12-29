const express = require('express'); // 경로없이 넣으면 node_modules폴더에서 찾는다.
// const express = require('./node_modules/express/index'); // 랑 같음
const app = express();
const host = "127.0.0.1";
const port = 3000;

app.listen(port, () => {
    console.log(`http://${host}:${port}`);
});

app.get("/", (req, res) => {
    // http 객체랑 좀 사용함수가 다름
    res.send("<h1>Hello world</h1>");
});

app.get("/hello", (req, res) => {
    res.send("<h1>Hello JavaScript</h1>");
});

app.get("/home", (req, res) => {
    let name = req.query.name;
    res.send(`<h1>${name}님 반갑습니다. Home입니다.</h1>`);
});

app.get("/api/user", (req, res) => {
    let users = {
        users: [{
                id: 1,
                name: '홍길동',
                age: 25
            },
            {
                id: 2,
                name: '홍길만',
                age: 31
            },
            {
                id: 3,
                name: '홍길룡',
                age: 28
            },
        ],
        cnt: 3
    };
    res.json(users); // express 함수
    // node는 json.stringfy, json.parse 등을 써야한다.
});
// json: javascript object notation

// url '3000/blog/js/1 ... 시멘틱 url
app.get("/blog/:category/:id", (req, res) => {
    let category = req.params.category;
    let id = req.params.id;

    // send가 없으면 브라우저는 계속 서버의 응답을 기다림
    res.send(`<h2>category:${category}, id:${id}</h2>`);
});