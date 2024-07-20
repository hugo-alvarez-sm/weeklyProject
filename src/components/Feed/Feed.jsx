import React from "react";
import Newsletter from "./Newsletter";

import "./Newsletter.scss";

const Feed = () => {
  const mookNews = [
    {
      id: 1,
      title: "Market Insights",
      date: new Date("2023-04-01"),
      content:
        "This week's top stories include updates on global markets, technology breakthroughs, and local events.",
      subscription: "one",
    },
    {
      id: 2,
      title: "Green Future",
      date: new Date("2023-04-08"),
      content:
        "Explore the latest in sustainable living, innovative startups, and health and wellness trends.",
      subscription: "one",
    },
    {
      id: 3,
      title: "Innovation & Tech",
      date: new Date("2023-04-15"),
      content:
        "Get insights on the future of work, education breakthroughs, and the impact of digital transformation.",
      subscription: "one",
    },
    {
      id: 4,
      title: "Space & Beyond",
      date: new Date("2023-04-22"),
      content:
        "This edition covers advancements in AI, space exploration, and the arts.",
      subscription: "one",
    },
    {
      id: 5,
      title: "Mind & Society",
      date: new Date("2023-04-29"),
      content:
        "Closing the month with a focus on mental health, community building, and the power of storytelling.",
      subscription: "one",
    },
  ];

  return (
    <div className="feed-list">
      {mookNews.map((news) => (
        <Newsletter key={news.id} id={news.id} newsletter={news} />
      ))}
    </div>
  );
};

export default Feed;
