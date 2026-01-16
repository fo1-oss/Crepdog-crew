import { useState, useRef, useEffect } from 'react';
import { findAnswer } from '../data/knowledgeBase';

function Chatbot({ isOpen, onToggle }) {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "👋 Hi! I'm your CDC Data Room AI Assistant. I have comprehensive knowledge about Crepdog Crew including business model, SOR strategy, financials, stores, market opportunity, competition, funding plans, and more. Ask me anything!"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setInputValue('');

    // Simulate typing delay
    setTimeout(() => {
      const answer = findAnswer(userMessage);
      setMessages(prev => [...prev, { type: 'bot', text: answer }]);
    }, 400);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleSuggestion = (question) => {
    setInputValue(question);
    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'user', text: question }]);
      setInputValue('');
      setTimeout(() => {
        const answer = findAnswer(question);
        setMessages(prev => [...prev, { type: 'bot', text: answer }]);
      }, 400);
    }, 100);
  };

  const suggestions = [
    { label: 'About CDC', query: 'What is CDC?' },
    { label: 'Financials', query: 'Revenue and financials' },
    { label: 'SOR Model', query: 'What is SOR model?' },
    { label: 'Funding', query: 'How will funds be used?' },
    { label: 'Market', query: 'Market opportunity' },
    { label: 'Competition', query: 'Competition' }
  ];

  return (
    <div className={`chatbot ${isOpen ? 'active' : ''}`}>
      <div className="chatbot-header">
        <div className="chatbot-avatar">
          <i className="fas fa-robot"></i>
        </div>
        <div className="chatbot-info">
          <div className="chatbot-title">CDC AI Assistant</div>
          <div className="chatbot-subtitle">Powered by Investor FAQ & Data Room</div>
        </div>
        <button className="chatbot-close" onClick={onToggle}>
          <i className="fas fa-times"></i>
        </button>
      </div>

      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-msg ${msg.type}`}>
            <div className="chat-bubble">{msg.text}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-suggestions">
        <div className="chat-suggestions-title">Suggested Questions</div>
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            className="chat-btn"
            onClick={() => handleSuggestion(suggestion.query)}
          >
            {suggestion.label}
          </button>
        ))}
      </div>

      <div className="chatbot-input">
        <input
          type="text"
          placeholder="Ask about CDC..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSend}>
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
