const connection = require('../database/connection');
const db = connection();

exports.add_game = (req, res) => {
    const game_name = req.body.userpassword;
    db.database().ref('game-infos/current-users').get()
        .then((user_played) => {
            db.database().ref(`users/${user_played.val() + 1}`).get()
                .then((snap) => {
                    if (snap.exists()) {
                        res.send('Game name already exists. Try with different name.')
                    } else {
                        data = {
                            "created_by": game_name,
                            "allow": true,
                            "total_game_answered": 0,
                            "game_url": user_played.val() + 1,
                            "game_answered": {
                                "test_user": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            }
                        }

                        db.database().ref(`users/${user_played.val() + 1}`).set(data)
                        db.database().ref('game-infos/').set({
                            "current-users": user_played.val() + 1,
                            "connected": true
                        })
                        res.redirect(`/inside-game/${user_played.val() + 1}/`)
                    }
                })
        })

}

exports.search_game = (req, res) => {
    var query = req.params.game_link;

    db.database().ref(`users/${query}`).get()
        .then((snap) => {
            if (snap.exists()) {
                res.send(snap.val())
            } else {
                res.send('link broken')
            }
        })
}

exports.submit_ans = (req, res) => {

    // Increment total_game_answered
    db.database().ref(`users/${req.body.url}/total_game_answered/`).get()
        .then((snap) => {
            db.database().ref(`users/${req.body.url}/total_game_answered/`).set(snap.val() + 1)

            data = {
                "url_of_the_user": snap.val() + 1,
                "answers": req.body
            }
            // Pushing the data with the username 
            db.database().ref(`users/${req.body.url}/game_answered/${snap.val() + 1}`).set(data)
        })

    res.redirect(`/inside-game/${req.body.url}`)
}

exports.allow = (req, res) => {
    console.log(req.params.url)
    db.database().ref(`users/${req.params.url}/allow`).set(false);
    res.send('Done')
}

exports.game_answers = (req, res) => {
    var url = req.params.url;

    db.database().ref(`users/${url}/total_game_answered/`).get()
        .then((snap) => {
            var total_game_answered = snap.val();

            // Fetching the users responses
            db.database().ref(`users/${url}/game_answered/`).get()
                .then((responses) => {
                    var responses = responses.val()

                    data = {
                        "total_responses": total_game_answered,
                        "responses_itself": responses
                    }

                    res.json(data)
                })
        })
}

exports.getAnswers = (req, res) => {
    var game_link = req.params.game_link;
    var user_link = req.params.user_link;

    db.database().ref(`users/${game_link}/game_answered/${user_link}/answers`).get()
        .then((snap) => {
            res.json(snap.val())
        })
}