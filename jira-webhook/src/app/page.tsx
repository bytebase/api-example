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
  const [isUpdating, setIsUpdating] = useState(false);

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

  const handleUpdateBytebaseLink = async () => {
    if (!jiraInfo) return;

    setIsUpdating(true);
    try {
      const response = await fetch('/api/update-jira-issue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ issueKey: jiraInfo.issueKey }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Update successful:', result);
        // Trigger a re-fetch of the Jira info
        setJiraInfo(null);
      } else {
        console.error('Failed to update Jira issue');
      }
    } catch (error) {
      console.error('Error updating Jira issue:', error);
    }
    setIsUpdating(false);
  };

  return (
    <div>
      <h1>Jira Webhook Information</h1>
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
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={handleUpdateBytebaseLink} 
            disabled={isUpdating || isFetching}
          >
            {isUpdating ? 'Updating...' : 'Update Bytebase Link & Set In Progress'}
          </button>
        </>
      ) : (
        <p>No Jira webhook information available yet.</p>
      )}
      <p>{isFetching ? "Fetching new Jira webhook information..." : "Waiting for next update..."}</p>
    </div>
  );
}