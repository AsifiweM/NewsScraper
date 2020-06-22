const request = require('request');
const cheerio = require('cheerio');
const express = require('express');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log('app running on port', PORT);

app.get('/igihe', (req, res) => {
    let igiheResults = [];

    function getIgiheArticles() {
        request('https://igihe.com/', (error, response, html) => {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html);
                $(
                    '.col-sm-5 .article-wrap .row .col-md-12 .homenews .row'
                ).each((i, el) => {
                    let article = {
                        outlet: 'Igihe',
                        link: '',
                        title: '',
                        picture: '',
                    };
                    article.link = 'igihe.com/' + $(el).find('a').attr('href');
                    article.title = $(el).find('span').text();
                    article.picture =
                        'igihe.com/' +
                        $(el).find('.col-xs-3 div a img').attr('data-original');

                    igiheResults.push(article);
                });
            }
        });
        setTimeout(function () {
            igiheResults.pop();
            return res.status(200).send(igiheResults);
        }, 10000);
    }

    getIgiheArticles();
});