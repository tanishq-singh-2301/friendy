const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');

// Normal Routes
route.get('/', services.home);
route.get('/inside-game/:game_link', services.insideGame);
route.get('/game-answers/:game_link', services.gameAnswers);
route.get('/response/:game_link/:user_link', services.showResponse);
// route.get('/login', services.login);

// APIs
route.post('/api/add-game/', controller.add_game);
route.post('/api/submit_ans', controller.submit_ans);
route.get('/api/search-game/:game_link', controller.search_game);
route.get('/api/allow/:url', controller.allow);
route.get('/api/game-answers/:url', controller.game_answers)
route.get('/api/get-answers/:game_link/:user_link', controller.getAnswers)
// route.post('/api/login/', controller.login);

module.exports = route;