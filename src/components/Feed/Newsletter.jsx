import React from "react";

import "./Newsletter.scss";

const Newsletter = ({ newsletter }) => {
  return (
    <div className="news-newsletter">
      <div className="news-header">
        <div className="news-icon">!</div>
        <div className="news-title">{newsletter.title}</div>
        <div className="news-date">{newsletter.date.toDateString()}</div>
      </div>
      <div className="news-content">
        <div>{newsletter.content}</div>
      </div>
    </div>
  );
};

export default Newsletter;
