const express = require('express'); // 경로없이 넣으면 node_modules폴더에서 찾는다.
// const express = require('./node_modules/express/index'); // 랑 같음
const app = express();
const host = "127.0.0.1";
const port = 3000;
const bodyParser = require('body-parser');
//express가 버전 4가 되면서 익스프레스가 가지고 있음, middleware 미들웨어임

app.locals.pretty = true;   // 내려보내주는 html이 이쁘게 보임(페이지 소스보기)
app.set('view engine', 'pug'); // 미들웨어 아님, 설정
app.set('views', './views');    // 폴더 설정

//미들웨어 쓸데 use메소드 씀
app.use(bodyParser.json()); // 요청이 json으로 들어오면, 파싱

// json은 속성명도 문자열""
// JSON.stringify(자바스크랩트 객체) >> json
// JSON.parse(json) >> 자바스크랩트 객체

app.use(bodyParser.urlencoded({extended: false})); // 포스트 방식이면, 멀티파트(binary) 관련 파싱 안하겠다.
// binary는 멀터가 해석해줌

// 루트에 있는 파일을 클라이언트가 직접 접근하지 못하게 되어있음
// 클라이언트가 접근할수 있는 폴더 설정
// 지정한 public 폴더를 클라이언트가 접근가능한 정적 폴더로 만든다.
app.use("/", express.static("./public")); // form.html이 있니? 확인함... '/'은 진입url
// use는 필터링을 거쳐서 다시 내보냄

app.listen(port, () => {
    console.log(`http://${host}:${port}`);
});

// alt+shift+a 여러줄 수석
/*
app.get("/", (req, res) => {
    // http 객체랑 좀 사용함수가 다름
    res.send("<h1>Hello world</h1>");
});
 */
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

app.get('/home2', (req, res) => {
    //res.send, res.json//
    //res.sendFile("./index.html"); // '/index.html'과 './index.html'의 차이
    //왜 안되냐? 정적파일 경로 설치해야함?? 
    //경로..?? 파일경로..?? url경로..??

    //왜안되지?? static해도 안됨
    //res.sendFile("/index.html"); // '/index.html'과 './
});

// 포스트방식은 파싱해서 받아야하는데, 바디파서 실행해야함
app.post("/join", (req, res) => {
    let userid = req.body.userid;
    let userpw = req.body.userpw;
    res.send(`userid: ${userid} / userpw: ${userpw}`);
});

app.get('/pug', (req, res) => {
    let vals = {
        title: 'pug 연습',
        name: req.query.name || 'TEST', // es6 문법
    }
    res.render("form.pug", vals);
});