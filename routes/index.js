module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM `quotes` ORDER BY id ASC"; // query database to get all the quotes

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: "Welcome to Zniti Quotes | View Quotes"
                ,quotes: result
            });
        });
    },
};
