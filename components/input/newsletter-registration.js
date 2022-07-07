import { useRef } from "react";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration({ message, onSubmit, resetForm }) {
  const emailInputRef = useRef();
  const registrationHandler = async (event) => {
    event.preventDefault();
    const email = emailInputRef.current.value;
    onSubmit(email);

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  };

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      {message ? (
        <>
          <div>{message}</div>
          <button onClick={resetForm}>Subscribe another email</button>
        </>
      ) : (
        <form onSubmit={registrationHandler}>
          <div className={classes.control}>
            <input
              ref={emailInputRef}
              type="email"
              id="email"
              placeholder="Your email"
              aria-label="Your email"
            />
            <button>Register</button>
          </div>
        </form>
      )}
    </section>
  );
}

export default NewsletterRegistration;
