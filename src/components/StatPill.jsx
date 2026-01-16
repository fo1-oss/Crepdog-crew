import { useState, useRef, useEffect } from 'react';
import { useEdit } from './EditableField';

function StatPill({ label, value, onLabelChange, onValueChange }) {
  const { isEditMode } = useEdit();
  const [editingField, setEditingField] = useState(null); // 'label' | 'value' | null
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
    <div className={`stat-pill ${isEditMode ? 'edit-mode' : ''}`}>
      {editingField === 'label' ? (
        <input
          ref={inputRef}
          type="text"
          value={tempLabel}
          onChange={(e) => setTempLabel(e.target.value)}
          onBlur={() => handleBlur('label')}
          onKeyDown={(e) => handleKeyDown(e, 'label')}
          className="stat-pill-input"
        />
      ) : (
        <div 
          className={`stat-pill-label ${isEditMode ? 'editable' : ''}`}
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
          className="stat-pill-input value"
        />
      ) : (
        <div 
          className={`stat-pill-value ${isEditMode ? 'editable' : ''}`}
          onClick={() => handleClick('value')}
          onDoubleClick={() => handleDoubleClick('value')}
          title={isEditMode ? 'Click to edit' : 'Double-click to edit'}
        >
          {value}
        </div>
      )}

      <style>{`
        .stat-pill.edit-mode {
          outline: 2px dashed var(--lime-dark);
          outline-offset: 2px;
        }
        
        .stat-pill-label.editable,
        .stat-pill-value.editable {
          cursor: text;
          border-radius: 4px;
          transition: background 0.2s ease;
        }
        
        .stat-pill-label.editable:hover,
        .stat-pill-value.editable:hover {
          background: rgba(192, 229, 41, 0.3);
        }
        
        .stat-pill-input {
          font: inherit;
          background: rgba(255,255,255,0.9);
          border: 2px dashed var(--black);
          border-radius: 6px;
          padding: 2px 6px;
          width: 100%;
          outline: none;
        }
        
        .stat-pill-input.value {
          font-weight: 900;
          font-size: 20px;
        }
      `}</style>
    </div>
  );
}

export default StatPill;
