const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

exports.register = (req, res) => {
  console.log(req.body);

  //   const name = req.body.name;
  //   const email = req.body.email;
  //   const password = req.body.password;
  //   const passwordConfirm = req.body.passwordConfirm;

  const { name, email, password, passwordConfirm } = req.body;

  db.query(
    "SELECT email FROM users WHERE email = ?",
    [email],
    (error, results) => {
      if (error) {
        console.log(error);
      }
      if (results.length > 0) {
        return res.render("register", {
          message: "That email is already in use",
        });
      } else if (password !== passwordConfirm) {
        return res.render("register", {
          message: "Passwords do not match",
        });
      }
      db.query(
        "INSERT INTO users SET ?",
        { name: name, email: email, password: password },
        (error, results) => {
          if (error) {
            console.log(error);
          } else {
            console.log(results);
            return res.render("register", { message: "User registered" });
          }
        }
      );
    }
  );
};

exports.login = (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (error, results) => {
      if (error) {
        console.log(error);
      }
      if (results.length > 0) {
        return res.render("index");
      } else {
        return res.render("login", {
          message: "Email or Password wrong",
        });
      }
    }
  );
};
