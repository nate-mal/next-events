import { useRef, useState, useContext } from "react";
import classes from "./new-comment.module.css";
import NotificationContext from "../../store/notification-context";
function NewComment(props) {
  const [isInvalid, setIsInvalid] = useState(false);
  const [sendComment, setSendComment] = useState(false);
  const [message, setMessage] = useState();
  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const commentInputRef = useRef();
  const notificationCtx = useContext(NotificationContext);
  async function sendCommentHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredComment = commentInputRef.current.value;

    if (
      !enteredEmail ||
      enteredEmail.trim() === "" ||
      !enteredEmail.includes("@") ||
      !enteredName ||
      enteredName.trim() === "" ||
      !enteredComment ||
      enteredComment.trim() === ""
    ) {
      setIsInvalid(true);
      setMessage("");
      return;
    }
    setMessage("Loading...");
    setSendComment(true);

    props.onAddComment({
      email: enteredEmail,
      name: enteredName,
      text: enteredComment,
    });

    emailInputRef.current.value = "";
    nameInputRef.current.value = "";
    commentInputRef.current.value = "";
    setSendComment(false);
    setMessage("comment succesfully added");
  }

  return (
    <form onSubmit={sendCommentHandler} className={classes.form}>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor="email">Your email</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" ref={nameInputRef} />
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor="comment">Your comment</label>
        <textarea id="comment" rows="5" ref={commentInputRef}></textarea>
      </div>
      {isInvalid && <p>Please enter a valid email address and comment!</p>}
      {message && <p>{message}</p>}
      <button disabled={sendComment}>
        {sendComment ? "Loading..." : "Submit"}
      </button>
    </form>
  );
}

export default NewComment;
