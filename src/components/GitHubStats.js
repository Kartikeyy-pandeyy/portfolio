import React, { useState, useEffect, useCallback } from "react";
import "../styles/GitHubStats.css";

const GitHubStats = () => {
  const [commits, setCommits] = useState([]);
  const [activity, setActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const GITHUB_USERNAME = "Kartikeyy-pandeyy";
  const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

  const fetchGitHubAPI = useCallback(async (url) => {
    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      });
      if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
      return await res.json();
    } catch (error) {
      console.error("GitHub API fetch error:", error);
      return null;
    }
  }, [GITHUB_TOKEN]);

  useEffect(() => {
    const fetchAllCommits = async () => {
      const reposData = await fetchGitHubAPI(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
      if (!Array.isArray(reposData)) return;

      let allCommits = [];
      for (const repo of reposData) {
        const commitsData = await fetchGitHubAPI(`https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits`);
        if (!Array.isArray(commitsData)) continue;

        const repoCommits = commitsData.slice(0, 2).map((commit) => ({
          message: commit.commit.message,
          repoName: repo.name,
          repoUrl: `https://github.com/${GITHUB_USERNAME}/${repo.name}`,
          author: commit.commit.author.name,
          timestamp: new Date(commit.commit.author.date).getTime(),
          timeAgo: getTimeAgo(commit.commit.author.date),
        }));

        allCommits = [...allCommits, ...repoCommits];
      }

      allCommits.sort((a, b) => b.timestamp - a.timestamp);
      setCommits(allCommits.slice(0, 5));
      setIsLoading(false);
    };

    const fetchRecentActivity = async () => {
      const activityData = await fetchGitHubAPI(`https://api.github.com/users/${GITHUB_USERNAME}/events`);
      if (!Array.isArray(activityData)) return;

      const formattedActivity = activityData.slice(0, 5).map((event) => ({
        type: event.type.replace("Event", ""),
        repoName: event.repo.name,
        repoUrl: `https://github.com/${event.repo.name}`,
        timestamp: new Date(event.created_at).getTime(),
        timeAgo: getTimeAgo(event.created_at),
      }));

      setActivity(formattedActivity);
    };

    fetchAllCommits();
    fetchRecentActivity();
  }, [fetchGitHubAPI]); // Now the dependency array includes fetchGitHubAPI

  const getTimeAgo = (timestamp) => {
    const timeDifference = Date.now() - new Date(timestamp).getTime();
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "Just now";
  };

  return (
    <div className="github-stats">
      <h2>🚀 GitHub Stats</h2>
      <div className="github-stats-container">
        <div className="github-section">
          <h3>📌 Latest Commits</h3>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <ul className="commit-list">
              {commits.map((commit, index) => (
                <li key={index} className="commit-item" onClick={() => window.open(commit.repoUrl, "_blank")}>
                  <span className="commit-icon">🔧</span>
                  <div className="commit-info">
                    <strong>{commit.message}</strong>
                    <p>
                      in{" "}
                      <a href={commit.repoUrl} target="_blank" rel="noopener noreferrer">
                        {commit.repoName}
                      </a>{" "}
                      by <span className="author">{commit.author}</span>
                    </p>
                    <small>{commit.timeAgo}</small>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="github-section">
          <h3>🔥 Recent Activity</h3>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <ul className="activity-list">
              {activity.map((event, index) => (
                <li key={index} className="activity-item" onClick={() => window.open(event.repoUrl, "_blank")}>
                  <span className="activity-icon">⚡</span>
                  <div className="activity-info">
                    <strong>{event.type}</strong>
                    <p>
                      in{" "}
                      <a href={event.repoUrl} target="_blank" rel="noopener noreferrer">
                        {event.repoName}
                      </a>
                    </p>
                    <small>{event.timeAgo}</small>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default GitHubStats;
