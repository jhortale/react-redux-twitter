import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { formatTweet, formatDate } from "../utils/helpers";
import ReplyAllOutlinedIcon from "@material-ui/icons/ReplyAllOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import { handleToggleTweet } from "../actions/tweets";

const Tweet = ({ authedUser, tweet, dispatch, id, history }) => {
  const {
    name,
    avatar,
    timestamp,
    text,
    hasLiked,
    likes,
    replies,
    parent,
  } = tweet;
  const toParent = (e, id) => {
    e.preventDefault();
    history.push(`/tweet/${id}`);
  };
  const handleLike = (e) => {
    e.preventDefault();
    dispatch(handleToggleTweet({ id, authedUser, hasLiked }));
    //todo: handle like button
  };
  return !tweet ? (
    <p>This Tweet doesn't exists</p>
  ) : (
    <Link to={`/tweet/${id}`} className="tweet">
      <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
      <div className="tweet-info">
        <div>
          <span>{name}</span>
          <div>{formatDate(timestamp)}</div>
          {parent && (
            <button
              className="replying-to"
              onClick={(e) => toParent(e, parent.id)}
            >
              Replying to {parent.author}
            </button>
          )}
          <p>{text}</p>
        </div>
        <div className="tweet-icons">
          <ReplyAllOutlinedIcon className="tweet-icon" />
          <span>{replies !== 0 && replies}</span>
          <button className="heart-button" onClick={handleLike}>
            {hasLiked ? (
              <FavoriteOutlinedIcon
                className="tweet-icon"
                style={{ color: "#e0245e" }}
              />
            ) : (
              <FavoriteBorderOutlinedIcon className="tweet-icon" />
            )}
          </button>
          <span>{likes !== 0 && likes}</span>
        </div>
      </div>
    </Link>
  );
};

const mapStateToProps = ({ authedUser, users, tweets }, { id }) => {
  const tweet = tweets[id];
  const parentweet = tweet ? tweets[tweet.replyingTo] : null;
  return {
    authedUser,
    tweet: tweet
      ? formatTweet(tweet, users[tweet.author], authedUser, parentweet)
      : null,
  };
};
export default withRouter(connect(mapStateToProps)(Tweet));
