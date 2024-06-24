import client from "../db.js";
export const createUser = async (req, res) => {
  const { Fname, Lname, Phone_num, Email, Password, User_address, User_type} = req.body;
  let exists;
  try {
    exists = await client.query(
      "Select * from Users where Users.email=$1 and Users.type=$2;",
      [Email,User_type]
    );
  } catch (err) {
    console.log(err);
  }
  
  if (exists.rowCount != 0) {
    res.status(500).send("User already Existed. Try Sign in instead ");
  } else {
    let newUser;
    try {
      newUser = await client.query(
        "INSERT INTO Users(Fname, Lname, Phone_num, Email, Password, User_address, User_type) VALUES ($1,$2,$3,$4,$5,$6,$7);",
        [Fname, Lname, Phone_num, Email, Password, User_address, User_type]
      );
      res.status(200).send("User has been created");
    } catch (err) {
      console.log(err);
    }
  }
};

export const logInUser = async (req, res) => {
  console.log("Email");
  const { Email, Password, User_type} = req.body;
  
  let userExists;
  try {
    userExists = await client.query(
      "select User_id from Users WHERE Email=$1 and Password=$2 and User_type=$3;",
      [Email, Password, User_type]
    );
  } catch (err) {
    console.log(err);
  }
  if (userExists.rowCount == 1) {
    res.status(200).send(userExists.rows[0]);
  } else {
    res.status(500).send("User does not Exists");
  }
};
