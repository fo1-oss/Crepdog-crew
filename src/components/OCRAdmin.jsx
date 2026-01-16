import { useState, useCallback } from 'react';
import Tesseract from 'tesseract.js';

// Parser functions to extract specific data from OCR text
const parseMetrics = (text) => {
  const metrics = {};

  // ARR pattern: looks for "ARR" followed by currency amount
  const arrMatch = text.match(/ARR[:\s]*[₹Rs.]*\s*([\d,.]+)\s*(Cr|Crore|cr|crore)/i);
  if (arrMatch) {
    metrics.arr = parseFloat(arrMatch[1].replace(/,/g, ''));
  }

  // Revenue patterns
  const revenuePatterns = [
    { key: 'ytdGmv', pattern: /(?:YTD|GMV)[:\s]*[₹Rs.]*\s*([\d,.]+)\s*(Cr|Crore)/i },
    { key: 'fy26Target', pattern: /FY['\s]?26[:\s]*(?:Target)?[:\s]*[₹Rs.]*\s*([\d,.]+)\s*(Cr|Crore)/i },
    { key: 'fy25', pattern: /FY['\s]?25[:\s]*[₹Rs.]*\s*([\d,.]+)\s*(Cr|Crore)/i },
    { key: 'fy24', pattern: /FY['\s]?24[:\s]*[₹Rs.]*\s*([\d,.]+)\s*(Cr|Crore)/i },
    { key: 'fy23', pattern: /FY['\s]?23[:\s]*[₹Rs.]*\s*([\d,.]+)\s*(Cr|Crore)/i },
  ];

  revenuePatterns.forEach(({ key, pattern }) => {
    const match = text.match(pattern);
    if (match) {
      metrics[key] = parseFloat(match[1].replace(/,/g, ''));
    }
  });

  // Gross Margin
  const gmMatch = text.match(/Gross\s*Margin[:\s]*([\d.]+)\s*%/i);
  if (gmMatch) {
    metrics.grossMargin = parseFloat(gmMatch[1]);
  }

  // CM2
  const cm2Match = text.match(/CM2[:\s]*([\d.]+)\s*%/i);
  if (cm2Match) {
    metrics.cm2 = parseFloat(cm2Match[1]);
  }

  // Team size
  const teamMatch = text.match(/(?:Team|Employees)[:\s]*([\d,]+)\+?/i);
  if (teamMatch) {
    metrics.teamSize = teamMatch[1].replace(/,/g, '') + '+';
  }

  // Customers
  const customerMatch = text.match(/(?:Customers|Crew\s*Members)[:\s]*([\d,]+)\+?/i);
  if (customerMatch) {
    metrics.customers = customerMatch[1].replace(/,/g, '') + '+';
  }

  // Store count
  const storeMatch = text.match(/(\d+)\s*(?:Stores|stores)/i);
  if (storeMatch) {
    metrics.storeCount = parseInt(storeMatch[1]);
  }

  // AOV
  const aovMatch = text.match(/(?:AOV|Average\s*Order\s*Value|ABV)[:\s]*[₹Rs.]*\s*([\d,]+)/i);
  if (aovMatch) {
    metrics.aov = parseInt(aovMatch[1].replace(/,/g, ''));
  }

  // Fulfillment rate
  const fulfillMatch = text.match(/(?:Fulfillment|Delivery)[:\s]*([\d.]+)\s*%/i);
  if (fulfillMatch) {
    metrics.fulfillment = parseFloat(fulfillMatch[1]);
  }

  // Authenticity rate
  const authMatch = text.match(/(?:Authenticity|Authentic)[:\s]*([\d.]+)\s*%/i);
  if (authMatch) {
    metrics.authenticity = parseFloat(authMatch[1]);
  }

  // Net Worth
  const netWorthMatch = text.match(/Net\s*Worth[:\s]*[₹Rs.]*\s*([\d,.]+)\s*(Cr|Crore|L|Lakh)/i);
  if (netWorthMatch) {
    const value = parseFloat(netWorthMatch[1].replace(/,/g, ''));
    metrics.netWorth = netWorthMatch[2].toLowerCase().startsWith('l') ? value / 100 : value;
  }

  // Funding amount
  const fundingMatch = text.match(/(?:Raising|Pre-Series\s*A|Funding)[:\s]*[₹Rs.]*\s*([\d,.]+)\s*(Cr|Crore)/i);
  if (fundingMatch) {
    metrics.fundingAmount = parseFloat(fundingMatch[1].replace(/,/g, ''));
  }

  // Channel split
  const retailMatch = text.match(/Retail[:\s]*([\d.]+)\s*%/i);
  const onlineMatch = text.match(/Online[:\s]*([\d.]+)\s*%/i);
  if (retailMatch) metrics.retailSplit = parseFloat(retailMatch[1]);
  if (onlineMatch) metrics.onlineSplit = parseFloat(onlineMatch[1]);

  return metrics;
};

function OCRAdmin({ onDataExtracted, onClose }) {
  const [images, setImages] = useState([]);
  const [extractedText, setExtractedText] = useState('');
  const [parsedData, setParsedData] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('upload');

  const handleFileUpload = useCallback((e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter(file =>
      file.type.startsWith('image/') || file.type === 'application/pdf'
    );

    const newImages = imageFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name
    }));

    setImages(prev => [...prev, ...newImages]);
  }, []);

  const processImages = async () => {
    if (images.length === 0) return;

    setIsProcessing(true);
    setProgress(0);
    let allText = '';

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      try {
        const result = await Tesseract.recognize(
          image.preview,
          'eng',
          {
            logger: (m) => {
              if (m.status === 'recognizing text') {
                const overallProgress = ((i + m.progress) / images.length) * 100;
                setProgress(Math.round(overallProgress));
              }
            }
          }
        );
        allText += `\n--- ${image.name} ---\n${result.data.text}\n`;
      } catch (error) {
        console.error('OCR Error:', error);
        allText += `\n--- ${image.name} (Error) ---\n`;
      }
    }

    setExtractedText(allText);
    const parsed = parseMetrics(allText);
    setParsedData(parsed);
    setIsProcessing(false);
    setProgress(100);
    setActiveTab('results');
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const applyChanges = () => {
    if (Object.keys(parsedData).length > 0 && onDataExtracted) {
      onDataExtracted(parsedData);
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));

    const newImages = imageFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name
    }));

    setImages(prev => [...prev, ...newImages]);
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="ocr-admin-overlay">
      <div className="ocr-admin-modal">
        <div className="ocr-admin-header">
          <h2>📄 OCR Data Extractor</h2>
          <p>Upload screenshots or images from your documents to extract and update data</p>
          <button className="ocr-close-btn" onClick={onClose}>×</button>
        </div>

        <div className="ocr-tabs">
          <button
            className={`ocr-tab ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveTab('upload')}
          >
            1. Upload
          </button>
          <button
            className={`ocr-tab ${activeTab === 'results' ? 'active' : ''}`}
            onClick={() => setActiveTab('results')}
            disabled={!extractedText}
          >
            2. Results
          </button>
          <button
            className={`ocr-tab ${activeTab === 'apply' ? 'active' : ''}`}
            onClick={() => setActiveTab('apply')}
            disabled={Object.keys(parsedData).length === 0}
          >
            3. Apply
          </button>
        </div>

        <div className="ocr-content">
          {activeTab === 'upload' && (
            <div className="ocr-upload-section">
              <div
                className="ocr-dropzone"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <div className="dropzone-content">
                  <i className="fas fa-cloud-upload-alt"></i>
                  <p>Drag & drop images here</p>
                  <span>or</span>
                  <label className="upload-btn">
                    Browse Files
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
              </div>

              {images.length > 0 && (
                <div className="ocr-preview-grid">
                  {images.map((img, index) => (
                    <div key={index} className="ocr-preview-item">
                      <img src={img.preview} alt={img.name} />
                      <span>{img.name}</span>
                      <button onClick={() => removeImage(index)}>×</button>
                    </div>
                  ))}
                </div>
              )}

              {images.length > 0 && (
                <button
                  className="ocr-process-btn"
                  onClick={processImages}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <span className="spinner"></span>
                      Processing... {progress}%
                    </>
                  ) : (
                    <>
                      <i className="fas fa-magic"></i>
                      Extract Data ({images.length} image{images.length > 1 ? 's' : ''})
                    </>
                  )}
                </button>
              )}

              {isProcessing && (
                <div className="ocr-progress">
                  <div className="ocr-progress-bar" style={{ width: `${progress}%` }}></div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'results' && (
            <div className="ocr-results-section">
              <div className="ocr-results-grid">
                <div className="ocr-raw-text">
                  <h4>📝 Extracted Text</h4>
                  <textarea
                    value={extractedText}
                    onChange={(e) => {
                      setExtractedText(e.target.value);
                      setParsedData(parseMetrics(e.target.value));
                    }}
                    placeholder="Extracted text will appear here..."
                  />
                </div>
                <div className="ocr-parsed-data">
                  <h4>📊 Detected Metrics</h4>
                  <div className="parsed-metrics-list">
                    {Object.keys(parsedData).length === 0 ? (
                      <p className="no-data">No metrics detected. Try uploading clearer images or edit the text manually.</p>
                    ) : (
                      Object.entries(parsedData).map(([key, value]) => (
                        <div key={key} className="parsed-metric-item">
                          <span className="metric-key">{formatKey(key)}</span>
                          <span className="metric-value">{formatValue(key, value)}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
              <button
                className="ocr-next-btn"
                onClick={() => setActiveTab('apply')}
                disabled={Object.keys(parsedData).length === 0}
              >
                Next: Review Changes →
              </button>
            </div>
          )}

          {activeTab === 'apply' && (
            <div className="ocr-apply-section">
              <h4>✅ Review & Apply Changes</h4>
              <p>The following data will be updated in the webapp:</p>

              <div className="ocr-changes-list">
                {Object.entries(parsedData).map(([key, value]) => (
                  <div key={key} className="ocr-change-item">
                    <span className="change-field">{formatKey(key)}</span>
                    <span className="change-arrow">→</span>
                    <span className="change-value">{formatValue(key, value)}</span>
                    <button
                      className="remove-change"
                      onClick={() => {
                        const newData = { ...parsedData };
                        delete newData[key];
                        setParsedData(newData);
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div className="ocr-apply-actions">
                <button className="ocr-cancel-btn" onClick={onClose}>
                  Cancel
                </button>
                <button className="ocr-apply-btn" onClick={applyChanges}>
                  <i className="fas fa-check"></i>
                  Apply Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper functions
function formatKey(key) {
  const keyMap = {
    arr: 'ARR (Annual Run Rate)',
    ytdGmv: 'YTD GMV',
    fy26Target: 'FY26 Target',
    fy25: 'FY25 Revenue',
    fy24: 'FY24 Revenue',
    fy23: 'FY23 Revenue',
    grossMargin: 'Gross Margin',
    cm2: 'CM2',
    teamSize: 'Team Size',
    customers: 'Customers',
    storeCount: 'Store Count',
    aov: 'Average Order Value',
    fulfillment: 'Fulfillment Rate',
    authenticity: 'Authenticity Rate',
    netWorth: 'Net Worth',
    fundingAmount: 'Funding Amount',
    retailSplit: 'Retail Split',
    onlineSplit: 'Online Split'
  };
  return keyMap[key] || key;
}

function formatValue(key, value) {
  const currencyKeys = ['arr', 'ytdGmv', 'fy26Target', 'fy25', 'fy24', 'fy23', 'netWorth', 'fundingAmount'];
  const percentKeys = ['grossMargin', 'cm2', 'fulfillment', 'authenticity', 'retailSplit', 'onlineSplit'];

  if (currencyKeys.includes(key)) {
    return `₹${value} Cr`;
  }
  if (percentKeys.includes(key)) {
    return `${value}%`;
  }
  if (key === 'aov') {
    return `₹${value.toLocaleString()}`;
  }
  return value;
}

export default OCRAdmin;
