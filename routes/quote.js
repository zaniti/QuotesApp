const fs = require('fs');

module.exports = {
    addQuotePage: (req, res) => {
      // SELECT authors.id, authors.name, quotes.id, quotes.quote, quotes.source, quotes.authorid FROM authors INNER JOIN quotes ON authors.id=quotes.authorid



      db.query('SELECT q.* , a.name FROM quotes q JOIN authors a ON q.authorid = a.id', function(err, result) {
          if (err) {
              return res.status(500).send(err);
          }else{
            res.render('index', {
              title: "Welcome to Zniti Quotes | All Quotes"
              ,quotes: result
            });
            // console.log(result);
          }

      });

    },
    addQ: (req, res) => {

      res.render('add-quote.ejs', {
          title: "Welcome to Zniti Quotes | Add a new Quote"
          ,message: ''
      });

    },
    addQuote: (req, res) => {

        let message = '';
        let id;
        let name = req.body.name;
        let source = req.body.source;
        let quote = req.body.quote;



        var author={
         id : id,
         name: name
     }

     db.query('INSERT INTO authors SET ?', author, function (err, result) {

         if (!err) {

             var data = {
                 id: id,
                 quote: quote,
                 source: source,
                 authorid: result.insertId

             }

             db.query('INSERT INTO quotes SET ?', data, function (err, result) {
                 if (!err) {

                     res.redirect('/');

                 }
             })
         }
     })



        // send the quotes's details to the database
        // let query = "INSERT INTO quotes (source, quote) VALUES ('" + source + "', '" + quote + "')";
        // db.query(query, (err, result) => {
        //     if (err) {
        //         return res.status(500).send(err);
        //     }
        //     res.redirect('/');
        // });

        // send the authors's details to the database


    },
    editQuotePage: (req, res) => {
        let quoteId = req.params.id;
        let query = "SELECT * FROM `quotes` WHERE id = '" + quoteId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-quote.ejs', {
                title: "Welcome to Zniti Quotes | Edit  Quote"
                ,quote: result[0]
                ,message: ''
            });
        });
    },
    editQuote: (req, res) => {
        let quoteId = req.params.id;
        let name = req.body.name;
        let source = req.body.source;
        let quote = req.body.quote;



        let query = "UPDATE quotes SET quote = '" + quote + "', source = '" + source + "' WHERE id = '" + quoteId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            let querya = "UPDATE authors SET name = '" + name + "' WHERE id = '" + quoteId + "'";
            db.query(querya, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
            res.redirect('/');
        });
        });
    },
    deleteQuote: (req, res) => {
        let quoteId = req.params.id;
        let deleteQuoteQuery = 'DELETE FROM quotes WHERE id = "' + quoteId + '"';

        db.query(deleteQuoteQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            let deleteAuthorQuery = 'DELETE FROM authors WHERE id = "' + quoteId + '"';
            db.query(deleteAuthorQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
            res.redirect('/');
        });
        });


    }
};
