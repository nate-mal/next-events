import excuteQuery from "../../../lib/db";

export const subscribe = async (email) => {
  const response = await excuteQuery({
    query: `INSERT INTO subscribers(email) VALUES("${email}")`,
  });
  return response;
};
export const checkDuplicate = async (email) => {
  const response = await excuteQuery({
    query: `SELECT email FROM subscribers WHERE email = "${email}"`,
  });
  console.log(response);
  if (response.length > 0) return true;
  else return false;
};

const Subscribe = async (req, res) => {
  if (req.method === "POST") {
    try {
      const email = req.body.email;
      const duplicate = await checkDuplicate(email);
      if (duplicate) {
        throw { message: "Email already subscribed" };
      }
      const response = await subscribe(email);
      console.log(response);
      res.status(201).json({
        message: `You succesfully subscribed for our newsletter!`,
      });
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
