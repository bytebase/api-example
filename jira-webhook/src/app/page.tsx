'use client';

import { useState, useEffect } from 'react';

interface JiraInfo {
  issueKey: string;
  issueType: string;
  projectKey: string;
  summary: string;
  description: string;
  sqlStatement: string;
  database: string;
  status: string;
  bytebaseIssueLink: string;
}

export default function JiraInfoPage() {
  const [jiraInfo, setJiraInfo] = useState<JiraInfo | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchJiraInfo = async () => {
    setIsFetching(true);
    try {
      const response = await fetch('/api/fetch-jira-issue');
      if (response.ok) {
        const data = await response.json();
        setJiraInfo(data);
        setLastUpdated(new Date());
      } else {
        console.error('Failed to fetch Jira info');
      }
    } catch (error) {
      console.error('Error fetching Jira info:', error);
    }
    setIsFetching(false);
  };

  useEffect(() => {
    fetchJiraInfo();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Jira Webhook Information</h1>
      {jiraInfo ? (
        <>
          <p><strong>Issue Key:</strong> {jiraInfo.issueKey}</p>
          <p><strong>Issue Type:</strong> {jiraInfo.issueType}</p>
          <p><strong>Project Key:</strong> {jiraInfo.projectKey}</p>
          <p><strong>Summary:</strong> {jiraInfo.summary}</p>
          <p><strong>Description:</strong> {jiraInfo.description}</p>
          <p><strong>SQL Statement:</strong> {jiraInfo.sqlStatement}</p>
          <p><strong>Database:</strong> {jiraInfo.database}</p>
          <p><strong>Status:</strong> {jiraInfo.status}</p>
          <p><strong>Bytebase Issue Link:</strong> <a href={jiraInfo.bytebaseIssueLink} target="_blank" rel="noopener noreferrer">{jiraInfo.bytebaseIssueLink}</a></p>
          <p><strong>Last Updated:</strong> {lastUpdated ? lastUpdated.toLocaleString() : 'Never'}</p>
        </>
      ) : (
        <p>No Jira webhook information available yet.</p>
      )}
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={fetchJiraInfo}
        disabled={isFetching}
      >
        {isFetching ? 'Fetching...' : 'Fetch Current Jira Info'}
      </button>
    </div>
  );
}