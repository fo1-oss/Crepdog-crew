import { useState, useEffect, useRef } from 'react';

// Context for managing edit mode across the app
import { createContext, useContext } from 'react';

const EditContext = createContext({
  isEditMode: false,
  setIsEditMode: () => {},
  changes: {},
  setFieldValue: () => {},
  resetChanges: () => {},
  hasChanges: false,
});

export const EditProvider = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [changes, setChanges] = useState({});

  const setFieldValue = (fieldId, value) => {
    setChanges(prev => ({ ...prev, [fieldId]: value }));
  };

  const resetChanges = () => {
    setChanges({});
  };

  return (
    <EditContext.Provider value={{
      isEditMode,
      setIsEditMode,
      changes,
      setFieldValue,
      resetChanges,
      hasChanges: Object.keys(changes).length > 0,
    }}>
      {children}
    </EditContext.Provider>
  );
};

export const useEdit = () => useContext(EditContext);

// Main Editable Field Component
const EditableField = ({
  id,
  value,
  onChange,
  type = 'text', // 'text', 'number', 'textarea', 'currency', 'percentage'
  tag: Tag = 'span',
  className = '',
  placeholder = 'Click to edit...',
  prefix = '',
  suffix = '',
  style = {},
  multiline = false,
  disabled = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef(null);
  const { isEditMode } = useEdit();

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (inputRef.current.select) {
        inputRef.current.select();
      }
    }
  }, [isEditing]);

  const handleClick = (e) => {
    if (!disabled && isEditMode) {
      e.stopPropagation();
      setIsEditing(true);
    }
  };

  const handleDoubleClick = (e) => {
    if (!disabled) {
      e.stopPropagation();
      setIsEditing(true);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (onChange && editValue !== value) {
      onChange(editValue, id);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !multiline) {
      setIsEditing(false);
      if (onChange && editValue !== value) {
        onChange(editValue, id);
      }
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
      setEditValue(value);
    }
  };

  const formatValue = (val) => {
    if (type === 'currency') {
      return `${prefix}${val}${suffix}`;
    }
    if (type === 'percentage') {
      return `${val}%`;
    }
    return `${prefix}${val}${suffix}`;
  };

  if (isEditing) {
    const InputComponent = multiline ? 'textarea' : 'input';
    
    return (
      <InputComponent
        ref={inputRef}
        type={type === 'number' || type === 'currency' || type === 'percentage' ? 'number' : 'text'}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`editable-field-input ${className}`}
        placeholder={placeholder}
        style={{
          font: 'inherit',
          color: 'inherit',
          background: 'rgba(192, 229, 41, 0.3)',
          border: '2px dashed var(--lime-dark, #9BBF1E)',
          borderRadius: '8px',
          padding: '4px 8px',
          width: '100%',
          outline: 'none',
          resize: multiline ? 'vertical' : 'none',
          minHeight: multiline ? '80px' : 'auto',
          ...style,
        }}
      />
    );
  }

  return (
    <Tag
      className={`editable-field ${isEditMode ? 'edit-mode-active' : ''} ${className}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      title={isEditMode ? 'Click to edit' : 'Double-click to edit'}
      style={{
        cursor: disabled ? 'default' : 'text',
        position: 'relative',
        display: 'inline-block',
        borderRadius: '4px',
        transition: 'all 0.2s ease',
        ...style,
      }}
    >
      {formatValue(value) || placeholder}
    </Tag>
  );
};

// Edit Mode Toggle Button Component
export const EditModeToggle = ({ className = '' }) => {
  const { isEditMode, setIsEditMode, hasChanges, resetChanges } = useEdit();

  return (
    <div className={`edit-mode-toggle ${className}`}>
      <button
        onClick={() => setIsEditMode(!isEditMode)}
        className={`edit-toggle-btn ${isEditMode ? 'active' : ''}`}
      >
        <i className={`fas ${isEditMode ? 'fa-check' : 'fa-edit'}`}></i>
        {isEditMode ? 'Done Editing' : 'Edit Mode'}
      </button>
      
      {hasChanges && (
        <button onClick={resetChanges} className="reset-btn">
          <i className="fas fa-undo"></i>
          Reset
        </button>
      )}

      <style>{`
        .edit-mode-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .edit-toggle-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: var(--white, #fff);
          border: 2px solid var(--black, #000);
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .edit-toggle-btn:hover {
          background: var(--lime, #C0E529);
          transform: translateY(-2px);
          box-shadow: 3px 3px 0 var(--black, #000);
        }

        .edit-toggle-btn.active {
          background: var(--lime, #C0E529);
          box-shadow: 3px 3px 0 var(--black, #000);
        }

        .reset-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 16px;
          background: #FEE2E2;
          border: 2px solid #DC2626;
          border-radius: 50px;
          font-size: 13px;
          font-weight: 600;
          color: #DC2626;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .reset-btn:hover {
          background: #FECACA;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

// Editable Card Wrapper Component
export const EditableCard = ({ children, title, onTitleChange, className = '', style = {} }) => {
  const { isEditMode } = useEdit();

  return (
    <div 
      className={`editable-card ${isEditMode ? 'edit-mode' : ''} ${className}`}
      style={style}
    >
      {title && (
        <div className="editable-card-header">
          <EditableField
            value={title}
            onChange={onTitleChange}
            tag="h3"
            className="editable-card-title"
          />
        </div>
      )}
      <div className="editable-card-content">
        {children}
      </div>

      <style>{`
        .editable-card {
          position: relative;
          transition: all 0.2s ease;
        }

        .editable-card.edit-mode {
          outline: 2px dashed var(--lime-dark, #9BBF1E);
          outline-offset: 4px;
        }

        .editable-card-header {
          margin-bottom: 16px;
        }

        .editable-card-title {
          font-size: 18px;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
};

// Editable Metric Component
export const EditableMetric = ({ 
  value, 
  label, 
  icon, 
  onValueChange, 
  onLabelChange,
  prefix = '',
  suffix = '',
  type = 'text',
  className = '' 
}) => {
  const { isEditMode } = useEdit();

  return (
    <div className={`editable-metric ${isEditMode ? 'edit-mode' : ''} ${className}`}>
      {icon && <div className="metric-icon">{icon}</div>}
      <div className="metric-content">
        <EditableField
          value={value}
          onChange={onValueChange}
          type={type}
          prefix={prefix}
          suffix={suffix}
          tag="div"
          className="metric-value"
        />
        <EditableField
          value={label}
          onChange={onLabelChange}
          tag="div"
          className="metric-label"
        />
      </div>

      <style>{`
        .editable-metric {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: var(--lime, #C0E529);
          border: 2px solid var(--black, #000);
          border-radius: 14px;
          transition: all 0.2s ease;
        }

        .editable-metric.edit-mode {
          outline: 2px dashed var(--lime-dark, #9BBF1E);
          outline-offset: 2px;
        }

        .metric-icon {
          width: 40px;
          height: 40px;
          background: var(--black, #000);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--white, #fff);
          font-size: 18px;
        }

        .metric-content {
          flex: 1;
        }

        .metric-value {
          font-size: 24px;
          font-weight: 900;
          line-height: 1;
        }

        .metric-label {
          font-size: 12px;
          color: var(--black, #000);
          opacity: 0.7;
          margin-top: 4px;
        }
      `}</style>
    </div>
  );
};

// Editable List Item
export const EditableListItem = ({ 
  value, 
  onChange, 
  onDelete,
  icon,
  className = '' 
}) => {
  const { isEditMode } = useEdit();

  return (
    <div className={`editable-list-item ${isEditMode ? 'edit-mode' : ''} ${className}`}>
      {icon && <span className="item-icon">{icon}</span>}
      <EditableField
        value={value}
        onChange={onChange}
        tag="span"
        className="item-text"
      />
      {isEditMode && onDelete && (
        <button onClick={onDelete} className="delete-btn">
          <i className="fas fa-times"></i>
        </button>
      )}

      <style>{`
        .editable-list-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: rgba(255,255,255,0.5);
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .editable-list-item.edit-mode {
          background: rgba(192, 229, 41, 0.2);
        }

        .item-icon {
          font-size: 14px;
        }

        .item-text {
          flex: 1;
        }

        .delete-btn {
          width: 24px;
          height: 24px;
          background: #FEE2E2;
          border: none;
          border-radius: 50%;
          color: #DC2626;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .editable-list-item:hover .delete-btn {
          opacity: 1;
        }

        .delete-btn:hover {
          background: #FECACA;
        }
      `}</style>
    </div>
  );
};

// Global Styles for Editable Components
export const EditableStyles = () => (
  <style>{`
    /* Editable Field Base Styles */
    .editable-field {
      position: relative;
      border-radius: 4px;
      transition: all 0.2s ease;
    }

    .editable-field:hover {
      background: rgba(192, 229, 41, 0.15);
    }

    .editable-field.edit-mode-active {
      background: rgba(192, 229, 41, 0.2);
      cursor: text;
    }

    .editable-field.edit-mode-active::after {
      content: '✏️';
      position: absolute;
      right: -20px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 12px;
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    .editable-field.edit-mode-active:hover::after {
      opacity: 1;
    }

    /* Edit Mode Indicator */
    .edit-mode-indicator {
      position: fixed;
      top: 80px;
      right: 24px;
      background: var(--lime, #C0E529);
      border: 2px solid var(--black, #000);
      border-radius: 50px;
      padding: 8px 16px;
      font-size: 12px;
      font-weight: 700;
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 8px;
      box-shadow: 3px 3px 0 var(--black, #000);
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    /* Editable Input Styles */
    .editable-field-input {
      font: inherit;
      color: inherit;
      background: rgba(192, 229, 41, 0.3) !important;
      border: 2px dashed var(--lime-dark, #9BBF1E) !important;
      border-radius: 8px !important;
      padding: 4px 8px !important;
      outline: none !important;
      box-shadow: 0 0 0 4px rgba(192, 229, 41, 0.2);
    }

    .editable-field-input:focus {
      border-color: var(--black, #000) !important;
      box-shadow: 0 0 0 4px rgba(192, 229, 41, 0.3);
    }

    /* Pulse Animation for Edit Mode */
    @keyframes editPulse {
      0%, 100% {
        box-shadow: 0 0 0 0 rgba(192, 229, 41, 0.4);
      }
      50% {
        box-shadow: 0 0 0 8px rgba(192, 229, 41, 0);
      }
    }

    .edit-mode-active .editable-field:hover {
      animation: editPulse 1.5s ease-in-out infinite;
    }
  `}</style>
);

export default EditableField;
