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
  webhookType: string; // New field for webhook type
}

export default function JiraInfoPage() {
  const [jiraInfo, setJiraInfo] = useState<JiraInfo | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchJiraInfo = async () => {
    setIsFetching(true);
    setError(null);
    try {
      const response = await fetch('/api/fetch-jira-issue');
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setJiraInfo(data);
          setLastUpdated(new Date());
        }
      } else {
        setError('Failed to fetch Jira info');
      }
    } catch (error) {
      setError('Error fetching Jira info: ' + (error instanceof Error ? error.message : String(error)));
    }
    setIsFetching(false);
  };

  useEffect(() => {
    fetchJiraInfo(); // Fetch immediately on mount

    const intervalId = setInterval(fetchJiraInfo, 3000); // Fetch every 3 seconds

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">Jira Webhook Monitor </h1>
      <h2 className="text-sm text-gray-500 mb-4">Fetch latest created/updated Jira Issue, Refresh every 3 seconds</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {jiraInfo ? (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <p><strong>Webhook Type:</strong> <span className="font-semibold text-blue-600">{jiraInfo.webhookType}</span></p>
          <p><strong>Issue Key:</strong> {jiraInfo.issueKey}</p>
          <p><strong>Issue Type:</strong> {jiraInfo.issueType}</p>
          <p><strong>Project Key:</strong> {jiraInfo.projectKey}</p>
          <p><strong>Summary:</strong> {jiraInfo.summary}</p>
          <p><strong>Description:</strong> {jiraInfo.description}</p>
          <p><strong>SQL Statement:</strong> {jiraInfo.sqlStatement}</p>
          <p><strong>Database:</strong> {jiraInfo.database}</p>
          <p><strong>Status:</strong> {jiraInfo.status}</p>
          <p><strong>Bytebase Issue Link:</strong> 
            <a href={jiraInfo.bytebaseIssueLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-1">
              {jiraInfo.bytebaseIssueLink}
            </a>
          </p>
        </div>
      ) : (
        <p className="text-gray-500">No Jira webhook information available yet.</p>
      )}
      <p className="text-sm text-gray-600">
        {isFetching ? "Fetching..." : `Last updated: ${lastUpdated ? lastUpdated.toLocaleString() : 'Never'}`}
      </p>
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={fetchJiraInfo}
        disabled={isFetching}
      >
        Refresh Now
      </button>
    </div>
  );
}