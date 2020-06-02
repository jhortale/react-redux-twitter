import React, { useState } from "react";
import { connect } from "react-redux";
import { handleAddTweet } from "../actions/tweets";
import { Redirect } from "react-router-dom";

const NewTweet = ({ dispatch, id }) => {
  const [state, setState] = useState({
    text: "",
    toHome: false,
  });
  const { text, toHome } = state;
  const handleChange = (e) => {
    const text = e.target.value;
    setState(() => ({
      text,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { text } = state;
    dispatch(handleAddTweet(text, id));

    setState(() => ({
      text: "",
      toHome: id ? false : true,
    }));
  };
  if (toHome === true) {
    return <Redirect to="/" />;
  }
  const tweetLeft = 280 - text.length;

  return (
    <div>
      <h3 className="center">Compose new Tweet</h3>
      <form className="new-tweet" onSubmit={handleSubmit}>
        <textarea
          placeholder="What's happening?"
          value={text}
          onChange={handleChange}
          className="textarea"
          maxLength={280}
        />
        {tweetLeft <= 100 && <div className="tweet-length">{tweetLeft}</div>}
        <button className="btn" type="submit" disabled={text === ""}>
          Submit
        </button>
      </form>
    </div>
  );
};
export default connect()(NewTweet);
