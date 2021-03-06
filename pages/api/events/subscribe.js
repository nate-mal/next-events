import excuteQuery from "../../../lib/db";

export const subscribe = async (email) => {
  return excuteQuery({
    query: `INSERT INTO subscribers(email) VALUES('${email}');`,
  });
};
export const checkDuplicate = async (email) => {
  const response = await excuteQuery({
    query: `SELECT * FROM subscribers WHERE email = '${email}'`,
  });
  console.log("checkDuplicate" + response);
  if (response.length != 0) return true;
  else return false;
};

const Subscribe = async (req, res) => {
  if (req.method === "POST") {
    const email = req.body.email;
    try {
      const validEmail = (email) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          return true;
        }
        return false;
      };

      if (!validEmail(email)) {
        res.status(201).json({
          message: `Invalid email address, check you input please!`,
        });
      } else {
        const duplicate = await checkDuplicate(email);
        if (duplicate) {
          res.status(201).json({
            message: `You already subscribed for our newsletter, thank you for that!`,
            duplicate: true,
          });
        } else {
          const response = await subscribe(email);
          console.log(response);
          res.status(201).json({
            message: `You succesfully subscribed for our newsletter!`,
          });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(422).json({
        message: `Something went wrong, please try again later!`,
        error: error,
      });
    }
  } else {
    res.status(422).json({ message: "Only post requests are allowed" });
  }
};
export default Subscribe;
