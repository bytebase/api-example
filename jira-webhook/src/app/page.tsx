'use client';

import { useState, useEffect } from 'react';

interface JiraInfo {
  issueType: string;
  projectKey: string;
  description: string;
  sqlStatement: string;
  database: string;
  status: string;
}

export default function JiraInfoPage() {
  const [jiraInfo, setJiraInfo] = useState<JiraInfo | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    const fetchJiraInfo = async () => {
      setIsFetching(true);
      try {
        const response = await fetch('/api/fetch-jira-issue');
        if (response.ok) {
          const data = await response.json();
          if (JSON.stringify(data) !== JSON.stringify(jiraInfo)) {
            setJiraInfo(data);
            setLastUpdated(new Date());
          }
        } else {
          console.error('Failed to fetch Jira info');
        }
      } catch (error) {
        console.error('Error fetching Jira info:', error);
      }
      setIsFetching(false);
    };

    fetchJiraInfo();
    const interval = setInterval(fetchJiraInfo, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, [jiraInfo]);

  return (
    <div>
      <h1>Jira Webhook Information</h1>
      {jiraInfo ? (
        <>
          <p><strong>Issue Type:</strong> {jiraInfo.issueType}</p>
          <p><strong>Project Key:</strong> {jiraInfo.projectKey}</p>
          <p><strong>Description:</strong> {jiraInfo.description}</p>
          <p><strong>SQL Statement:</strong> {jiraInfo.sqlStatement}</p>
          <p><strong>Database:</strong> {jiraInfo.database}</p>
          <p><strong>Status:</strong> {jiraInfo.status}</p>
          <p><strong>Last Updated:</strong> {lastUpdated ? lastUpdated.toLocaleString() : 'Never'}</p>
        </>
      ) : (
        <p>No Jira webhook information available yet.</p>
      )}
      <p>{isFetching ? "Fetching new Jira webhook information..." : "Waiting for next update..."}</p>
    </div>
  );
}