const express = require('express');
const axios = require('axios');
const ejs = require('ejs');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST;

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
// 홈
app.get('/', async (req, res) => {
        res.render('index');
    })
//리그 정보
app.get('/leagues', async (req, res) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://api-football-v1.p.rapidapi.com/v3/leagues',
            headers: {
                'X-RapidAPI-Key': RAPIDAPI_KEY,
                'X-RapidAPI-Host': RAPIDAPI_HOST
            }
        };
        const response = await axios.request(options);
        const leagues = response.data.response;
        res.render('leagues', { leagues });
    } catch (error) {
        res.status(500).send('Error fetching leagues');
    }
});
//잉글랜드 리그
app.get('/leagues/England', async (req, res) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://api-football-v1.p.rapidapi.com/v3/leagues',
            headers: {
                'X-RapidAPI-Key': RAPIDAPI_KEY,
                'X-RapidAPI-Host': RAPIDAPI_HOST
            }
        };
        const response = await axios.request(options);
        const leagues = response.data.response;
        const englandLeagues = leagues.filter(league => league.country.name === 'England');

        res.render('England', { leagues: englandLeagues });
    } catch (error) {
        res.status(500).send('Error fetching leagues');
    }
});

//cup대회
app.get('/cupleagues', async (req, res) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://api-football-v1.p.rapidapi.com/v3/leagues',
            headers: {
                'X-RapidAPI-Key': RAPIDAPI_KEY,
                'X-RapidAPI-Host': RAPIDAPI_HOST
            }
        };
        const response = await axios.request(options);
        const cupLeagues = response.data.response.filter(league => league.league.type === 'Cup');
        res.render('cupLeagues', { cupLeagues });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching cup leagues');
    }
});
//경기 일정
app.get('/fixtures', async (req, res) => {
    try {
      const date = req.query.date || '2021-01-29'; 
      const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
        params: { date },
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': RAPIDAPI_HOST
        }
      };
  
      const response = await axios.request(options);
      const fixtures = response.data.response;
      res.render('fixtures', { fixtures, selectedDate: date });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching fixtures');
    }
  });
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});