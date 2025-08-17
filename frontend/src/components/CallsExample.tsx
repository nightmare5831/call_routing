import { useState, useEffect } from 'react';
import { callService } from '../services/callService';
import styles from './CallsExample.module.css';

export function CallsExample() {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newCall, setNewCall] = useState({
    callSid: '',
    from: '',
    to: '',
    zipCode: '',
    serviceType: '',
    campaign: '',
    source: '',
    status: 'incoming',
  });

  const fetchCalls = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await callService.getAllCalls();
      setCalls(response.data);
    } catch (error) {
      console.error('Error fetching calls:', error);
      setError('Failed to load calls. Please try again.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCalls();
  }, []);

  const handleCreateCall = async () => {
    console.log('Creating call with data:', newCall);
    if (!newCall.callSid || !newCall.from || !newCall.to) {
      alert('Please fill in all required fields (Call SID, From, To)');
      return;
    }
    
    try {
      await callService.createCall(newCall);
      fetchCalls();
      setNewCall({
        callSid: '',
        from: '',
        to: '',
        zipCode: '',
        serviceType: '',
        campaign: '',
        source: '',
        status: 'incoming',
      });
    } catch (error) {
      console.error('Error creating call:', error);
      setError('Failed to create call. Please try again.');
    }
  };

  const handleUpdateCall = async (id: string, updates: any) => {
    try {
      await callService.updateCall(id, updates);
      fetchCalls();
    } catch (error) {
      console.error('Error updating call:', error);
      setError('Failed to update call. Please try again.');
    }
  };

  const handleDeleteCall = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this call?')) {
      try {
        await callService.deleteCall(id);
        fetchCalls();
      } catch (error) {
        console.error('Error deleting call:', error);
        setError('Failed to delete call. Please try again.');
      }
    }
  };


  if (loading && calls.length === 0) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>Loading calls...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>📞 Call Routing Dashboard</h1>
        <p className={styles.subtitle}>Manage and track all your calls in one place</p>
      </div>

      {error && (
        <div className={styles.errorContainer}>
          <span className={styles.errorIcon}>⚠️</span>
          <span className={styles.errorText}>{error}</span>
          <button className={styles.retryButton} onClick={fetchCalls}>
            Retry
          </button>
        </div>
      )}

      <div className={styles.formCard}>
        <h2 className={styles.formTitle}>Create New Call</h2>
        <div className={styles.formGrid}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Call SID *</label>
            <input
              type="text"
              className={styles.input}
              placeholder="CAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              value={newCall.callSid}
              onChange={(e) => setNewCall({ ...newCall, callSid: e.target.value })}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>From Number *</label>
            <input
              type="tel"
              className={styles.input}
              placeholder="+1 234 567 8900"
              value={newCall.from}
              onChange={(e) => setNewCall({ ...newCall, from: e.target.value })}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>To Number *</label>
            <input
              type="tel"
              className={styles.input}
              placeholder="+1 234 567 8900"
              value={newCall.to}
              onChange={(e) => setNewCall({ ...newCall, to: e.target.value })}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>ZIP Code</label>
            <input
              type="text"
              className={styles.input}
              placeholder="12345"
              value={newCall.zipCode}
              onChange={(e) => setNewCall({ ...newCall, zipCode: e.target.value })}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Service Type</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Support, Sales, etc."
              value={newCall.serviceType}
              onChange={(e) => setNewCall({ ...newCall, serviceType: e.target.value })}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Campaign</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Marketing Campaign"
              value={newCall.campaign}
              onChange={(e) => setNewCall({ ...newCall, campaign: e.target.value })}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Source</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Web, Phone, Email, etc."
              value={newCall.source}
              onChange={(e) => setNewCall({ ...newCall, source: e.target.value })}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Status</label>
            <select
              className={styles.select}
              value={newCall.status}
              onChange={(e) => setNewCall({ ...newCall, status: e.target.value })}
            >
              <option value="incoming">Incoming</option>
              <option value="answered">Answered</option>
              <option value="missed">Missed</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
        <button className={styles.submitButton} onClick={handleCreateCall}>
          <span>➕</span> Create Call
        </button>
      </div>

      <div className={styles.callsList}>
        <h2 className={styles.listTitle}>
          Recent Calls {calls.length > 0 && <span>({calls.length})</span>}
        </h2>
        
        {calls.length > 0 ? (
          <div className={styles.callsGrid}>
            {calls.map((call: any) => (
              <div key={call.id || call._id} className={styles.callCard}>
                <div className={styles.callHeader}>
                  <div className={styles.callerInfo}>
                    <div className={styles.callerName}>Call: {call.callSid || 'N/A'}</div>
                    <div className={styles.callerPhone}>📱 {call.from} → {call.to}</div>
                  </div>
                  <span className={`${styles.statusBadge} ${
                    call.status === 'completed' ? styles.statusCompleted :
                    call.status === 'failed' ? styles.statusFailed :
                    call.status === 'answered' ? styles.statusCompleted :
                    call.status === 'missed' ? styles.statusFailed :
                    styles.statusPending
                  }`}>
                    {call.status}
                  </span>
                </div>
                
                <div className={styles.callDetails}>
                  {call.zipCode && (
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>ZIP:</span>
                      <span className={styles.detailValue}>{call.zipCode}</span>
                    </div>
                  )}
                  {call.serviceType && (
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Service:</span>
                      <span className={styles.detailValue}>{call.serviceType}</span>
                    </div>
                  )}
                  {call.campaign && (
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Campaign:</span>
                      <span className={styles.detailValue}>{call.campaign}</span>
                    </div>
                  )}
                  {call.source && (
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Source:</span>
                      <span className={styles.detailValue}>{call.source}</span>
                    </div>
                  )}
                </div>
                
                <div className={styles.callActions}>
                  {call.status !== 'completed' && (
                    <button 
                      className={`${styles.actionButton} ${styles.completeButton}`}
                      onClick={() => handleUpdateCall(call.id || call._id, { status: 'completed' })}
                    >
                      ✓ Complete
                    </button>
                  )}
                  <button 
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                    onClick={() => handleDeleteCall(call.id || call._id)}
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📞</div>
            <p className={styles.emptyText}>No calls found</p>
            <p className={styles.emptySubtext}>Create your first call to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CallsExample;