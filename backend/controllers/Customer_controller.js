import client from "../db";

export const View_mess = async (req, res) => {

    let exists;
    try {
      exists = await client.query("select * from Mess ");
    } catch (err) {
      console.log(err);
    }
    console.log(exists.rows);
    res.status(200).send(exists.rows);
  };


  export const Subscribe_mess = async (req, res) => {
    const { User_id, Mess_id, tokens } = req.body;
    // INSERT INTO TableName (DateColumn) VALUES (CURRENT_DATE);
    let exists;
    try {
      exists = await client.query("INSERT INTO Subscription(User_id,Mess_id,tokens,Daily_tokens,Subscription_date) VALUES($1,$2,$3,1,CURRENT_DATE);", [
        User_id, Mess_id, tokens
      ]);
    } catch (err) {
      console.log(err);
    }
    // console.log(exists.rows);
    res.status(200).send("Successfully Subscribed!");
  };
  
  // use to alert user that subscription is about to end 
  export const Remaining_Daily_tokens = async (req,res) => {
    const {User_id,Mess_id} = req.body;

    let exists;

    try {
      exists = await client.query("Select Daily_tokens from Subscriptions where Mess_id=$1 and User_id = $2",
      [
        Mess_id,User_id        
      ])
    }catch(err) {
      console.log(err);
    }

    res.status(200).send(exists.rowCount);
  }

  // when user changes number of tiffins per day
  export const Change_daily_tokens = async (req, res) => {
    const { User_id,Mess_id,Daily_tokens} = req.body;
    let exists;
    try {
      exists = await client.query("UPDATE Subscription SET Daily_tokens=$3 where User_id=$1 and Mess_id=$2",
      [
        User_id,Mess_id,Daily_tokens
      ]);
    } catch (err) {
      console.log(err);
    }
    // console.log(exists.rows);
    res.status(200).send("Successfully Updated Daily Tokens!");
  };

  export const Rate_Mess = async(req,res) => {

    const {User_id,Mess_id,Rating} = req.body;
    
    let exists;
    try {
      exists = await client.query("Select * from Ratings where User_id = $1 and Mess_id = $2",
      [
        User_id,Mess_id
      ]);
    } catch (err) {
      console.log(err);
    }

    if(exists.rowCount!=0)
    {
        res.status(500).send("Cannot Rate the same Mess multiple times");
    }else
    {
        try {
            exists = await client.query("Insert into Ratings(User_id,Mess_id,Rating) Values($1,$2,$3)",
            [
                User_id,Mess_id,Rating 
            ]);
          } catch (err) {
            console.log(err);
          }
    }
    res.status(200).send("Successfully Rated");
  }

  export const Update_profile = async (req, res) => {

    const {User_id,Fname, Lname, Phone_num, Password, User_address} = req.body;

    let exists;
    try {
      exists = await client.query("UPDATE Users SET Fname=$1, Lname=$2, Phone_num=$3, Password=$4, User_address=$5 where User_id=$6",
      [
        Fname, Lname, Phone_num, Password, User_address,User_id
      ]);
    } catch (err) {
      console.log(err);
    }
    // console.log(exists.rows);
    res.status(200).send("Successfully Updated Profile!");
  };

  export const filter_mess = async(req,res) => {
    
    const {Filter_rating} = req.body;
    let exists;

    try{
    exists = await client.query("select * from Mess where Mess_id in (Select Mess_id from Ratings group by Mess_id having avg(Rating)>$1)",[Filter_rating]);
    }catch(err){

      console.log(err);
    }
    res.status(200).send(exists.body);
  }

  export const Make_payment = async(req,res) => {
    
  }

  // daily tokens in subscription 
  // seperate rating table user id mess id rating 
   