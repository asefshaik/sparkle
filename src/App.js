import React, { useState } from 'react';
import { initialIncidents } from './data';
import './App.css';

function App() {
  const [incidents, setIncidents] = useState(initialIncidents);
  const [filter, setFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');
  const [expandedId, setExpandedId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newIncident, setNewIncident] = useState({ 
    title: '', 
    description: '', 
    severity: 'Low', 
    reported_at: new Date().toISOString() 
  });

  // Filter incidents based on selected severity
  const filteredIncidents = incidents.filter(incident => 
    filter === 'All' ? true : incident.severity === filter
  );

  // Sort incidents based on selected order
  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    const dateA = new Date(a.reported_at).getTime();
    const dateB = new Date(b.reported_at).getTime();
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  // Toggle expanded state for incident details
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewIncident(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!newIncident.title.trim() || !newIncident.description.trim()) {
      alert('Please fill in all fields');
      return;
    }
    
    // Create new incident with unique ID
    const newId = Math.max(...incidents.map(i => i.id)) + 1;
    const incidentToAdd = { 
      ...newIncident, 
      id: newId,
      reported_at: new Date().toISOString()
    };
    
    // Add to incidents list
    setIncidents(prev => [incidentToAdd, ...prev]);
    
    // Reset form
    setNewIncident({ 
      title: '', 
      description: '', 
      severity: 'Low', 
      reported_at: new Date().toISOString()
    });
    
    // Hide form after submission
    setShowForm(false);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="dashboard">
      <h1>AI Safety Incident Dashboard</h1>
      
      <div className="controls">
        <div className="filter-sort">
          <div className="filter">
            <label>Filter by Severity:</label>
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All Severities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          
          <div className="sort">
            <label>Sort by Date:</label>
            <select 
              value={sortOrder} 
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
        
        <button 
          className="new-incident-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Hide Form' : 'Report New Incident'}
        </button>
      </div>
      
      {showForm && (
        <div className="incident-form">
          <h2>Report New Incident</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                value={newIncident.title} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea 
                id="description" 
                name="description" 
                value={newIncident.description} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="severity">Severity:</label>
              <select 
                id="severity" 
                name="severity" 
                value={newIncident.severity} 
                onChange={handleInputChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      
      <div className="incident-list">
        {sortedIncidents.length > 0 ? (
          sortedIncidents.map(incident => (
            <div key={incident.id} className="incident-card">
              <div className="incident-header">
                <h3>{incident.title}</h3>
                <div className={`severity ${incident.severity.toLowerCase()}`}>
                  {incident.severity}
                </div>
              </div>
              
              <div className="incident-meta">
                <span>Reported: {formatDate(incident.reported_at)}</span>
              </div>
              
              <button 
                className="details-btn"
                onClick={() => toggleExpand(incident.id)}
              >
                {expandedId === incident.id ? 'Hide Details' : 'View Details'}
              </button>
              
              {expandedId === incident.id && (
                <div className="incident-details">
                  <p>{incident.description}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No incidents match the current filter.</p>
        )}
      </div>
    </div>
  );
}

export default App;