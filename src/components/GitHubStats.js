import React, { useState, useEffect, useCallback } from "react";
import "../styles/GitHubStats.css";

const GitHubStats = () => {
  const [commits, setCommits] = useState([]);
  const [activity, setActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const GITHUB_USERNAME = "Kartikeyy-pandeyy";
  const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

  const fetchGitHubAPI = useCallback(
    async (url) => {
      try {
        const res = await fetch(url, {
          headers: GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {}, // Fallback if token is missing
        });
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
        return await res.json();
      } catch (error) {
        console.error("GitHub API fetch error:", error);
        return null;
      }
    },
    [GITHUB_TOKEN]
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // Fetch repos and limit to recent ones
      const reposData = await fetchGitHubAPI(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=10&sort=updated`);
      if (!Array.isArray(reposData)) {
        setIsLoading(false);
        return;
      }

      // Fetch commits from recent repos
      const commitPromises = reposData.slice(0, 5).map((repo) =>
        fetchGitHubAPI(`https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits?per_page=2`)
          .then((commitsData) => {
            if (!Array.isArray(commitsData)) return [];
            return commitsData.map((commit) => ({
              message: commit.commit.message,
              repoName: repo.name,
              repoUrl: `https://github.com/${GITHUB_USERNAME}/${repo.name}`,
              author: commit.commit.author.name,
              timestamp: new Date(commit.commit.author.date).getTime(),
              timeAgo: getTimeAgo(commit.commit.author.date),
            }));
          })
      );

      const allCommits = (await Promise.all(commitPromises)).flat();
      allCommits.sort((a, b) => b.timestamp - a.timestamp);
      setCommits(allCommits.slice(0, 5));

      // Fetch recent activity
      const activityData = await fetchGitHubAPI(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=5`);
      if (Array.isArray(activityData)) {
        const formattedActivity = activityData.map((event) => ({
          type: event.type.replace("Event", ""),
          repoName: event.repo.name,
          repoUrl: `https://github.com/${event.repo.name}`,
          timestamp: new Date(event.created_at).getTime(),
          timeAgo: getTimeAgo(event.created_at),
        }));
        setActivity(formattedActivity);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [fetchGitHubAPI]);

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
            <div className="skeleton-loader" />
          ) : commits.length ? (
            <ul className="commit-list">
              {commits.map((commit, index) => (
                <li key={index} className="commit-item" onClick={() => window.open(commit.repoUrl, "_blank")}>
                  <span className="commit-icon">🔧</span>
                  <div className="commit-info">
                    <strong>{commit.message}</strong>
                    <p>
                      in <a href={commit.repoUrl} target="_blank" rel="noopener noreferrer">{commit.repoName}</a> by{" "}
                      <span className="author">{commit.author}</span>
                    </p>
                    <small>{commit.timeAgo}</small>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No recent commits found.</p>
          )}
        </div>

        <div className="github-section">
          <h3>🔥 Recent Activity</h3>
          {isLoading ? (
            <div className="skeleton-loader" />
          ) : activity.length ? (
            <ul className="activity-list">
              {activity.map((event, index) => (
                <li key={index} className="activity-item" onClick={() => window.open(event.repoUrl, "_blank")}>
                  <span className="activity-icon">⚡</span>
                  <div className="activity-info">
                    <strong>{event.type}</strong>
                    <p>
                      in <a href={event.repoUrl} target="_blank" rel="noopener noreferrer">{event.repoName}</a>
                    </p>
                    <small>{event.timeAgo}</small>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No recent activity found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GitHubStats;