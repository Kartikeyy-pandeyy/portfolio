import React, { useState, useEffect, useCallback } from "react";
import "../styles/GitHubStats.css";
import portfolioData from "../assets/v1Content.json";

const GitHubStats = () => {
  const { githubStats } = portfolioData;
  const [commits, setCommits] = useState([]);
  const [activity, setActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const GITHUB_USERNAME = githubStats.username;
  const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

  const getTimeAgo = useCallback(
    (timestamp) => {
      const timeDifference = Date.now() - new Date(timestamp).getTime();
      const seconds = Math.floor(timeDifference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (days > 0) return `${days}d ago`;
      if (hours > 0) return `${hours}h ago`;
      if (minutes > 0) return `${minutes}m ago`;
      return githubStats.justNowLabel;
    },
    [githubStats.justNowLabel]
  );

  const fetchGitHubAPI = useCallback(
    async (url) => {
      try {
        const res = await fetch(url, {
          headers: GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {},
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

      const reposData = await fetchGitHubAPI(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=10&sort=updated`
      );
      if (!Array.isArray(reposData)) {
        setIsLoading(false);
        return;
      }

      const commitPromises = reposData.slice(0, 5).map((repo) =>
        fetchGitHubAPI(
          `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits?per_page=2`
        ).then((commitsData) => {
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

      const activityData = await fetchGitHubAPI(
        `https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=5`
      );
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
  }, [fetchGitHubAPI, GITHUB_USERNAME, getTimeAgo]);

  return (
    <div className="github-stats">
      <h2>{githubStats.title}</h2>
      <div className="github-stats-container">
        <div className="github-section">
          <h3>{githubStats.latestCommitsTitle}</h3>
          {isLoading ? (
            <div className="skeleton-loader" />
          ) : commits.length ? (
            <ul className="commit-list">
              {commits.map((commit, index) => (
                <li
                  key={index}
                  className="commit-item"
                  onClick={() => window.open(commit.repoUrl, "_blank")}
                >
                  <span className="commit-icon">Commit</span>
                  <div className="commit-info">
                    <strong>{commit.message}</strong>
                    <p>
                      {githubStats.inLabel}{" "}
                      <a href={commit.repoUrl} target="_blank" rel="noopener noreferrer">
                        {commit.repoName}
                      </a>{" "}
                      {githubStats.byLabel} <span className="author">{commit.author}</span>
                    </p>
                    <small>{commit.timeAgo}</small>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>{githubStats.emptyCommitsMessage}</p>
          )}
        </div>

        <div className="github-section">
          <h3>{githubStats.recentActivityTitle}</h3>
          {isLoading ? (
            <div className="skeleton-loader" />
          ) : activity.length ? (
            <ul className="activity-list">
              {activity.map((event, index) => (
                <li
                  key={index}
                  className="activity-item"
                  onClick={() => window.open(event.repoUrl, "_blank")}
                >
                  <span className="activity-icon">Activity</span>
                  <div className="activity-info">
                    <strong>{event.type}</strong>
                    <p>
                      {githubStats.inLabel}{" "}
                      <a href={event.repoUrl} target="_blank" rel="noopener noreferrer">
                        {event.repoName}
                      </a>
                    </p>
                    <small>{event.timeAgo}</small>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>{githubStats.emptyActivityMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GitHubStats;
