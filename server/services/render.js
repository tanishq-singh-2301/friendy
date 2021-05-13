const axios = require('axios');

exports.home = (req, res) => res.render('home');
// exports.login = (req, res) => res.render('login');

exports.insideGame = (req, res) => {
    var query = req.params.game_link;

    axios.get(`https://friend-meter.herokuapp.com/api/search-game/${query}`)
        .then(function (result) {
            if (result.data.allow) {
                console.log('i m in')
                axios.get(`https://friend-meter.herokuapp.com/api/allow/${query}`)
                    .then(function (data__) {
                        console.log(data__.data)
                    })
                res.render("inside-game", { data: result.data, data_2: true })
            } else {
                res.render("inside-game", { data: result.data, data_2: false })
            }
        })
        .catch(err => {
            res.send(err);
        })
}

exports.gameAnswers = (req, res) => {
    var game_link = req.params.game_link;

    axios.get(`https://friend-meter.herokuapp.com/api/game-answers/${game_link}`)
        .then(function (result) {
            res.render("game-answers", { data: result.data })
        })
        .catch(err => {
            res.send(err);
        })
}

exports.showResponse = (req, res) => {
    var game_link = req.params.game_link;
    var user_link = req.params.user_link;

    axios.get(`https://friend-meter.herokuapp.com/api/get-answers/${game_link}/${user_link}`)
        .then((result) => {
            res.render("user-response", { data: result.data })
        })
}