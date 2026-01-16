import { useState, useRef, useEffect } from 'react';
import { useEdit } from './EditableField';

function MetricRow({ icon, label, value, onLabelChange, onValueChange }) {
  const { isEditMode } = useEdit();
  const [editingField, setEditingField] = useState(null);
  const [tempLabel, setTempLabel] = useState(label);
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    setTempLabel(label);
    setTempValue(value);
  }, [label, value]);

  useEffect(() => {
    if (editingField && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingField]);

  const handleClick = (field) => {
    if (isEditMode) {
      setEditingField(field);
    }
  };

  const handleDoubleClick = (field) => {
    setEditingField(field);
  };

  const handleBlur = (field) => {
    setEditingField(null);
    if (field === 'label' && onLabelChange && tempLabel !== label) {
      onLabelChange(tempLabel);
    }
    if (field === 'value' && onValueChange && tempValue !== value) {
      onValueChange(tempValue);
    }
  };

  const handleKeyDown = (e, field) => {
    if (e.key === 'Enter') {
      handleBlur(field);
    }
    if (e.key === 'Escape') {
      setEditingField(null);
      setTempLabel(label);
      setTempValue(value);
    }
  };

  return (
    <div className={`metric-row ${isEditMode ? 'edit-mode' : ''}`}>
      <div className="metric-row-icon">
        <i className={`fas ${icon}`}></i>
      </div>
      
      {editingField === 'label' ? (
        <input
          ref={inputRef}
          type="text"
          value={tempLabel}
          onChange={(e) => setTempLabel(e.target.value)}
          onBlur={() => handleBlur('label')}
          onKeyDown={(e) => handleKeyDown(e, 'label')}
          className="metric-row-input label"
        />
      ) : (
        <div 
          className={`metric-row-label ${isEditMode ? 'editable' : ''}`}
          onClick={() => handleClick('label')}
          onDoubleClick={() => handleDoubleClick('label')}
          title={isEditMode ? 'Click to edit' : 'Double-click to edit'}
        >
          {label}
        </div>
      )}
      
      {editingField === 'value' ? (
        <input
          ref={inputRef}
          type="text"
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onBlur={() => handleBlur('value')}
          onKeyDown={(e) => handleKeyDown(e, 'value')}
          className="metric-row-input value"
        />
      ) : (
        <div 
          className={`metric-row-value ${isEditMode ? 'editable' : ''}`}
          onClick={() => handleClick('value')}
          onDoubleClick={() => handleDoubleClick('value')}
          title={isEditMode ? 'Click to edit' : 'Double-click to edit'}
        >
          {value}
        </div>
      )}

      <style>{`
        .metric-row.edit-mode {
          outline: 2px dashed var(--lime-dark);
          outline-offset: 2px;
        }
        
        .metric-row-label.editable,
        .metric-row-value.editable {
          cursor: text;
          border-radius: 4px;
          transition: background 0.2s ease;
        }
        
        .metric-row-label.editable:hover {
          background: rgba(192, 229, 41, 0.3);
        }
        
        .metric-row-value.editable:hover {
          background: rgba(192, 229, 41, 0.5);
        }
        
        .metric-row-input {
          font: inherit;
          background: rgba(255,255,255,0.9);
          border: 2px dashed var(--black);
          border-radius: 6px;
          padding: 4px 8px;
          outline: none;
        }
        
        .metric-row-input.label {
          flex: 1;
          margin: 0 8px;
        }
        
        .metric-row-input.value {
          font-weight: 700;
          font-style: italic;
          min-width: 120px;
        }
      `}</style>
    </div>
  );
}

export default MetricRow;
