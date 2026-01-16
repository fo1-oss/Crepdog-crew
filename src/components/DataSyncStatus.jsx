import { useData } from '../context/DataContext';

function DataSyncStatus() {
  const {
    isLoading,
    lastSyncTime,
    syncError,
    refreshFromGoogleSheets,
    isGoogleSheetsConfigured,
    googleSheetUrl
  } = useData();

  // Don't render if Google Sheets is not configured
  if (!isGoogleSheetsConfigured) {
    return null;
  }

  const formatTime = (date) => {
    if (!date) return 'Never';
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="data-sync-status">
      <div className="sync-info">
        {isLoading ? (
          <span className="sync-loading">
            <i className="fas fa-spinner fa-spin"></i> Syncing...
          </span>
        ) : syncError ? (
          <span className="sync-error">
            <i className="fas fa-exclamation-circle"></i> Sync Error
          </span>
        ) : lastSyncTime ? (
          <span className="sync-success">
            <i className="fas fa-check-circle"></i> Synced {formatTime(lastSyncTime)}
          </span>
        ) : (
          <span className="sync-pending">
            <i className="fas fa-clock"></i> Not synced
          </span>
        )}
      </div>

      <div className="sync-actions">
        <button
          className="sync-btn refresh-btn"
          onClick={refreshFromGoogleSheets}
          disabled={isLoading}
          title="Refresh data from Google Sheets"
        >
          <i className={`fas fa-sync-alt ${isLoading ? 'fa-spin' : ''}`}></i>
        </button>

        {googleSheetUrl && (
          <a
            href={googleSheetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="sync-btn edit-btn"
            title="Edit Google Sheet"
          >
            <i className="fas fa-external-link-alt"></i>
          </a>
        )}
      </div>
    </div>
  );
}

export default DataSyncStatus;
