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
app.get('/', (req, res) => {
    const today = new Date().toISOString().split('T')[0];
    res.render('index', { selectedDate: today });
});
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

//프랑스 리그
app.get('/leagues/France', async (req, res) => {
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
        const FranceLeagues = leagues.filter(league => league.country.name === 'France');

        res.render('France', { leagues: FranceLeagues });
    } catch (error) {
        res.status(500).send('Error fetching leagues');
    }
});
//독일 리그
app.get('/leagues/Germany', async (req, res) => {
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
        const GermanyLeagues = leagues.filter(league => league.country.name === 'Germany');

        res.render('Germany', { leagues: GermanyLeagues });
    } catch (error) {
        res.status(500).send('Error fetching leagues');
    }
});
//스페인 리그
app.get('/leagues/Spain', async (req, res) => {
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
        const SpainLeagues = leagues.filter(league => league.country.name === 'Spain');

        res.render('Spain', { leagues: SpainLeagues });
    } catch (error) {
        res.status(500).send('Error fetching leagues');
    }
});
//이탈리아 리그
app.get('/leagues/Italy', async (req, res) => {
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
        const ItalyLeagues = leagues.filter(league => league.country.name === 'Italy');

        res.render('Italy', { leagues: ItalyLeagues });
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
//국가 대항전
app.get('/cupleagues/cupWorld', async (req, res) => {
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
        const cupWorldLeagues = response.data.response.filter(league => league.league.type === 'Cup' && league.country.name === 'World');
        res.render('cupWorld', { leagues: cupWorldLeagues });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching cup leagues');
    }
});
//리그 컵
app.get('/cupleagues/leagueCup', async (req, res) => {
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
        const leagueCupLeagues = response.data.response.filter(league => league.league.type === 'Cup' && league.country.name != 'World');
        res.render('leagueCup', { leagues: leagueCupLeagues });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching cup leagues');
    }
});

//웹에서 리그 정보 중 리그를 클릭하면 api에서 leagueId를 따오고 그 leagueId안에 있는 팀들의 정보를 출력하는 코드이지만
//rapidapi에서 리그 id와 팀 id를 모두 가져올 수 있는 api가 없어서 코드만 작성했습니다.
//만약 그런api가 후에 생긴다면 리그 정보에서 리그를 클릭하면 url의 숫자가 달라지면서 team 정보를 출력할수 있습니다.
app.get('/teams/:leagueId', async (req, res) => {
    try {
        const leagueId = parseInt(req.params.leagueId); // 클라이언트가 요청한 리그 ID
        const options = {
            method: 'GET',
            url: 'https://api-football-v1.p.rapidapi.com/v3/teams/statistics',
            params: {
                league: leagueId,
                season: '2020',
                team: 33
            },
            headers: {
                'X-RapidAPI-Key': RAPIDAPI_KEY,
                'X-RapidAPI-Host': RAPIDAPI_HOST
            }
        };
        
        const response = await axios.request(options);
        const teamsData = response.data.response; // 팀 정보를 포함하는 배열로 수정
        console.log("Teams Data:", teamsData);
        res.render('teams', { teams: teamsData }); // HTML 템플릿을 렌더링하여 응답을 보냄
    } catch (error) {
        res.status(500).send('Error fetching teams data');
    }
});

//경기 일정
app.get('/fixtures/:date', async (req, res) => {
    try {
        const date = req.params.date || '2021-01-29'; // 기본값으로 설정
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