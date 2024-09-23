"use client";

import { useState, useEffect } from "react";

// Add this interface to define the structure of the audit log entries
interface AuditLogEntry {
    name: string;
    createTime: string;
    user: string;
    method: string;
    severity: string;
    resource: string;
    request: string;
    response: string;
  }  

// Add this interface to define the structure of project objects
interface Project {
    id: string;
    name: string;
}

export default function FilterAuditLogForm({ allProjects }: { allProjects: Project[] }) {
    const [startDateTime, setStartDateTime] = useState('');
    const [endDateTime, setEndDateTime] = useState('');
    const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
    const [selectedProject, setSelectedProject] = useState<string>('');

    useEffect(() => {
        const setInitialDates = () => {
            const end = new Date();
            const start = new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000);
        
            setEndDateTime(formatDateTime(end));
            setStartDateTime(formatDateTime(start));
        };

        setInitialDates();
        // Remove the setTimeout and directly call handleSearch
        handleSearch();
    }, []);

    const formatDateTime = (date: Date) => {
        return date.toISOString().slice(0, 16);
    };

    const handleStartDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartDateTime(e.target.value);
    };

    const handleEndDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndDateTime(e.target.value);
    };

    const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedProject(e.target.value);
    };

    useEffect(() => {
        handleSearch();
    }, [startDateTime, endDateTime, selectedProject]);

    const handleSearch = async () => {

        if (!startDateTime || !endDateTime) return;

        const formatDateForFilter = (dateString: string) => {
            return new Date(dateString).toISOString().slice(0, 19) + 'Z';
        };

        const startDate = formatDateForFilter(startDateTime);
        const endDate = formatDateForFilter(endDateTime);
        const filter = `create_time >= '${startDate}' && create_time <= '${endDate}'`;

        let fetchedData;

        if (selectedProject) {
            fetchedData = await fetch(`/api/projectaudit/${encodeURIComponent(selectedProject)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "filter": filter })
            });
        } else {
            fetchedData = await fetch('/api/workspaceaudit/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
                body: JSON.stringify({ "filter": filter })
            });
        }

        const data = await fetchedData.json();
        setAuditLogs(data.auditLogs);
    };

    return (
        <form>
            <div className="flex flex-row gap-2 m-5 ml-0">
            <div>
                <label htmlFor="startDateTime">Start Date and Time:</label>
                <input
                    type="datetime-local"
                    id="startDateTime"
                    value={startDateTime}
                    onChange={handleStartDateTimeChange}
                />
            </div>
            <div>
                <label htmlFor="endDateTime">End Date and Time:</label>
                <input
                    type="datetime-local"
                    id="endDateTime"
                    value={endDateTime}
                    onChange={handleEndDateTimeChange}
                />
            </div>
            </div>
            <div className="m-5 ml-0">
                <label htmlFor="projectSelect">Select Project or leave for whole Workspace</label>
                <select
                    id="projectSelect"
                    value={selectedProject}
                    onChange={handleProjectChange}
                    className="ml-2 p-2 border rounded"
                >
                    <option value="">Workspace</option>
                    {allProjects.map((project) => (
                        <option key={`${project.id}-${project.name}`} value={project.id}>
                            {project.name}
                        </option>
                    ))}
                </select>
            </div>
            {auditLogs && auditLogs.length > 0 && (
                <div className="mt-6">
                    <h2 className="text-xl font-bold mb-4">Audit Logs</h2>
                    <div className="w-full">
                        <table className="min-w-full table-auto bg-white border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-2 px-4 border-b whitespace-nowrap">Name</th>
                                    <th className="py-2 px-4 border-b whitespace-nowrap">Create Time</th>
                                    <th className="py-2 px-4 border-b whitespace-nowrap">User</th>
                                    <th className="py-2 px-4 border-b whitespace-nowrap">Method</th>
                                    <th className="py-2 px-4 border-b whitespace-nowrap">Severity</th>
                                    <th className="py-2 px-4 border-b whitespace-nowrap">Resource</th>
                                    <th className="py-2 px-4 border-b whitespace-nowrap">Request</th>
                                    <th className="py-2 px-4 border-b whitespace-nowrap">Response</th>
                                </tr>
                            </thead>
                            <tbody>
                                {auditLogs.map((log, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                        <td className="py-2 px-4 border-b">{log.name}</td>
                                        <td className="py-2 px-4 border-b whitespace-nowrap">{log.createTime}</td>
                                        <td className="py-2 px-4 border-b">{log.user}</td>
                                        <td className="py-2 px-4 border-b">{log.method}</td>
                                        <td className="py-2 px-4 border-b">{log.severity}</td>
                                        <td className="py-2 px-4 border-b">{log.resource}</td>
                                        <td className="py-2 px-4 border-b">{log.request}</td>
                                        <td className="py-2 px-4 border-b">{log.response}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            
        </form>
    );
}
