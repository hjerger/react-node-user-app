const http = require('http');
const https = require('https');
const url = require('url');
const request = require('request');

const HOST_NAME = 'console.users.com';
const PATH = '/api/systemusers';
const HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-api-key': 'a848421e549ff3b2787907158a10e2bce730a403'
}

http.createServer(function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');

    const pathname = url.parse(req.url, true).pathname;

    if (pathname === '/users') {
        const options = {
            hostname: HOST_NAME,
            port: 443,
            path: PATH,
            method: 'GET',
            headers: HEADERS,
        }

        const apiReq = https.request(options, (apiRes) => {
            apiRes.on('data', (d) => {
                res.write(d);
                res.end();
            });
        });

        apiReq.on('error', (e) => {
            console.error(e);
        });
        apiReq.end();

    } else if (pathname === '/usercount') {
        const options = {
            hostname: HOST_NAME,
            port: 443,
            path: PATH,
            method: 'GET',
            headers: HEADERS,
        }

        const apiReq = https.request(options, (apiRes) => {
            apiRes.on('data', (d) => {
                let jsonData = JSON.parse(d);
                res.write(jsonData.totalCount.toString());
                res.end();
            });
        });

        apiReq.on('error', (e) => {
            console.error(e);
        });
        apiReq.end();


    } else if (pathname === '/delete') {
        const params = url.parse(req.url, true).query
        const apiPath = PATH + '/' + params.id

        const options = {
            hostname: HOST_NAME,
            port: 443,
            path: apiPath,
            method: 'DELETE',
            headers: HEADERS,
        }

        const apiReq = https.request(options, (apiRes) => {
            apiRes.on('data', (d) => {
                res.end(); //end the response
            });
        });

        apiReq.on('error', (e) => {
            console.error(e);
        });
        apiReq.end();

    } else if (pathname === '/create') {
        const params = url.parse(req.url, true).query

        let user = {
            username: params.username,
            email: params.email,
        }

        let options = {
            url: 'https://console.users.com/api/systemusers',
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify(user)
        };

        function callback(error, apiRes, body) {
            res.end();

            if (error) {
                console.log(error);
            }
        }

        request(options, callback);
    }
}).listen(8080);
