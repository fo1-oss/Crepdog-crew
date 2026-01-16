import { useState, useRef, useEffect } from 'react';
import { useEdit } from './EditableField';

function PageHeader({ title, highlight, subtitle, onTitleChange, onHighlightChange, onSubtitleChange }) {
  const { isEditMode } = useEdit();
  const [editingField, setEditingField] = useState(null);
  const [tempTitle, setTempTitle] = useState(title);
  const [tempHighlight, setTempHighlight] = useState(highlight);
  const [tempSubtitle, setTempSubtitle] = useState(subtitle);
  const inputRef = useRef(null);

  useEffect(() => {
    setTempTitle(title);
    setTempHighlight(highlight);
    setTempSubtitle(subtitle);
  }, [title, highlight, subtitle]);

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
    if (field === 'title' && onTitleChange && tempTitle !== title) {
      onTitleChange(tempTitle);
    }
    if (field === 'highlight' && onHighlightChange && tempHighlight !== highlight) {
      onHighlightChange(tempHighlight);
    }
    if (field === 'subtitle' && onSubtitleChange && tempSubtitle !== subtitle) {
      onSubtitleChange(tempSubtitle);
    }
  };

  const handleKeyDown = (e, field) => {
    if (e.key === 'Enter') {
      handleBlur(field);
    }
    if (e.key === 'Escape') {
      setEditingField(null);
      setTempTitle(title);
      setTempHighlight(highlight);
      setTempSubtitle(subtitle);
    }
  };

  return (
    <div className={`page-header ${isEditMode ? 'edit-mode' : ''}`}>
      <div>
        <h1 className="page-title">
          {editingField === 'title' ? (
            <input
              ref={inputRef}
              type="text"
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              onBlur={() => handleBlur('title')}
              onKeyDown={(e) => handleKeyDown(e, 'title')}
              className="page-header-input"
            />
          ) : (
            <span 
              className={isEditMode ? 'editable' : ''}
              onClick={() => handleClick('title')}
              onDoubleClick={() => handleDoubleClick('title')}
              title={isEditMode ? 'Click to edit' : 'Double-click to edit'}
            >
              {title}
            </span>
          )}{' '}
          {editingField === 'highlight' ? (
            <input
              ref={editingField === 'highlight' ? inputRef : null}
              type="text"
              value={tempHighlight}
              onChange={(e) => setTempHighlight(e.target.value)}
              onBlur={() => handleBlur('highlight')}
              onKeyDown={(e) => handleKeyDown(e, 'highlight')}
              className="page-header-input highlight"
            />
          ) : (
            <span 
              className={`title-highlight ${isEditMode ? 'editable' : ''}`}
              onClick={() => handleClick('highlight')}
              onDoubleClick={() => handleDoubleClick('highlight')}
              title={isEditMode ? 'Click to edit' : 'Double-click to edit'}
            >
              {highlight}
            </span>
          )}
        </h1>
        <div className="title-underline"></div>
        {subtitle && (
          editingField === 'subtitle' ? (
            <input
              ref={editingField === 'subtitle' ? inputRef : null}
              type="text"
              value={tempSubtitle}
              onChange={(e) => setTempSubtitle(e.target.value)}
              onBlur={() => handleBlur('subtitle')}
              onKeyDown={(e) => handleKeyDown(e, 'subtitle')}
              className="page-header-input subtitle"
            />
          ) : (
            <p 
              className={`page-subtitle ${isEditMode ? 'editable' : ''}`}
              onClick={() => handleClick('subtitle')}
              onDoubleClick={() => handleDoubleClick('subtitle')}
              title={isEditMode ? 'Click to edit' : 'Double-click to edit'}
            >
              {subtitle}
            </p>
          )
        )}
      </div>
      <div className="header-logo">
        <span>CREPDOG</span>
        <span style={{ fontWeight: 900 }}>CREW</span>
      </div>

      <style>{`
        .page-header.edit-mode {
          border: 2px dashed var(--lime-dark);
          border-radius: 12px;
          padding: 16px;
          margin: -16px;
          margin-bottom: 16px;
        }
        
        .page-title span.editable,
        .title-highlight.editable,
        .page-subtitle.editable {
          cursor: text;
          border-radius: 6px;
          transition: background 0.2s ease;
        }
        
        .page-title span.editable:hover,
        .title-highlight.editable:hover,
        .page-subtitle.editable:hover {
          background: rgba(192, 229, 41, 0.3);
        }
        
        .page-header-input {
          font: inherit;
          background: rgba(255,255,255,0.9);
          border: 2px dashed var(--black);
          border-radius: 8px;
          padding: 4px 12px;
          outline: none;
          font-size: inherit;
          font-weight: inherit;
        }
        
        .page-header-input.highlight {
          background: var(--lime);
        }
        
        .page-header-input.subtitle {
          font-size: 18px;
          margin-top: 8px;
          width: 100%;
        }
      `}</style>
    </div>
  );
}

export default PageHeader;
