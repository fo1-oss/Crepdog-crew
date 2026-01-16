<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crepdog Crew - Investor Data Room | Jan'26</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        :root {
            --cream: #F5F3EB;
            --lime: #C0E529;
            --lime-dark: #9BBF1E;
            --olive: #6B8E23;
            --olive-dark: #4A5D23;
            --olive-darker: #3D4A2B;
            --black: #000000;
            --white: #FFFFFF;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background-color: var(--cream);
            color: var(--black);
            min-height: 100vh;
            /* Topographic pattern background */
            background-image: url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 200 Q100 180 200 200 T400 200' fill='none' stroke='%23E5E3DB' stroke-width='1.5'/%3E%3Cpath d='M0 100 Q100 80 200 100 T400 100' fill='none' stroke='%23E5E3DB' stroke-width='1'/%3E%3Cpath d='M0 300 Q100 280 200 300 T400 300' fill='none' stroke='%23E5E3DB' stroke-width='1'/%3E%3Cpath d='M0 50 Q100 30 200 50 T400 50' fill='none' stroke='%23E5E3DB' stroke-width='0.8'/%3E%3Cpath d='M0 150 Q100 130 200 150 T400 150' fill='none' stroke='%23E5E3DB' stroke-width='0.8'/%3E%3Cpath d='M0 250 Q100 230 200 250 T400 250' fill='none' stroke='%23E5E3DB' stroke-width='0.8'/%3E%3Cpath d='M0 350 Q100 330 200 350 T400 350' fill='none' stroke='%23E5E3DB' stroke-width='0.8'/%3E%3C/svg%3E");
        }
        
        /* Layout */
        .app { display: flex; min-height: 100vh; }
        
        /* Sidebar */
        .sidebar {
            width: 240px;
            background: var(--white);
            border-right: 3px solid var(--black);
            position: fixed;
            height: 100vh;
            z-index: 100;
            display: flex;
            flex-direction: column;
        }
        
        .logo-container {
            padding: 28px 24px;
            border-bottom: 3px solid var(--black);
        }
        
        .logo {
            font-weight: 900;
            font-size: 22px;
            letter-spacing: -0.5px;
            line-height: 1.1;
        }
        
        .logo-top { color: var(--black); }
        .logo-bottom { color: var(--black); }
        
        .logo-badge {
            display: inline-block;
            background: var(--lime);
            border: 2px solid var(--black);
            border-radius: 6px;
            padding: 4px 10px;
            font-size: 10px;
            font-weight: 800;
            margin-top: 8px;
        }
        
        .nav { padding: 20px 16px; flex: 1; }
        
        .nav-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 14px 16px;
            border-radius: 14px;
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
            margin-bottom: 4px;
            border: 2px solid transparent;
            transition: all 0.15s;
        }
        
        .nav-item:hover { background: rgba(192, 229, 41, 0.2); }
        
        .nav-item.active {
            background: var(--white);
            border-color: var(--black);
        }
        
        .nav-item .icon {
            width: 32px;
            height: 32px;
            background: var(--black);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--white);
            font-size: 13px;
        }
        
        .nav-item.active .icon { background: var(--olive-darker); }
        
        /* Main */
        .main {
            flex: 1;
            margin-left: 240px;
            padding: 32px 40px;
            position: relative;
        }
        
        /* Header */
        .page-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 32px;
        }
        
        .page-title {
            font-size: 42px;
            font-weight: 900;
            letter-spacing: -1px;
            line-height: 1.1;
        }
        
        .title-highlight {
            background: linear-gradient(180deg, transparent 60%, var(--lime) 60%);
            padding: 0 4px;
        }
        
        .title-underline {
            width: 80px;
            height: 4px;
            background: var(--black);
            margin-top: 12px;
        }
        
        .page-subtitle {
            font-size: 18px;
            font-weight: 400;
            color: #444;
            margin-top: 8px;
        }
        
        .header-logo {
            text-align: right;
            font-weight: 900;
            font-size: 14px;
            line-height: 1.1;
        }
        
        .header-logo span { display: block; }
        
        /* Sections */
        .section { display: none; }
        .section.active { display: block; }
        
        /* CDC Card - Primary component */
        .cdc-card {
            background: var(--lime);
            border: 3px solid var(--black);
            border-radius: 20px;
            padding: 24px;
            position: relative;
        }
        
        .cdc-card.white { background: var(--white); }
        .cdc-card.dark { background: var(--olive-dark); color: var(--white); }
        .cdc-card.black { background: var(--black); color: var(--white); }
        
        /* Metric Row - Exact pitch deck style */
        .metric-row {
            display: flex;
            align-items: center;
            background: var(--lime);
            border: 2px solid var(--black);
            border-radius: 50px;
            padding: 6px;
            margin-bottom: 10px;
        }
        
        .metric-row-icon {
            width: 36px;
            height: 36px;
            background: var(--black);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--white);
            font-size: 14px;
            flex-shrink: 0;
        }
        
        .metric-row-label {
            flex: 1;
            padding: 0 16px;
            font-weight: 600;
            font-size: 14px;
        }
        
        .metric-row-value {
            background: var(--white);
            border-radius: 50px;
            padding: 10px 18px;
            font-weight: 700;
            font-size: 14px;
            font-style: italic;
        }
        
        /* Stat Pills - KPI boxes */
        .stat-pills {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
            margin-bottom: 24px;
        }
        
        .stat-pill {
            background: var(--lime);
            border: 2px solid var(--black);
            border-radius: 14px;
            padding: 12px 20px;
        }
        
        .stat-pill-label {
            font-size: 12px;
            font-weight: 500;
            margin-bottom: 2px;
        }
        
        .stat-pill-value {
            font-size: 20px;
            font-weight: 900;
        }
        
        /* Grid */
        .grid { display: grid; gap: 20px; }
        .grid-2 { grid-template-columns: repeat(2, 1fr); }
        .grid-3 { grid-template-columns: repeat(3, 1fr); }
        .grid-4 { grid-template-columns: repeat(4, 1fr); }
        
        /* Problem Cards - Exact pitch deck style */
        .problem-card {
            background: var(--lime);
            border: 3px solid var(--black);
            border-radius: 20px;
            padding: 28px;
            text-align: left;
            position: relative;
        }
        
        .problem-badge {
            position: absolute;
            top: -15px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: var(--black);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .problem-badge i { color: var(--lime); font-size: 20px; }
        
        .problem-stat {
            display: inline-block;
            background: var(--white);
            border: 2px solid var(--black);
            border-radius: 10px;
            padding: 8px 20px;
            font-size: 32px;
            font-weight: 900;
            margin-bottom: 16px;
        }
        
        .problem-text {
            font-size: 14px;
            line-height: 1.6;
        }
        
        .problem-text strong { font-weight: 800; }
        
        .problem-people {
            display: flex;
            gap: 4px;
            margin-top: 20px;
            padding-top: 16px;
            border-top: 2px solid rgba(0,0,0,0.1);
        }
        
        .problem-people i { font-size: 16px; }
        .problem-people i.active { color: var(--black); }
        .problem-people i.inactive { color: rgba(0,0,0,0.2); }
        
        /* Donut Container */
        .donut-section {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .donut-label {
            text-align: center;
            font-weight: 700;
            margin-top: 12px;
        }
        
        .donut-sublabel {
            font-size: 12px;
            color: #666;
        }
        
        /* Mini donuts */
        .mini-donut-row {
            display: flex;
            justify-content: center;
            gap: 40px;
            margin-top: 20px;
        }
        
        .mini-donut {
            text-align: center;
        }
        
        .mini-donut-title {
            font-weight: 700;
            margin-bottom: 8px;
        }
        
        /* Chart Title */
        .chart-header {
            margin-bottom: 20px;
        }
        
        .chart-title {
            font-size: 20px;
            font-weight: 900;
        }
        
        .chart-underline {
            width: 50px;
            height: 3px;
            background: var(--black);
            margin-top: 8px;
        }
        
        .chart-wrapper { height: 300px; position: relative; }
        
        /* Unit Economics Bars - Exact pitch deck style */
        .unit-econ-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 60px;
        }
        
        .unit-econ-col h4 {
            display: inline-block;
            background: var(--white);
            border: 2px solid var(--black);
            border-radius: 50px;
            padding: 8px 24px;
            font-size: 14px;
            font-weight: 700;
            margin-bottom: 24px;
        }
        
        .econ-bar {
            margin-bottom: 8px;
        }
        
        .econ-bar-track {
            height: 36px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--white);
            font-weight: 700;
            font-size: 14px;
        }
        
        .econ-bar-track.light { color: var(--black); }
        
        /* Store Cards */
        .store-card {
            background: var(--lime);
            border: 3px solid var(--black);
            border-radius: 20px;
            padding: 24px;
            position: relative;
            overflow: hidden;
        }
        
        .store-card.dark {
            background: var(--olive-dark);
            color: var(--white);
        }
        
        .store-card.darker {
            background: var(--olive-darker);
            color: var(--white);
        }
        
        .store-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 20px;
        }
        
        .store-icon {
            width: 44px;
            height: 44px;
            background: var(--white);
            border: 2px solid var(--black);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
        }
        
        .store-card.dark .store-icon,
        .store-card.darker .store-icon {
            background: var(--lime);
            color: var(--black);
        }
        
        .store-name { font-size: 20px; font-weight: 800; }
        .store-meta { font-size: 11px; opacity: 0.7; margin-top: 2px; }
        
        .store-revenue {
            font-size: 42px;
            font-weight: 900;
            margin-bottom: 4px;
        }
        
        .store-label { font-size: 12px; opacity: 0.7; margin-bottom: 16px; }
        
        .store-bar {
            height: 10px;
            background: rgba(0,0,0,0.15);
            border-radius: 5px;
            margin-bottom: 20px;
            overflow: hidden;
        }
        
        .store-card.dark .store-bar,
        .store-card.darker .store-bar { background: rgba(255,255,255,0.2); }
        
        .store-bar-fill {
            height: 100%;
            background: var(--olive-darker);
            border-radius: 5px;
        }
        
        .store-card.dark .store-bar-fill,
        .store-card.darker .store-bar-fill { background: var(--lime); }
        
        .store-mix {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
        }
        
        .store-mix-item {
            background: var(--white);
            border: 2px solid var(--black);
            border-radius: 12px;
            padding: 14px;
            text-align: center;
        }
        
        .store-card.dark .store-mix-item,
        .store-card.darker .store-mix-item {
            background: rgba(255,255,255,0.1);
            border-color: rgba(255,255,255,0.3);
        }
        
        .store-mix-value { font-size: 24px; font-weight: 900; }
        .store-mix-label { font-size: 11px; opacity: 0.6; margin-top: 2px; }
        
        /* Competitive Table */
        .comp-table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0 8px;
        }
        
        .comp-table th {
            text-align: left;
            padding: 12px 16px;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            color: #666;
        }
        
        .comp-table td {
            padding: 16px;
            font-size: 14px;
            background: var(--white);
        }
        
        .comp-table tr td:first-child { border-radius: 12px 0 0 12px; }
        .comp-table tr td:last-child { border-radius: 0 12px 12px 0; }
        
        .comp-table tr.cdc td {
            background: var(--lime);
            border-top: 3px solid var(--black);
            border-bottom: 3px solid var(--black);
        }
        
        .comp-table tr.cdc td:first-child { border-left: 3px solid var(--black); }
        .comp-table tr.cdc td:last-child { border-right: 3px solid var(--black); }
        
        .badge {
            display: inline-block;
            padding: 6px 14px;
            border-radius: 50px;
            font-size: 12px;
            font-weight: 700;
        }
        
        .badge.green { background: #DCFCE7; color: #166534; }
        .badge.yellow { background: #FEF9C3; color: #854D0E; }
        .badge.red { background: #FEE2E2; color: #991B1B; }
        
        /* Fund Hero */
        .fund-hero {
            background: var(--olive-darker);
            border: 3px solid var(--black);
            border-radius: 24px;
            padding: 40px;
            color: var(--white);
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-bottom: 24px;
        }
        
        .fund-roadmap h4 {
            font-size: 16px;
            margin-bottom: 20px;
            opacity: 0.8;
        }
        
        .roadmap-item {
            background: var(--lime);
            border: 2px solid var(--black);
            border-radius: 16px;
            padding: 16px 20px;
            margin-bottom: 12px;
            color: var(--black);
        }
        
        .roadmap-title {
            display: inline-block;
            background: var(--white);
            border: 2px solid var(--black);
            border-radius: 50px;
            padding: 6px 16px;
            font-weight: 700;
            font-size: 13px;
            margin-bottom: 8px;
        }
        
        .roadmap-desc { font-size: 13px; color: #333; }
        
        .fund-chart-container { position: relative; }
        
        .fund-amount {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
        }
        
        .fund-amount-value {
            font-size: 36px;
            font-weight: 900;
        }
        
        /* Allocation Legend */
        .alloc-legend {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px 24px;
            margin-top: 20px;
        }
        
        .alloc-item {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 13px;
        }
        
        .alloc-color {
            width: 14px;
            height: 14px;
            border-radius: 3px;
            flex-shrink: 0;
        }
        
        /* Founder Cards */
        .founder-card {
            background: var(--lime);
            border: 3px solid var(--black);
            border-radius: 20px;
            padding: 28px;
            text-align: center;
        }
        
        .founder-card.dark { background: var(--olive-dark); color: var(--white); }
        .founder-card.darker { background: var(--olive-darker); color: var(--white); }
        
        .founder-avatar {
            width: 80px;
            height: 80px;
            background: var(--black);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--white);
            font-size: 28px;
            font-weight: 900;
            margin: 0 auto 16px;
        }
        
        .founder-card.dark .founder-avatar,
        .founder-card.darker .founder-avatar {
            background: var(--lime);
            color: var(--black);
        }
        
        .founder-name { font-size: 20px; font-weight: 800; }
        
        .founder-role {
            display: inline-block;
            background: var(--white);
            border: 2px solid var(--black);
            border-radius: 50px;
            padding: 6px 16px;
            font-size: 12px;
            font-weight: 700;
            margin-top: 8px;
        }
        
        .founder-card.dark .founder-role,
        .founder-card.darker .founder-role {
            background: var(--lime);
        }
        
        .founder-details { margin-top: 20px; text-align: left; }
        
        .founder-detail {
            display: flex;
            align-items: center;
            gap: 10px;
            background: var(--white);
            border-radius: 10px;
            padding: 10px 14px;
            margin-bottom: 8px;
            font-size: 12px;
            font-weight: 500;
        }
        
        .founder-card.dark .founder-detail,
        .founder-card.darker .founder-detail {
            background: rgba(255,255,255,0.1);
        }
        
        .founder-detail i { color: var(--olive-dark); }
        .founder-card.dark .founder-detail i,
        .founder-card.darker .founder-detail i { color: var(--lime); }
        
        /* Why Grid */
        .why-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
            margin-top: 20px;
        }
        
        .why-item {
            background: var(--lime);
            border: 3px solid var(--black);
            border-radius: 16px;
            padding: 24px 16px;
            text-align: center;
            position: relative;
        }
        
        .why-icon {
            width: 50px;
            height: 50px;
            background: var(--black);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--white);
            font-size: 20px;
            margin: -40px auto 16px;
        }
        
        .why-title { font-size: 13px; font-weight: 700; line-height: 1.4; }
        
        /* Contact */
        .contact-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 32px;
            margin-top: 20px;
        }
        
        .contact-label { font-size: 12px; opacity: 0.5; margin-bottom: 4px; }
        .contact-name { font-size: 18px; font-weight: 800; }
        .contact-info { opacity: 0.7; margin-top: 4px; font-size: 14px; }
        
        /* AI Chatbot */
        .chatbot {
            position: fixed;
            bottom: 24px;
            right: 24px;
            width: 380px;
            height: 520px;
            background: var(--white);
            border: 3px solid var(--black);
            border-radius: 24px;
            display: none;
            flex-direction: column;
            overflow: hidden;
            z-index: 1000;
            box-shadow: 8px 8px 0 rgba(0,0,0,0.15);
        }
        
        .chatbot.active { display: flex; }
        
        .chatbot-header {
            background: var(--black);
            color: var(--white);
            padding: 18px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .chatbot-avatar {
            width: 44px;
            height: 44px;
            background: var(--lime);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--black);
            font-size: 18px;
        }
        
        .chatbot-info { margin-left: 12px; flex: 1; }
        .chatbot-title { font-weight: 800; font-size: 15px; }
        .chatbot-subtitle { font-size: 11px; opacity: 0.6; }
        
        .chatbot-close {
            background: none;
            border: none;
            color: var(--white);
            font-size: 20px;
            cursor: pointer;
            padding: 8px;
        }
        
        .chatbot-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: var(--cream);
        }
        
        .chat-msg { margin-bottom: 14px; max-width: 85%; }
        .chat-msg.user { margin-left: auto; }
        
        .chat-bubble {
            padding: 14px 18px;
            border-radius: 18px;
            font-size: 13px;
            line-height: 1.5;
        }
        
        .chat-msg.bot .chat-bubble {
            background: var(--white);
            border: 2px solid var(--black);
            border-bottom-left-radius: 6px;
        }
        
        .chat-msg.user .chat-bubble {
            background: var(--black);
            color: var(--white);
            border-bottom-right-radius: 6px;
        }
        
        .chat-suggestions { padding: 14px 20px; background: var(--white); border-top: 2px solid #eee; }
        .chat-suggestions-title { font-size: 10px; font-weight: 700; color: #999; margin-bottom: 10px; text-transform: uppercase; }
        
        .chat-btn {
            display: inline-block;
            background: var(--lime);
            border: 2px solid var(--black);
            padding: 8px 14px;
            border-radius: 50px;
            font-size: 11px;
            font-weight: 700;
            cursor: pointer;
            margin: 2px;
            transition: all 0.15s;
        }
        
        .chat-btn:hover { transform: translateY(-2px); box-shadow: 2px 2px 0 var(--black); }
        
        .chatbot-input {
            padding: 14px 18px;
            background: var(--white);
            border-top: 2px solid var(--black);
            display: flex;
            gap: 10px;
        }
        
        .chatbot-input input {
            flex: 1;
            padding: 12px 16px;
            border: 2px solid var(--black);
            border-radius: 50px;
            font-size: 13px;
            font-family: inherit;
            outline: none;
        }
        
        .chatbot-input input:focus { box-shadow: 3px 3px 0 var(--lime); }
        
        .chatbot-input button {
            background: var(--black);
            color: var(--white);
            border: none;
            width: 46px;
            height: 46px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 15px;
        }
        
        /* FAB */
        .chat-fab {
            position: fixed;
            bottom: 24px;
            right: 24px;
            width: 60px;
            height: 60px;
            background: var(--lime);
            border: 3px solid var(--black);
            border-radius: 50%;
            font-size: 22px;
            cursor: pointer;
            box-shadow: 4px 4px 0 var(--black);
            z-index: 999;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .chat-fab:hover { transform: translateY(-3px); box-shadow: 6px 6px 0 var(--black); }
        .chat-fab.hidden { display: none; }
        
        /* Decorative swirls */
        .swirl {
            position: fixed;
            pointer-events: none;
            z-index: 0;
            opacity: 0.4;
        }
        
        .swirl-br {
            bottom: -40px;
            right: -40px;
            width: 200px;
            height: 200px;
        }
        
        /* Notes Box */
        .notes-box {
            background: var(--white);
            border: 3px solid var(--black);
            border-radius: 16px;
            padding: 24px;
        }
        
        .notes-title { font-weight: 900; font-size: 14px; margin-bottom: 20px; }
        
        .note-item { display: flex; gap: 12px; margin-bottom: 16px; font-size: 13px; line-height: 1.5; }
        .note-label { font-weight: 800; white-space: nowrap; }
        .note-arrow { color: var(--olive-dark); }
        
        /* Document Cards */
        .doc-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
            margin-bottom: 32px;
        }
        
        .doc-card {
            background: var(--white);
            border: 3px solid var(--black);
            border-radius: 20px;
            padding: 0;
            overflow: hidden;
            transition: all 0.2s;
            cursor: pointer;
            text-decoration: none;
            color: inherit;
            display: block;
        }
        
        .doc-card:hover {
            transform: translateY(-4px);
            box-shadow: 6px 6px 0 var(--black);
        }
        
        .doc-card-header {
            padding: 24px;
            display: flex;
            align-items: center;
            gap: 16px;
        }
        
        .doc-card-header.lime { background: var(--lime); }
        .doc-card-header.olive { background: var(--olive-dark); color: var(--white); }
        .doc-card-header.black { background: var(--black); color: var(--white); }
        .doc-card-header.white { background: var(--white); }
        
        .doc-icon {
            width: 56px;
            height: 56px;
            background: var(--white);
            border: 2px solid var(--black);
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
        }
        
        .doc-card-header.olive .doc-icon,
        .doc-card-header.black .doc-icon { background: var(--lime); }
        
        .doc-title {
            font-weight: 800;
            font-size: 16px;
            line-height: 1.2;
        }
        
        .doc-subtitle {
            font-size: 12px;
            opacity: 0.7;
            margin-top: 4px;
        }
        
        .doc-card-body {
            padding: 20px 24px;
            background: var(--cream);
            border-top: 2px solid var(--black);
        }
        
        .doc-stats {
            display: flex;
            gap: 16px;
            margin-bottom: 16px;
        }
        
        .doc-stat {
            background: var(--lime);
            border: 2px solid var(--black);
            border-radius: 8px;
            padding: 8px 12px;
            font-size: 11px;
        }
        
        .doc-stat-value {
            font-weight: 900;
            font-size: 14px;
            display: block;
        }
        
        .doc-highlights {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        
        .doc-tag {
            background: var(--white);
            border: 2px solid var(--black);
            border-radius: 50px;
            padding: 6px 12px;
            font-size: 11px;
            font-weight: 600;
        }
        
        .doc-download-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: 100%;
            padding: 14px;
            background: var(--black);
            color: var(--white);
            font-weight: 700;
            font-size: 13px;
            border: none;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .doc-download-btn:hover {
            background: var(--olive-darker);
        }
        
        .doc-download-btn i {
            font-size: 14px;
        }
        
        /* INFOGRAPHIC CARDS */
        .infographic-card {
            background: var(--white);
            border: 3px solid var(--black);
            border-radius: 24px;
            overflow: hidden;
        }
        
        .infographic-header {
            padding: 24px 32px;
            display: flex;
            align-items: center;
            gap: 20px;
        }
        
        .infographic-header.lime { background: var(--lime); }
        .infographic-header.olive { background: var(--olive-dark); color: var(--white); }
        .infographic-header.black { background: var(--black); color: var(--white); }
        
        .infographic-icon {
            width: 60px;
            height: 60px;
            background: var(--white);
            border: 3px solid var(--black);
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            flex-shrink: 0;
        }
        
        .infographic-header.olive .infographic-icon,
        .infographic-header.black .infographic-icon { background: var(--lime); }
        
        .infographic-title-wrap { flex: 1; }
        .infographic-title { font-size: 22px; font-weight: 900; margin: 0; }
        .infographic-subtitle { font-size: 13px; opacity: 0.7; margin-top: 4px; }
        
        .download-pill {
            background: var(--white);
            color: var(--black);
            border: 2px solid var(--black);
            border-radius: 50px;
            padding: 10px 20px;
            font-weight: 700;
            font-size: 13px;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.2s;
        }
        
        .download-pill:hover {
            background: var(--lime);
            transform: translateY(-2px);
        }
        
        .infographic-body { padding: 32px; }
        
        .infographic-section {
            margin-bottom: 32px;
            padding-bottom: 32px;
            border-bottom: 2px dashed #ddd;
        }
        
        .infographic-section:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
        }
        
        .info-label {
            font-weight: 900;
            font-size: 14px;
            text-transform: uppercase;
            margin-bottom: 20px;
            color: var(--olive-dark);
            letter-spacing: 0.5px;
        }
        
        /* Simple Explain Boxes */
        .simple-explain { display: flex; flex-direction: column; gap: 16px; }
        
        .explain-box {
            display: flex;
            align-items: flex-start;
            gap: 16px;
            background: var(--cream);
            border: 2px solid var(--black);
            border-radius: 16px;
            padding: 20px;
        }
        
        .explain-icon {
            width: 50px;
            height: 50px;
            background: var(--lime);
            border: 2px solid var(--black);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            flex-shrink: 0;
        }
        
        .explain-text strong { display: block; font-size: 16px; margin-bottom: 4px; }
        .explain-text span { font-size: 13px; color: #666; line-height: 1.4; }
        
        /* Money Visual */
        .money-visual {
            display: flex;
            align-items: flex-end;
            justify-content: center;
            gap: 32px;
            padding: 20px;
            background: var(--cream);
            border: 2px solid var(--black);
            border-radius: 16px;
            margin-bottom: 16px;
        }
        
        .money-year { text-align: center; }
        .money-bar { width: 60px; border-radius: 8px 8px 0 0; border: 2px solid var(--black); border-bottom: none; }
        .money-value { font-weight: 900; font-size: 16px; margin-top: 8px; }
        .money-label { font-size: 12px; color: #666; margin-top: 4px; }
        
        .growth-badge {
            background: var(--lime);
            border: 2px solid var(--black);
            border-radius: 50px;
            padding: 12px 24px;
            font-weight: 800;
            font-size: 16px;
            text-align: center;
            display: inline-block;
        }
        
        /* How It Works Flow */
        .how-it-works {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 16px;
            flex-wrap: wrap;
            margin-bottom: 20px;
        }
        
        .flow-step {
            background: var(--cream);
            border: 2px solid var(--black);
            border-radius: 16px;
            padding: 20px;
            text-align: center;
            width: 160px;
            position: relative;
        }
        
        .flow-num {
            position: absolute;
            top: -12px;
            left: -12px;
            width: 28px;
            height: 28px;
            background: var(--lime);
            border: 2px solid var(--black);
            border-radius: 50%;
            font-weight: 900;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .flow-icon { font-size: 32px; margin-bottom: 8px; }
        .flow-text { font-size: 13px; line-height: 1.4; }
        .flow-text small { color: #666; }
        .flow-arrow { font-size: 24px; font-weight: 900; color: var(--olive-dark); }
        
        .margin-explain {
            text-align: center;
        }
        
        .margin-tag {
            background: var(--lime);
            border: 2px solid var(--black);
            border-radius: 50px;
            padding: 12px 24px;
            font-weight: 600;
            font-size: 14px;
            display: inline-block;
        }
        
        /* Comparison Simple */
        .comparison-simple {
            background: var(--cream);
            border: 2px solid var(--black);
            border-radius: 16px;
            overflow: hidden;
        }
        
        .compare-row {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 16px;
            padding: 16px 24px;
            border-bottom: 1px solid #ddd;
        }
        
        .compare-row:last-child { border-bottom: none; }
        .compare-row.header { background: var(--olive-darker); color: var(--white); font-weight: 700; font-size: 14px; }
        .compare-label { font-weight: 600; }
        .compare-cdc { text-align: center; font-weight: 700; color: #166534; }
        .compare-others { text-align: center; font-weight: 600; color: #991B1B; }
        .big-check { font-size: 18px; }
        .big-x { font-size: 18px; }
        
        /* Big Metrics */
        .big-metrics {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
        }
        
        .big-metric {
            border: 3px solid var(--black);
            border-radius: 20px;
            padding: 24px;
            text-align: center;
        }
        
        .big-metric.lime-bg { background: var(--lime); }
        .big-metric.white-bg { background: var(--white); }
        .big-metric.olive-bg { background: var(--olive-dark); color: var(--white); }
        
        .big-metric-value { font-size: 32px; font-weight: 900; }
        .big-metric-label { font-size: 14px; font-weight: 700; margin-top: 8px; }
        .big-metric-explain { font-size: 11px; opacity: 0.7; margin-top: 8px; }
        
        /* Channel Visual */
        .channel-bar {
            display: flex;
            border: 3px solid var(--black);
            border-radius: 50px;
            overflow: hidden;
            margin-bottom: 20px;
        }
        
        .channel-retail {
            background: var(--lime);
            padding: 16px 24px;
            display: flex;
            align-items: center;
            gap: 12px;
            font-weight: 700;
        }
        
        .channel-online {
            background: var(--olive-dark);
            color: var(--white);
            padding: 16px 24px;
            display: flex;
            align-items: center;
            gap: 12px;
            font-weight: 700;
        }
        
        .channel-icon { font-size: 20px; }
        .channel-pct { font-size: 20px; font-weight: 900; }
        .channel-name { font-size: 14px; }
        
        .channel-details { display: flex; flex-direction: column; gap: 12px; }
        
        .channel-detail {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 14px;
            padding: 12px 16px;
            background: var(--cream);
            border-radius: 12px;
        }
        
        .detail-emoji { font-size: 20px; }
        
        /* Store Bars */
        .store-bars { display: flex; flex-direction: column; gap: 20px; }
        
        .store-bar-item {
            background: var(--cream);
            border: 2px solid var(--black);
            border-radius: 16px;
            padding: 20px;
        }
        
        .store-bar-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;
        }
        
        .store-bar-name { font-weight: 700; font-size: 16px; }
        .store-bar-value { font-weight: 900; font-size: 18px; }
        
        .store-bar-track {
            height: 24px;
            background: #e0e0e0;
            border-radius: 12px;
            border: 2px solid var(--black);
            overflow: hidden;
            margin-bottom: 8px;
        }
        
        .store-bar-fill {
            height: 100%;
            border-radius: 10px;
        }
        
        .store-bar-info { font-size: 12px; color: #666; }
        
        /* Product Mix Visual */
        .product-mix-visual { display: flex; flex-direction: column; gap: 16px; }
        
        .product-item {
            display: flex;
            align-items: center;
            gap: 20px;
            background: var(--cream);
            border: 2px solid var(--black);
            border-radius: 16px;
            padding: 16px 20px;
        }
        
        .product-icon-wrap {
            width: 50px;
            height: 50px;
            border: 2px solid var(--black);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            flex-shrink: 0;
        }
        
        .product-icon-wrap.shoes { background: var(--lime); }
        .product-icon-wrap.apparel { background: #9BBF1E; }
        .product-icon-wrap.accessories { background: #6B8E23; }
        
        .product-info { flex: 1; }
        .product-name { font-weight: 700; font-size: 15px; margin-bottom: 8px; }
        
        .product-pct-bar {
            height: 16px;
            background: #e0e0e0;
            border-radius: 8px;
            border: 2px solid var(--black);
            overflow: hidden;
            margin-bottom: 6px;
        }
        
        .product-pct-bar div { height: 100%; border-radius: 6px; }
        .product-pct { font-size: 13px; font-weight: 600; color: #666; }
        
        /* Balance Visual */
        .balance-visual {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
            margin-bottom: 24px;
        }
        
        .balance-side {
            border: 2px solid var(--black);
            border-radius: 16px;
            padding: 20px;
        }
        
        .balance-side.owns { background: #DCFCE7; }
        .balance-side.owes { background: #FEE2E2; }
        
        .balance-title { font-weight: 800; font-size: 14px; margin-bottom: 8px; }
        .balance-total { font-size: 28px; font-weight: 900; margin-bottom: 16px; }
        
        .balance-items { display: flex; flex-direction: column; gap: 8px; }
        
        .balance-item {
            display: flex;
            align-items: center;
            gap: 10px;
            background: var(--white);
            border-radius: 8px;
            padding: 10px 12px;
            font-size: 13px;
        }
        
        .balance-icon { font-size: 16px; }
        .balance-name { flex: 1; }
        .balance-val { font-weight: 700; }
        
        .net-worth-box {
            background: var(--lime);
            border: 3px solid var(--black);
            border-radius: 16px;
            padding: 24px;
            text-align: center;
        }
        
        .net-worth-label { display: block; font-weight: 700; font-size: 14px; margin-bottom: 8px; }
        .net-worth-value { display: block; font-size: 36px; font-weight: 900; }
        .net-worth-explain { display: block; font-size: 13px; color: #333; margin-top: 8px; }
        
        /* P&L Visual */
        .pnl-visual {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 16px;
            flex-wrap: wrap;
            margin-bottom: 20px;
        }
        
        .pnl-item {
            border: 2px solid var(--black);
            border-radius: 16px;
            padding: 20px;
            display: flex;
            align-items: center;
            gap: 12px;
            min-width: 200px;
        }
        
        .pnl-item.income { background: #DCFCE7; }
        .pnl-item.expense { background: #FEF3C7; }
        .pnl-item.result.profit { background: #DCFCE7; }
        .pnl-item.result.loss { background: #FEE2E2; }
        
        .pnl-icon { font-size: 28px; }
        .pnl-label { font-size: 12px; color: #666; }
        .pnl-value { font-size: 20px; font-weight: 900; }
        
        .pnl-minus, .pnl-equals { font-size: 28px; font-weight: 900; color: #666; }
        
        .loss-explain {
            background: #FEF3C7;
            border: 2px solid var(--black);
            border-radius: 12px;
            padding: 16px 20px;
        }
        
        .loss-reason {
            display: flex;
            align-items: flex-start;
            gap: 12px;
        }
        
        .reason-icon { font-size: 24px; }
        .reason-text { font-size: 14px; line-height: 1.5; }
        
        /* Ratios Grid */
        .ratios-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
        }
        
        .ratio-card {
            border: 2px solid var(--black);
            border-radius: 16px;
            padding: 20px;
            text-align: center;
        }
        
        .ratio-card.good { background: #DCFCE7; }
        .ratio-card.excellent { background: var(--lime); }
        .ratio-card.neutral { background: #FEF3C7; }
        
        .ratio-name { font-size: 12px; font-weight: 600; color: #666; margin-bottom: 8px; }
        .ratio-value { font-size: 28px; font-weight: 900; }
        .ratio-status { font-size: 13px; font-weight: 700; margin-top: 8px; }
        .ratio-explain { font-size: 11px; color: #666; margin-top: 8px; }
        
        /* First Year Stats */
        .first-year-stats {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
            margin-bottom: 20px;
        }
        
        .fy-stat {
            background: var(--cream);
            border: 2px solid var(--black);
            border-radius: 16px;
            padding: 20px;
            text-align: center;
        }
        
        .fy-stat-icon { font-size: 28px; margin-bottom: 8px; }
        .fy-stat-value { font-size: 24px; font-weight: 900; }
        .fy-stat-label { font-size: 12px; color: #666; margin-top: 8px; }
        
        .fy23-note {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            background: var(--lime);
            border: 2px solid var(--black);
            border-radius: 12px;
            padding: 16px 20px;
        }
        
        .note-icon { font-size: 20px; }
        .note-text { font-size: 14px; line-height: 1.5; }
        
        /* Growth Comparison */
        .growth-comparison { display: flex; flex-direction: column; gap: 24px; }
        
        .growth-metric { }
        .growth-label { font-weight: 700; font-size: 15px; margin-bottom: 12px; }
        
        .growth-bars { display: flex; flex-direction: column; gap: 8px; }
        
        .growth-bar-fy23, .growth-bar-fy24 {
            display: flex;
            align-items: center;
            gap: 12px;
            background: var(--cream);
            border: 2px solid var(--black);
            border-radius: 8px;
            padding: 8px 12px;
        }
        
        .growth-year {
            font-weight: 600;
            font-size: 12px;
            width: 40px;
            flex-shrink: 0;
        }
        
        .growth-fill {
            height: 20px;
            background: var(--lime);
            border-radius: 4px;
            border: 1px solid var(--black);
        }
        
        .growth-bar-fy24 .growth-fill { background: var(--olive); }
        
        .growth-val {
            font-weight: 700;
            font-size: 14px;
            margin-left: auto;
        }
        
        .growth-pct {
            font-weight: 700;
            font-size: 14px;
            color: #166534;
            margin-top: 8px;
        }
        
        /* FAQ Grid */
        .faq-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
        }
        
        .faq-item {
            background: var(--cream);
            border: 2px solid var(--black);
            border-radius: 16px;
            padding: 20px;
        }
        
        .faq-q {
            font-weight: 800;
            font-size: 15px;
            margin-bottom: 10px;
            color: var(--olive-darker);
        }
        
        .faq-a {
            font-size: 13px;
            line-height: 1.5;
            color: #444;
        }
        
        /* Topics Visual */
        .topics-visual {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
        }
        
        .topic-tag {
            background: var(--white);
            border: 2px solid var(--black);
            border-radius: 50px;
            padding: 10px 18px;
            font-size: 13px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .topic-tag span { font-size: 16px; }
        
        /* Download All Section */
        .download-all-section {
            background: var(--black);
            border: 3px solid var(--black);
            border-radius: 24px;
            padding: 32px;
        }
        
        .download-all-content {
            display: flex;
            align-items: center;
            gap: 24px;
        }
        
        .download-all-icon {
            font-size: 48px;
        }
        
        .download-all-text {
            flex: 1;
            color: var(--white);
        }
        
        .download-all-text h3 {
            font-size: 22px;
            font-weight: 900;
            margin-bottom: 8px;
        }
        
        .download-all-text p {
            font-size: 14px;
            opacity: 0.8;
        }
        
        .download-all-btn {
            background: var(--lime);
            color: var(--black);
            border: 3px solid var(--black);
            border-radius: 50px;
            padding: 16px 32px;
            font-weight: 800;
            font-size: 16px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 12px;
            transition: all 0.2s;
        }
        
        .download-all-btn:hover {
            transform: translateY(-3px);
            box-shadow: 4px 4px 0 var(--white);
        }
        
        /* Mobile Menu Toggle */
        .mobile-header {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 60px;
            background: var(--white);
            border-bottom: 3px solid var(--black);
            z-index: 200;
            padding: 0 16px;
            align-items: center;
            justify-content: space-between;
        }
        
        .mobile-logo {
            font-weight: 900;
            font-size: 16px;
        }
        
        .mobile-menu-btn {
            width: 44px;
            height: 44px;
            background: var(--lime);
            border: 2px solid var(--black);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            cursor: pointer;
        }
        
        .sidebar-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 150;
        }
        
        .sidebar-overlay.active { display: block; }
        
        /* ============================================
           RESPONSIVE STYLES - TABLET & MOBILE
           ============================================ */
        
        /* Tablet */
        @media (max-width: 1024px) {
            .stat-grid { grid-template-columns: repeat(2, 1fr); }
            .big-metrics { grid-template-columns: repeat(2, 1fr); }
            .ratios-grid { grid-template-columns: repeat(2, 1fr); }
            .first-year-stats { grid-template-columns: repeat(2, 1fr); }
            .faq-grid { grid-template-columns: 1fr; }
            .balance-visual { grid-template-columns: 1fr; }
            .fund-hero { grid-template-columns: 1fr; }
            .comp-cards { grid-template-columns: repeat(2, 1fr); }
        }
        
        /* Mobile */
        @media (max-width: 768px) {
            /* Show mobile header, hide desktop sidebar */
            .mobile-header { display: flex; }
            
            .sidebar {
                transform: translateX(-100%);
                transition: transform 0.3s ease;
                z-index: 200;
            }
            
            .sidebar.active { transform: translateX(0); }
            
            .main {
                margin-left: 0;
                padding: 80px 16px 100px 16px;
            }
            
            /* Page Header */
            .page-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 12px;
            }
            
            .page-title { font-size: 24px; }
            .header-logo { display: none; }
            
            /* Stat Pills */
            .stat-pills {
                flex-wrap: wrap;
                gap: 8px;
            }
            
            .stat-pill {
                padding: 10px 14px;
                font-size: 12px;
            }
            
            /* Stat Grid */
            .stat-grid { grid-template-columns: 1fr; gap: 16px; }
            
            .stat-card { padding: 20px; }
            .stat-value { font-size: 28px; }
            
            /* Channel Split */
            .channel-split { flex-direction: column; }
            .channel-box { padding: 16px; }
            
            /* Charts */
            .chart-row { grid-template-columns: 1fr; }
            .chart-card { padding: 16px; }
            .chart-container { height: 200px; }
            
            /* Infographic Cards */
            .infographic-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 16px;
                padding: 20px;
            }
            
            .infographic-title { font-size: 18px; }
            .infographic-body { padding: 20px; }
            .infographic-section { padding-bottom: 24px; margin-bottom: 24px; }
            
            /* Simple Explain Boxes */
            .explain-box {
                flex-direction: column;
                text-align: center;
                padding: 16px;
            }
            
            /* Money Visual */
            .money-visual {
                gap: 16px;
                padding: 16px;
            }
            
            .money-bar { width: 40px; }
            .money-value { font-size: 14px; }
            
            /* How It Works Flow */
            .how-it-works {
                flex-direction: column;
                gap: 12px;
            }
            
            .flow-step { width: 100%; }
            .flow-arrow { transform: rotate(90deg); }
            
            /* Comparison */
            .compare-row {
                grid-template-columns: 1fr 1fr 1fr;
                gap: 8px;
                padding: 12px 16px;
                font-size: 12px;
            }
            
            /* Big Metrics */
            .big-metrics { grid-template-columns: 1fr; gap: 12px; }
            .big-metric { padding: 20px; }
            .big-metric-value { font-size: 28px; }
            
            /* Channel Visual */
            .channel-bar { flex-direction: column; border-radius: 16px; }
            .channel-retail, .channel-online {
                width: 100% !important;
                justify-content: center;
                border-radius: 0;
            }
            .channel-retail { border-radius: 16px 16px 0 0; }
            .channel-online { border-radius: 0 0 16px 16px; }
            
            /* Store Bars */
            .store-bar-item { padding: 16px; }
            .store-bar-value { font-size: 16px; }
            
            /* Balance Visual */
            .balance-visual { grid-template-columns: 1fr; gap: 16px; }
            .balance-total { font-size: 24px; }
            
            /* Net Worth */
            .net-worth-value { font-size: 28px; }
            
            /* P&L Visual */
            .pnl-visual { flex-direction: column; gap: 12px; }
            .pnl-item { min-width: 100%; justify-content: center; }
            .pnl-minus, .pnl-equals { transform: rotate(90deg); }
            
            /* Ratios */
            .ratios-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
            .ratio-card { padding: 16px; }
            .ratio-value { font-size: 24px; }
            
            /* First Year Stats */
            .first-year-stats { grid-template-columns: repeat(2, 1fr); gap: 12px; }
            .fy-stat { padding: 16px; }
            .fy-stat-value { font-size: 20px; }
            
            /* Growth Comparison */
            .growth-bars { gap: 6px; }
            .growth-bar-fy23, .growth-bar-fy24 { padding: 6px 10px; }
            
            /* FAQ */
            .faq-grid { grid-template-columns: 1fr; }
            .faq-item { padding: 16px; }
            
            /* Topics Visual */
            .topics-visual { gap: 8px; }
            .topic-tag { padding: 8px 14px; font-size: 12px; }
            
            /* Download All */
            .download-all-section { padding: 20px; }
            .download-all-content { flex-direction: column; text-align: center; gap: 16px; }
            .download-all-text h3 { font-size: 18px; }
            .download-all-btn { width: 100%; justify-content: center; }
            
            /* Fund Hero */
            .fund-hero { padding: 24px; gap: 24px; }
            
            /* Competition Table */
            .comp-table { font-size: 12px; }
            .comp-table th, .comp-table td { padding: 10px 8px; }
            
            /* Comp Cards */
            .comp-cards { grid-template-columns: 1fr; }
            
            /* Team Grid */
            .team-grid { grid-template-columns: 1fr; }
            
            /* Contact Grid */
            .contact-grid { grid-template-columns: 1fr; gap: 16px; }
            
            /* Chatbot */
            .chatbot {
                width: calc(100% - 32px);
                right: 16px;
                bottom: 16px;
                max-height: 70vh;
            }
            
            .chat-fab {
                width: 56px;
                height: 56px;
                bottom: 20px;
                right: 20px;
            }
            
            /* Notes Box */
            .notes-box { padding: 16px; }
            .note-item { flex-direction: column; gap: 8px; }
            .note-arrow { display: none; }
        }
        
        /* Small Mobile */
        @media (max-width: 480px) {
            .main { padding: 70px 12px 80px 12px; }
            
            .page-title { font-size: 20px; }
            
            .stat-pill { padding: 8px 12px; }
            .stat-pill-value { font-size: 14px; }
            
            .stat-value { font-size: 24px; }
            
            .infographic-icon { width: 48px; height: 48px; font-size: 22px; }
            .infographic-title { font-size: 16px; }
            
            .download-pill { padding: 8px 14px; font-size: 12px; }
            
            .big-metric-value { font-size: 24px; }
            
            .ratios-grid { grid-template-columns: 1fr; }
            .first-year-stats { grid-template-columns: 1fr; }
            
            .compare-row { font-size: 11px; }
            
            .channel-pct { font-size: 16px; }
            .channel-name { font-size: 12px; }
            
            .money-visual { gap: 12px; }
            .money-bar { width: 32px; }
            .money-value { font-size: 12px; }
            
            .growth-badge { font-size: 14px; padding: 10px 18px; }
            
            .faq-q { font-size: 14px; }
            .faq-a { font-size: 12px; }
        }
    </style>
</head>
<body>
    <!-- Mobile Header -->
    <div class="mobile-header">
        <div class="mobile-logo">CREPDOG CREW</div>
        <button class="mobile-menu-btn" onclick="toggleMobileMenu()">
            <i class="fas fa-bars" id="menuIcon"></i>
        </button>
    </div>
    
    <!-- Sidebar Overlay -->
    <div class="sidebar-overlay" id="sidebarOverlay" onclick="toggleMobileMenu()"></div>
    
    <!-- Decorative swirl SVG -->
    <svg class="swirl swirl-br" viewBox="0 0 200 200">
        <path d="M150 180 Q180 150 150 120 Q120 90 150 60 Q180 30 150 0" fill="none" stroke="#C0E529" stroke-width="20" stroke-linecap="round"/>
    </svg>
    
    <div class="app">
        <!-- Sidebar -->
        <aside class="sidebar">
            <div class="logo-container">
                <div class="logo">
                    <span class="logo-top">CREPDOG</span><br>
                    <span class="logo-bottom">CREW</span>
                </div>
                <div class="logo-badge">INVESTOR DATA ROOM</div>
            </div>
            <nav class="nav">
                <div class="nav-item active" data-section="overview">
                    <div class="icon"><i class="fas fa-home"></i></div>
                    <span>Overview</span>
                </div>
                <div class="nav-item" data-section="financials">
                    <div class="icon"><i class="fas fa-chart-line"></i></div>
                    <span>Financials</span>
                </div>
                <div class="nav-item" data-section="stores">
                    <div class="icon"><i class="fas fa-store"></i></div>
                    <span>Store Performance</span>
                </div>
                <div class="nav-item" data-section="market">
                    <div class="icon"><i class="fas fa-globe"></i></div>
                    <span>Market & Competition</span>
                </div>
                <div class="nav-item" data-section="funding">
                    <div class="icon"><i class="fas fa-rocket"></i></div>
                    <span>Funding & Expansion</span>
                </div>
                <div class="nav-item" data-section="team">
                    <div class="icon"><i class="fas fa-users"></i></div>
                    <span>Team</span>
                </div>
                <div class="nav-item" data-section="documents">
                    <div class="icon"><i class="fas fa-folder-open"></i></div>
                    <span>Documents</span>
                </div>
            </nav>
        </aside>
        
        <!-- Main Content -->
        <main class="main">
            <!-- Overview Section -->
            <section id="overview" class="section active">
                <div class="page-header">
                    <div>
                        <h1 class="page-title">Traction & <span class="title-highlight">key Metrics</span></h1>
                        <div class="title-underline"></div>
                    </div>
                    <div class="header-logo">
                        <span>CREPDOG</span>
                        <span style="font-weight: 900;">CREW</span>
                    </div>
                </div>
                
                <div class="stat-pills">
                    <div class="stat-pill">
                        <div class="stat-pill-label">Founded</div>
                        <div class="stat-pill-value">2019</div>
                    </div>
                    <div class="stat-pill">
                        <div class="stat-pill-label">Headquarters</div>
                        <div class="stat-pill-value">Delhi</div>
                    </div>
                    <div class="stat-pill">
                        <div class="stat-pill-label">Team</div>
                        <div class="stat-pill-value">100+</div>
                    </div>
                    <div class="stat-pill">
                        <div class="stat-pill-label">ARR^</div>
                        <div class="stat-pill-value">₹188 Crore</div>
                    </div>
                    <div class="stat-pill">
                        <div class="stat-pill-label">Gross Margin*</div>
                        <div class="stat-pill-value">18%</div>
                    </div>
                    <div class="stat-pill">
                        <div class="stat-pill-label">CM2*</div>
                        <div class="stat-pill-value">9%</div>
                    </div>
                </div>
                
                <div class="grid grid-2" style="margin-bottom: 24px;">
                    <div>
                        <div class="metric-row">
                            <div class="metric-row-icon"><i class="fas fa-store"></i></div>
                            <div class="metric-row-label">Stores - 3*</div>
                            <div class="metric-row-value">Delhi, Mumbai, Hyderabad</div>
                        </div>
                        <div class="metric-row">
                            <div class="metric-row-icon"><i class="fas fa-receipt"></i></div>
                            <div class="metric-row-label"># of Monthly Billings*</div>
                            <div class="metric-row-value">11,400 orders</div>
                        </div>
                        <div class="metric-row">
                            <div class="metric-row-icon"><i class="fas fa-ruler-combined"></i></div>
                            <div class="metric-row-label">Revenue per sqft*</div>
                            <div class="metric-row-value">₹6,000</div>
                        </div>
                        <div class="metric-row">
                            <div class="metric-row-icon"><i class="fas fa-shopping-bag"></i></div>
                            <div class="metric-row-label">Average Billing Value*</div>
                            <div class="metric-row-value">₹13,600</div>
                        </div>
                        <div class="metric-row">
                            <div class="metric-row-icon"><i class="fas fa-user-friends"></i></div>
                            <div class="metric-row-label">Customers**</div>
                            <div class="metric-row-value">250,000+</div>
                        </div>
                        <div class="metric-row">
                            <div class="metric-row-icon"><i class="fas fa-redo"></i></div>
                            <div class="metric-row-label">Retention Rate*</div>
                            <div class="metric-row-value">30% (YTD)</div>
                        </div>
                    </div>
                    <div class="cdc-card" style="background: var(--lime); display: flex; align-items: center; justify-content: center;">
                        <div>
                            <div class="donut-section">
                                <canvas id="channelDonut" style="max-width: 200px; max-height: 200px;"></canvas>
                                <div class="donut-label">Total Revenue</div>
                            </div>
                            <div class="mini-donut-row">
                                <div class="mini-donut">
                                    <div class="mini-donut-title">Online</div>
                                    <canvas id="onlineDonut" style="width: 80px; height: 80px;"></canvas>
                                    <div style="margin-top: 8px;">
                                        <span style="background: var(--olive-darker); color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 11px;">92%</span>
                                        <span style="font-size: 10px; color: #666;">Shoes</span>
                                    </div>
                                </div>
                                <div class="mini-donut">
                                    <div class="mini-donut-title">Retail</div>
                                    <canvas id="retailDonut" style="width: 80px; height: 80px;"></canvas>
                                    <div style="margin-top: 8px;">
                                        <span style="background: var(--olive-darker); color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 11px;">75%</span>
                                        <span style="font-size: 10px; color: #666;">Shoes</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="cdc-card white">
                    <div class="chart-header">
                        <div class="chart-title">Revenue Trajectory</div>
                        <div class="chart-underline"></div>
                    </div>
                    <div style="display: flex; gap: 16px; margin-bottom: 16px;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <div style="width: 16px; height: 16px; background: var(--black);"></div>
                            <span style="font-size: 12px;">Gross Margin %</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <div style="width: 16px; height: 16px; background: var(--lime);"></div>
                            <span style="font-size: 12px;">Consolidated Revenue</span>
                        </div>
                    </div>
                    <div class="chart-wrapper">
                        <canvas id="revenueChart"></canvas>
                    </div>
                </div>
                
                <p style="font-size: 11px; color: #666; margin-top: 16px;">*YTD FY'26 &nbsp;&nbsp; **LTD &nbsp;&nbsp; ^(Annualized basis YTD FY'26)</p>
            </section>
            
            <!-- Financials Section -->
            <section id="financials" class="section">
                <div class="page-header">
                    <div>
                        <h1 class="page-title">Unit Economics - <span class="title-highlight">Online vs Retail</span></h1>
                        <div class="title-underline"></div>
                    </div>
                    <div class="header-logo"><span>CREPDOG</span><span style="font-weight: 900;">CREW</span></div>
                </div>
                
                <div class="cdc-card white" style="margin-bottom: 24px;">
                    <div class="unit-econ-grid">
                        <div class="unit-econ-col">
                            <h4>Online</h4>
                            <div class="econ-bar">
                                <div class="econ-bar-track" style="width: 100%; background: var(--olive-darker);">100%<span style="font-size: 11px; margin-left: 8px; opacity: 0.7;">(Revenue - GST)</span></div>
                            </div>
                            <div class="econ-bar">
                                <div class="econ-bar-track" style="width: 82%; background: var(--olive-dark);">82%</div>
                            </div>
                            <div class="econ-bar">
                                <div class="econ-bar-track" style="width: 18%; background: var(--olive);">18%</div>
                            </div>
                            <div class="econ-bar">
                                <div class="econ-bar-track" style="width: 14%; background: var(--lime-dark);">14%</div>
                            </div>
                            <div class="econ-bar">
                                <div class="econ-bar-track light" style="width: 3%; background: var(--lime);">3%</div>
                            </div>
                            <div style="display: flex; gap: 12px; margin-top: 16px; flex-wrap: wrap;">
                                <div style="display: flex; align-items: center; gap: 6px; font-size: 11px;"><div style="width: 12px; height: 12px; background: var(--olive-darker);"></div>Net Sales</div>
                                <div style="display: flex; align-items: center; gap: 6px; font-size: 11px;"><div style="width: 12px; height: 12px; background: var(--olive-dark);"></div>COGS</div>
                                <div style="display: flex; align-items: center; gap: 6px; font-size: 11px;"><div style="width: 12px; height: 12px; background: var(--olive);"></div>Gross Margin</div>
                                <div style="display: flex; align-items: center; gap: 6px; font-size: 11px;"><div style="width: 12px; height: 12px; background: var(--lime-dark);"></div>CM1</div>
                                <div style="display: flex; align-items: center; gap: 6px; font-size: 11px;"><div style="width: 12px; height: 12px; background: var(--lime);"></div>Operational EBITDA</div>
                            </div>
                        </div>
                        <div class="unit-econ-col">
                            <h4>Retail</h4>
                            <div class="econ-bar">
                                <div class="econ-bar-track" style="width: 100%; background: var(--olive-darker);">100%<span style="font-size: 11px; margin-left: 8px; opacity: 0.7;">(Revenue - GST)</span></div>
                            </div>
                            <div class="econ-bar">
                                <div class="econ-bar-track" style="width: 80%; background: var(--olive-dark);">80%</div>
                            </div>
                            <div class="econ-bar">
                                <div class="econ-bar-track" style="width: 20%; background: var(--olive);">20%</div>
                            </div>
                            <div class="econ-bar">
                                <div class="econ-bar-track" style="width: 19%; background: var(--lime-dark);">19%</div>
                            </div>
                            <div class="econ-bar">
                                <div class="econ-bar-track light" style="width: 9%; background: var(--lime);">9%</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="grid grid-2">
                    <div class="cdc-card white">
                        <div class="chart-header">
                            <div class="chart-title">Channel Revenue Trend</div>
                            <div class="chart-underline"></div>
                        </div>
                        <div class="chart-wrapper">
                            <canvas id="channelTrendChart"></canvas>
                        </div>
                    </div>
                    <div class="notes-box">
                        <div class="notes-title">NOTES</div>
                        <div class="note-item">
                            <span class="note-label">FY'25 - Q1</span>
                            <span class="note-arrow">→</span>
                            <span>Mumbai store revenue dipped due to a store fire in May</span>
                        </div>
                        <div class="note-item">
                            <span class="note-label">FY'25 - Q4</span>
                            <span class="note-arrow">→</span>
                            <span>Both Retail & Online revenue saw a dip due to seasonality in Jan'25 & Feb'25</span>
                        </div>
                        <div class="note-item">
                            <span class="note-label">FY'26 - Q1</span>
                            <span class="note-arrow">→</span>
                            <span>Registered highest CM3% of 10% in Jun'25</span>
                        </div>
                        <div class="note-item">
                            <span class="note-label">FY'26 - Q3</span>
                            <span class="note-arrow">→</span>
                            <span>Hit highest company level revenue of <strong>₹15.5 Cr</strong> in Dec'26</span>
                        </div>
                    </div>
                </div>
            </section>
            
            <!-- Stores Section -->
            <section id="stores" class="section">
                <div class="page-header">
                    <div>
                        <h1 class="page-title">Retail - <span class="title-highlight">Traction</span> <span style="font-weight: 400; font-size: 24px;">CDC Experience</span></h1>
                        <div class="title-underline"></div>
                    </div>
                    <div class="header-logo"><span>CREPDOG</span><span style="font-weight: 900;">CREW</span></div>
                </div>
                
                <div class="stat-pills">
                    <div class="stat-pill">
                        <div class="stat-pill-label">Monthly Footfall*</div>
                        <div class="stat-pill-value">9,000+</div>
                    </div>
                    <div class="stat-pill">
                        <div class="stat-pill-label">Conversion Rate*</div>
                        <div class="stat-pill-value">35%</div>
                    </div>
                    <div class="stat-pill">
                        <div class="stat-pill-label">Rent to Revenue*</div>
                        <div class="stat-pill-value">3%</div>
                    </div>
                    <div class="stat-pill">
                        <div class="stat-pill-label">ABV*</div>
                        <div class="stat-pill-value">₹15,500</div>
                    </div>
                </div>
                
                <div class="grid grid-3" style="margin-bottom: 24px;">
                    <div class="store-card">
                        <div class="store-header">
                            <div class="store-icon"><i class="fas fa-map-marker-alt"></i></div>
                            <div>
                                <div class="store-name">Delhi</div>
                                <div class="store-meta">4,000 sqft • Since Feb 2022</div>
                            </div>
                        </div>
                        <div class="store-revenue">₹6.52 Cr</div>
                        <div class="store-label">Q3 FY'26 Revenue</div>
                        <div class="store-bar"><div class="store-bar-fill" style="width: 100%;"></div></div>
                        <div class="store-mix">
                            <div class="store-mix-item">
                                <div class="store-mix-value">78%</div>
                                <div class="store-mix-label">Apparel</div>
                            </div>
                            <div class="store-mix-item">
                                <div class="store-mix-value">22%</div>
                                <div class="store-mix-label">Shoes</div>
                            </div>
                        </div>
                    </div>
                    <div class="store-card dark">
                        <div class="store-header">
                            <div class="store-icon"><i class="fas fa-map-marker-alt"></i></div>
                            <div>
                                <div class="store-name">Mumbai</div>
                                <div class="store-meta">2,500 sqft • Since May 2023</div>
                            </div>
                        </div>
                        <div class="store-revenue">₹5.40 Cr</div>
                        <div class="store-label">Q3 FY'26 Revenue</div>
                        <div class="store-bar"><div class="store-bar-fill" style="width: 83%;"></div></div>
                        <div class="store-mix">
                            <div class="store-mix-item">
                                <div class="store-mix-value">74%</div>
                                <div class="store-mix-label">Apparel</div>
                            </div>
                            <div class="store-mix-item">
                                <div class="store-mix-value">26%</div>
                                <div class="store-mix-label">Shoes</div>
                            </div>
                        </div>
                    </div>
                    <div class="store-card darker">
                        <div class="store-header">
                            <div class="store-icon"><i class="fas fa-map-marker-alt"></i></div>
                            <div>
                                <div class="store-name">Hyderabad</div>
                                <div class="store-meta">3,700 sqft • Since Oct 2024</div>
                            </div>
                        </div>
                        <div class="store-revenue">₹4.61 Cr</div>
                        <div class="store-label">Q3 FY'26 Revenue</div>
                        <div class="store-bar"><div class="store-bar-fill" style="width: 71%;"></div></div>
                        <div class="store-mix">
                            <div class="store-mix-item">
                                <div class="store-mix-value">74%</div>
                                <div class="store-mix-label">Apparel</div>
                            </div>
                            <div class="store-mix-item">
                                <div class="store-mix-value">26%</div>
                                <div class="store-mix-label">Shoes</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="cdc-card white">
                    <div class="chart-header">
                        <div class="chart-title">Store-wise Revenue Comparison</div>
                        <div class="chart-underline"></div>
                    </div>
                    <div class="chart-wrapper">
                        <canvas id="storeChart"></canvas>
                    </div>
                </div>
                <p style="font-size: 11px; color: #666; margin-top: 16px;">*YTD - FY'26</p>
            </section>
            
            <!-- Market Section -->
            <section id="market" class="section">
                <div class="page-header">
                    <div>
                        <h1 class="page-title">CDC's <span class="title-highlight">₹35,000 Cr</span> Market Opportunity</h1>
                        <div class="title-underline"></div>
                    </div>
                    <div class="header-logo"><span>CREPDOG</span><span style="font-weight: 900;">CREW</span></div>
                </div>
                
                <div class="cdc-card" style="background: var(--cream); margin-bottom: 24px; padding: 32px;">
                    <div style="text-align: center; margin-bottom: 24px;">
                        <span style="background: var(--lime); border: 2px solid var(--black); border-radius: 50px; padding: 8px 20px; font-weight: 700;">CAGR 6.5%</span>
                    </div>
                    <div class="grid grid-2" style="gap: 40px;">
                        <div class="cdc-card" style="text-align: center;">
                            <div style="background: var(--white); border: 2px solid var(--black); border-radius: 50px; padding: 8px 20px; display: inline-block; margin-bottom: 16px; font-weight: 700;">2025</div>
                            <div style="background: var(--black); border-radius: 16px; padding: 20px; color: var(--white); margin-bottom: 12px;">
                                <div style="font-size: 20px; font-weight: 700;">₹110 Cr*</div>
                                <div style="font-size: 11px; opacity: 0.7; margin-top: 4px;">CREPDOG CREW</div>
                            </div>
                            <div style="font-size: 24px; font-weight: 900;">₹15,150 Cr</div>
                            <div style="font-size: 13px; color: #666;">Indian Market</div>
                            <div style="font-size: 18px; font-weight: 700; margin-top: 8px;">₹6.1 Lakh Cr</div>
                            <div style="font-size: 12px; color: #666;">Global Market</div>
                        </div>
                        <div class="cdc-card" style="text-align: center;">
                            <div style="background: var(--white); border: 2px solid var(--black); border-radius: 50px; padding: 8px 20px; display: inline-block; margin-bottom: 16px; font-weight: 700;">2030</div>
                            <div style="background: var(--black); border-radius: 16px; padding: 20px; color: var(--white); margin-bottom: 12px;">
                                <div style="font-size: 20px; font-weight: 700;">₹1,000 Cr*</div>
                                <div style="font-size: 11px; opacity: 0.7; margin-top: 4px;">CREPDOG CREW</div>
                            </div>
                            <div style="font-size: 24px; font-weight: 900;">₹35,000 Cr</div>
                            <div style="font-size: 13px; color: #666;">Indian Market</div>
                            <div style="font-size: 18px; font-weight: 700; margin-top: 8px;">₹15 Lakh Cr</div>
                            <div style="font-size: 12px; color: #666;">Global Market</div>
                        </div>
                    </div>
                    <div style="text-align: right; margin-top: 16px;">
                        <span style="background: var(--white); border: 2px solid var(--black); border-radius: 12px; padding: 12px 20px; display: inline-block; font-size: 13px;">
                            Crepdog Crew aims to capture <strong>3%</strong> of this market
                        </span>
                    </div>
                </div>
                
                <h3 style="font-size: 24px; font-weight: 900; margin-bottom: 20px;">The Problem</h3>
                <div class="grid grid-3" style="margin-bottom: 32px;">
                    <div class="problem-card">
                        <div class="problem-badge"><i class="fas fa-check"></i></div>
                        <div class="problem-stat">6/10</div>
                        <div class="problem-text">Sneakers sold are <strong>fake</strong>, customers end up paying <strong>2x the original price</strong></div>
                        <div class="problem-people">
                            <i class="fas fa-user active"></i>
                            <i class="fas fa-user active"></i>
                            <i class="fas fa-user active"></i>
                            <i class="fas fa-user active"></i>
                            <i class="fas fa-user active"></i>
                            <i class="fas fa-user active"></i>
                            <i class="fas fa-user inactive"></i>
                            <i class="fas fa-user inactive"></i>
                            <i class="fas fa-user inactive"></i>
                            <i class="fas fa-user inactive"></i>
                        </div>
                    </div>
                    <div class="problem-card">
                        <div class="problem-badge"><i class="fas fa-exclamation"></i></div>
                        <div class="problem-stat">70%</div>
                        <div class="problem-text">Indian customers buy from International brands due to <strong>limited accessibility</strong> to homegrown lifestyle brands</div>
                        <div class="problem-people">
                            <i class="fas fa-user active"></i>
                            <i class="fas fa-user active"></i>
                            <i class="fas fa-user active"></i>
                            <i class="fas fa-user active"></i>
                            <i class="fas fa-user active"></i>
                            <i class="fas fa-user active"></i>
                            <i class="fas fa-user active"></i>
                            <i class="fas fa-user inactive"></i>
                            <i class="fas fa-user inactive"></i>
                            <i class="fas fa-user inactive"></i>
                        </div>
                    </div>
                    <div class="problem-card">
                        <div class="problem-badge"><i class="fas fa-rupee-sign"></i></div>
                        <div class="problem-stat">80%</div>
                        <div class="problem-text">Affluent Indians shop luxury online, <strong>abandon carts</strong> over trust issues, and <strong>30-40% lose money</strong> to non-delivery and scams</div>
                        <div class="problem-people">
                            <i class="fas fa-user active"></i>
                            <i class="fas fa-user active"></i>
                            <i class="fas fa-user active"></i>
                            <i class="fas fa-user active"></i>
                            <i class="fas fa-user active"></i>
                            <i class="fas fa-user active"></i>
                            <i class="fas fa-user active"></i>
                            <i class="fas fa-user active"></i>
                            <i class="fas fa-user inactive"></i>
                            <i class="fas fa-user inactive"></i>
                        </div>
                    </div>
                </div>
                
                <div class="cdc-card white">
                    <div class="chart-header">
                        <div class="chart-title">Leading Premium Luxury</div>
                        <div class="chart-underline"></div>
                        <p style="font-size: 13px; color: #666; margin-top: 8px;">while organizing the 85% unstructured market</p>
                    </div>
                    <table class="comp-table">
                        <thead>
                            <tr>
                                <th>Company</th>
                                <th>Revenue</th>
                                <th>Retail Sqft</th>
                                <th>Order Fulfillment</th>
                                <th>Authenticity</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="cdc">
                                <td><strong style="font-size: 16px;">CDC</strong></td>
                                <td><strong style="color: var(--olive-dark); font-size: 16px;">₹120 Cr</strong></td>
                                <td><strong>12,500</strong></td>
                                <td><span class="badge green">98%</span></td>
                                <td><span class="badge green">99%</span></td>
                            </tr>
                            <tr>
                                <td>Culture</td>
                                <td>₹50 Cr</td>
                                <td>1,200</td>
                                <td><span class="badge yellow">70%</span></td>
                                <td>60%</td>
                            </tr>
                            <tr>
                                <td>Dawntown</td>
                                <td>₹40 Cr</td>
                                <td>3,500</td>
                                <td>60%</td>
                                <td>44%</td>
                            </tr>
                            <tr>
                                <td>MainStreet</td>
                                <td>₹25 Cr</td>
                                <td>200</td>
                                <td><span class="badge red">10%</span></td>
                                <td>80%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            
            <!-- Funding Section -->
            <section id="funding" class="section">
                <div class="page-header">
                    <div>
                        <h1 class="page-title"><span class="title-highlight">Fund Utilization</span></h1>
                        <div class="title-underline"></div>
                    </div>
                    <div class="header-logo"><span>CREPDOG</span><span style="font-weight: 900;">CREW</span></div>
                </div>
                
                <div class="fund-hero">
                    <div class="fund-roadmap">
                        <h4>Roadmap with this raise</h4>
                        <div class="roadmap-item">
                            <div class="roadmap-title">Retail Expansion</div>
                            <div class="roadmap-desc">Establishing strong retail presence in top Tier 1 cities and expanding within current geographies</div>
                        </div>
                        <div class="roadmap-item">
                            <div class="roadmap-title">Experience Centers</div>
                            <div class="roadmap-desc">Creating world class experience centers with a minimum 10,000 sq. ft area</div>
                        </div>
                        <div class="roadmap-item">
                            <div class="roadmap-title">Product Mix</div>
                            <div class="roadmap-desc">Curate an optimal product mix with focus on better blended margins</div>
                        </div>
                        <div class="roadmap-item">
                            <div class="roadmap-title">Marketing Expansion</div>
                            <div class="roadmap-desc">Conduct community engagement and activation campaigns</div>
                        </div>
                    </div>
                    <div class="fund-chart-container">
                        <canvas id="fundingDonut" style="max-width: 280px; margin: 0 auto; display: block;"></canvas>
                        <div class="fund-amount">
                            <div class="fund-amount-value">₹40 Cr</div>
                        </div>
                        <div class="alloc-legend">
                            <div class="alloc-item"><div class="alloc-color" style="background: var(--olive-darker);"></div>Store Expansion Capex - ₹21 Cr (53%)</div>
                            <div class="alloc-item"><div class="alloc-color" style="background: var(--olive-dark);"></div>Store Opex - ₹8 Cr (20%)</div>
                            <div class="alloc-item"><div class="alloc-color" style="background: var(--olive);"></div>Inventory - ₹6 Cr (15%)</div>
                            <div class="alloc-item"><div class="alloc-color" style="background: var(--lime-dark);"></div>Marketing - ₹3.5 Cr (9%)</div>
                            <div class="alloc-item"><div class="alloc-color" style="background: var(--lime);"></div>Team Expansion - ₹1.5 Cr (3%)</div>
                        </div>
                    </div>
                </div>
                
                <div class="cdc-card white">
                    <div class="chart-header">
                        <div class="chart-title">Retail Expansion Plan</div>
                        <div class="chart-underline"></div>
                    </div>
                    <div class="chart-wrapper">
                        <canvas id="expansionChart"></canvas>
                    </div>
                    <p style="font-size: 11px; color: #666; margin-top: 12px;">*Squarefeet</p>
                </div>
            </section>
            
            <!-- Team Section -->
            <section id="team" class="section">
                <div class="page-header">
                    <div>
                        <h1 class="page-title"><span class="title-highlight">Founding team</span></h1>
                        <div class="title-underline"></div>
                        <p class="page-subtitle">with eclectic mix of operational expertise & strong retail acumen</p>
                    </div>
                    <div class="header-logo"><span>CREPDOG</span><span style="font-weight: 900;">CREW</span></div>
                </div>
                
                <div class="grid grid-3" style="margin-bottom: 32px;">
                    <div class="founder-card">
                        <div class="founder-avatar">AK</div>
                        <div class="founder-name">Anchit Kapil</div>
                        <div class="founder-role">Co-Founder</div>
                        <div class="founder-details">
                            <div class="founder-detail"><i class="fas fa-graduation-cap"></i> Lancaster University</div>
                            <div class="founder-detail"><i class="fas fa-briefcase"></i> Director | Summer House Cafe Delhi</div>
                        </div>
                    </div>
                    <div class="founder-card dark">
                        <div class="founder-avatar">BM</div>
                        <div class="founder-name">Bharat Mahrotra</div>
                        <div class="founder-role">Co-Founder & CBO</div>
                        <div class="founder-details">
                            <div class="founder-detail"><i class="fas fa-graduation-cap"></i> Lancaster University</div>
                            <div class="founder-detail"><i class="fas fa-graduation-cap"></i> Warwick Business School</div>
                        </div>
                    </div>
                    <div class="founder-card darker">
                        <div class="founder-avatar">SK</div>
                        <div class="founder-name">Shaurya Kumar</div>
                        <div class="founder-role">Co-Founder</div>
                        <div class="founder-details">
                            <div class="founder-detail"><i class="fas fa-graduation-cap"></i> London School of Economics</div>
                        </div>
                    </div>
                </div>
                
                <h3 style="font-size: 24px; font-weight: 900; margin-bottom: 32px;">Why Crepdog Crew?</h3>
                <div class="why-grid">
                    <div class="why-item">
                        <div class="why-icon"><i class="fas fa-building"></i></div>
                        <div class="why-title">Founders with decades of retail and hospitality expertise</div>
                    </div>
                    <div class="why-item">
                        <div class="why-icon"><i class="fas fa-tshirt"></i></div>
                        <div class="why-title">Largest home-grown western wear apparel collection under one roof</div>
                    </div>
                    <div class="why-item">
                        <div class="why-icon"><i class="fas fa-box"></i></div>
                        <div class="why-title">Capital-Efficient SOR Model - Zero Inventory cost & no dead stock</div>
                    </div>
                    <div class="why-item">
                        <div class="why-icon"><i class="fas fa-star"></i></div>
                        <div class="why-title">Commands high customer recall & brand advocacy</div>
                    </div>
                </div>
                <div class="why-grid" style="margin-top: 32px;">
                    <div class="why-item">
                        <div class="why-icon"><i class="fas fa-hand-holding-usd"></i></div>
                        <div class="why-title">One of the only profitable lifestyle destination in India</div>
                    </div>
                    <div class="why-item">
                        <div class="why-icon"><i class="fas fa-chart-bar"></i></div>
                        <div class="why-title">Insight-led product churns in-sync with dynamic customer trends</div>
                    </div>
                    <div class="why-item">
                        <div class="why-icon"><i class="fas fa-percentage"></i></div>
                        <div class="why-title">Industry-defining take rates across categories & brands</div>
                    </div>
                    <div class="why-item">
                        <div class="why-icon"><i class="fas fa-check-circle"></i></div>
                        <div class="why-title">Authentic inventory</div>
                    </div>
                </div>
                
                <div class="cdc-card black" style="margin-top: 32px;">
                    <div class="chart-header">
                        <div class="chart-title" style="color: var(--white);">Get in Touch</div>
                        <div class="chart-underline" style="background: var(--lime);"></div>
                    </div>
                    <div class="contact-grid">
                        <div>
                            <div class="contact-label">Company Contact</div>
                            <div class="contact-name">Anchit Kapil</div>
                            <div class="contact-info"><a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="31505f525958457152435441555e56524354461f525e5c">[email&#160;protected]</a></div>
                            <div class="contact-info">+91 99908 89494</div>
                        </div>
                        <div>
                            <div class="contact-label">Investment Banking</div>
                            <div class="contact-name">Moxie Capital</div>
                            <div class="contact-info"><a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="592a382c2b383b31773d2b3635303819343621303c3a3829302d3835773037">[email&#160;protected]</a></div>
                        </div>
                    </div>
                </div>
            </section>
            
            <!-- Documents Section -->
            <section id="documents" class="section">
                <div class="page-header">
                    <div>
                        <h1 class="page-title">Data Room <span class="title-highlight">Documents</span></h1>
                        <div class="title-underline"></div>
                    </div>
                    <div class="header-logo">
                        <span>CREPDOG</span>
                        <span style="font-weight: 900;">CREW</span>
                    </div>
                </div>
                
                <!-- PITCH DECK INFOGRAPHIC -->
                <div class="infographic-card" style="margin-bottom: 32px;">
                    <div class="infographic-header lime">
                        <div class="infographic-icon"><i class="fas fa-file-powerpoint"></i></div>
                        <div class="infographic-title-wrap">
                            <h3 class="infographic-title">📊 Investor Pitch Deck</h3>
                            <p class="infographic-subtitle">January 2026 • 28 Pages • The Complete Story</p>
                        </div>
                        <a href="https://drive.google.com/drive/folders/19UHG6yW0zXjsK-bbSMxrN7Qmfxzxt4xG" target="_blank" class="download-pill"><i class="fas fa-external-link-alt"></i> Open</a>
                    </div>
                    <div class="infographic-body">
                        <div class="infographic-section">
                            <div class="info-label">🎯 WHAT IS CDC? (In Simple Words)</div>
                            <div class="simple-explain">
                                <div class="explain-box">
                                    <div class="explain-icon">👟</div>
                                    <div class="explain-text">
                                        <strong>India's #1 Premium Sneaker Store</strong>
                                        <span>Like a Nike/Adidas store, but with rare & limited edition shoes you can't find anywhere else</span>
                                    </div>
                                </div>
                                <div class="explain-box">
                                    <div class="explain-icon">✅</div>
                                    <div class="explain-text">
                                        <strong>100% Authentic Guarantee</strong>
                                        <span>Every product is verified real - no fakes, unlike most online sellers</span>
                                    </div>
                                </div>
                                <div class="explain-box">
                                    <div class="explain-icon">🏪</div>
                                    <div class="explain-text">
                                        <strong>3 Premium Stores + Website</strong>
                                        <span>Physical stores in Delhi, Mumbai, Hyderabad + online shopping</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="infographic-section">
                            <div class="info-label">💰 THE MONEY STORY</div>
                            <div class="money-visual">
                                <div class="money-year">
                                    <div class="money-bar" style="height: 40px; background: #ddd;"></div>
                                    <div class="money-value">₹12 Cr</div>
                                    <div class="money-label">FY23</div>
                                </div>
                                <div class="money-year">
                                    <div class="money-bar" style="height: 100px; background: #9BBF1E;"></div>
                                    <div class="money-value">₹65 Cr</div>
                                    <div class="money-label">FY24</div>
                                </div>
                                <div class="money-year">
                                    <div class="money-bar" style="height: 130px; background: #6B8E23;"></div>
                                    <div class="money-value">₹80 Cr</div>
                                    <div class="money-label">FY25</div>
                                </div>
                                <div class="money-year">
                                    <div class="money-bar" style="height: 180px; background: #C0E529;"></div>
                                    <div class="money-value">₹120 Cr</div>
                                    <div class="money-label">FY26 🎯</div>
                                </div>
                            </div>
                            <div class="growth-badge">📈 10x Growth in 3 Years!</div>
                        </div>
                        
                        <div class="infographic-section">
                            <div class="info-label">🧮 HOW CDC MAKES MONEY</div>
                            <div class="how-it-works">
                                <div class="flow-step">
                                    <div class="flow-num">1</div>
                                    <div class="flow-icon">📦</div>
                                    <div class="flow-text">Get shoes from brands<br><small>(No upfront payment!)</small></div>
                                </div>
                                <div class="flow-arrow">→</div>
                                <div class="flow-step">
                                    <div class="flow-num">2</div>
                                    <div class="flow-icon">🏪</div>
                                    <div class="flow-text">Sell in stores & online<br><small>(₹12,500 avg sale)</small></div>
                                </div>
                                <div class="flow-arrow">→</div>
                                <div class="flow-step">
                                    <div class="flow-num">3</div>
                                    <div class="flow-icon">💵</div>
                                    <div class="flow-text">Keep 22% margin<br><small>(Pay brands the rest)</small></div>
                                </div>
                            </div>
                            <div class="margin-explain">
                                <span class="margin-tag">💡 This means: For every ₹100 sale, CDC keeps ₹22 as profit!</span>
                            </div>
                        </div>
                        
                        <div class="infographic-section">
                            <div class="info-label">🏆 WHY CDC WINS</div>
                            <div class="comparison-simple">
                                <div class="compare-row header">
                                    <div></div>
                                    <div class="compare-cdc">CDC</div>
                                    <div class="compare-others">Others</div>
                                </div>
                                <div class="compare-row">
                                    <div class="compare-label">Real Products?</div>
                                    <div class="compare-cdc"><span class="big-check">✅</span> 99%</div>
                                    <div class="compare-others"><span class="big-x">❌</span> 60-80%</div>
                                </div>
                                <div class="compare-row">
                                    <div class="compare-label">Delivered on time?</div>
                                    <div class="compare-cdc"><span class="big-check">✅</span> 98%</div>
                                    <div class="compare-others"><span class="big-x">❌</span> 10-60%</div>
                                </div>
                                <div class="compare-row">
                                    <div class="compare-label">Physical Stores?</div>
                                    <div class="compare-cdc"><span class="big-check">✅</span> 3 Stores</div>
                                    <div class="compare-others"><span class="big-x">❌</span> None/Few</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- MIS INFOGRAPHIC -->
                <div class="infographic-card" style="margin-bottom: 32px;">
                    <div class="infographic-header olive">
                        <div class="infographic-icon"><i class="fas fa-chart-bar"></i></div>
                        <div class="infographic-title-wrap">
                            <h3 class="infographic-title">📈 MIS & Operational Metrics</h3>
                            <p class="infographic-subtitle">YTD FY26 (Apr-Dec 2025) • Live Business Data</p>
                        </div>
                        <a href="https://drive.google.com/drive/folders/1bM7sVd6rP59sfDIckzfV4nXHrNOkMjhm" target="_blank" class="download-pill"><i class="fas fa-external-link-alt"></i> Open</a>
                    </div>
                    <div class="infographic-body">
                        <div class="infographic-section">
                            <div class="info-label">📊 CURRENT PERFORMANCE (9 Months)</div>
                            <div class="big-metrics">
                                <div class="big-metric lime-bg">
                                    <div class="big-metric-value">₹93.3 Cr</div>
                                    <div class="big-metric-label">Total Sales (GMV)</div>
                                    <div class="big-metric-explain">💡 Money collected from customers</div>
                                </div>
                                <div class="big-metric white-bg">
                                    <div class="big-metric-value">₹88.5 Cr</div>
                                    <div class="big-metric-label">Net Revenue</div>
                                    <div class="big-metric-explain">💡 After returns & discounts</div>
                                </div>
                                <div class="big-metric olive-bg">
                                    <div class="big-metric-value">18%</div>
                                    <div class="big-metric-label">Gross Margin</div>
                                    <div class="big-metric-explain">💡 Profit before expenses</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="infographic-section">
                            <div class="info-label">🏪 WHERE DOES MONEY COME FROM?</div>
                            <div class="channel-visual">
                                <div class="channel-bar">
                                    <div class="channel-retail" style="width: 59%;">
                                        <span class="channel-icon">🏬</span>
                                        <span class="channel-pct">59%</span>
                                        <span class="channel-name">Stores</span>
                                    </div>
                                    <div class="channel-online" style="width: 41%;">
                                        <span class="channel-icon">💻</span>
                                        <span class="channel-pct">41%</span>
                                        <span class="channel-name">Online</span>
                                    </div>
                                </div>
                                <div class="channel-details">
                                    <div class="channel-detail">
                                        <span class="detail-emoji">🏬</span>
                                        <span><strong>Stores:</strong> ₹55 Cr • Higher profit (24% margin) • Premium experience</span>
                                    </div>
                                    <div class="channel-detail">
                                        <span class="detail-emoji">💻</span>
                                        <span><strong>Online:</strong> ₹38 Cr • Lower cost • Reaches all India</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="infographic-section">
                            <div class="info-label">🏪 STORE-BY-STORE BREAKDOWN</div>
                            <div class="store-bars">
                                <div class="store-bar-item">
                                    <div class="store-bar-header">
                                        <span class="store-bar-name">📍 Delhi</span>
                                        <span class="store-bar-value">₹27 Cr</span>
                                    </div>
                                    <div class="store-bar-track">
                                        <div class="store-bar-fill" style="width: 100%; background: var(--lime);"></div>
                                    </div>
                                    <div class="store-bar-info">Flagship • 4,000 sqft • Since Feb 2022</div>
                                </div>
                                <div class="store-bar-item">
                                    <div class="store-bar-header">
                                        <span class="store-bar-name">📍 Mumbai</span>
                                        <span class="store-bar-value">₹16 Cr</span>
                                    </div>
                                    <div class="store-bar-track">
                                        <div class="store-bar-fill" style="width: 59%; background: var(--olive);"></div>
                                    </div>
                                    <div class="store-bar-info">Premium Location • 2,500 sqft • Since May 2023</div>
                                </div>
                                <div class="store-bar-item">
                                    <div class="store-bar-header">
                                        <span class="store-bar-name">📍 Hyderabad</span>
                                        <span class="store-bar-value">₹12 Cr</span>
                                    </div>
                                    <div class="store-bar-track">
                                        <div class="store-bar-fill" style="width: 44%; background: var(--olive-dark);"></div>
                                    </div>
                                    <div class="store-bar-info">Newest Store • 3,700 sqft • Since Oct 2024</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="infographic-section">
                            <div class="info-label">👟 WHAT SELLS MOST?</div>
                            <div class="product-mix-visual">
                                <div class="product-item">
                                    <div class="product-icon-wrap shoes">👟</div>
                                    <div class="product-info">
                                        <div class="product-name">Sneakers & Shoes</div>
                                        <div class="product-pct-bar"><div style="width: 70%; background: var(--lime);"></div></div>
                                        <div class="product-pct">70% of sales</div>
                                    </div>
                                </div>
                                <div class="product-item">
                                    <div class="product-icon-wrap apparel">👕</div>
                                    <div class="product-info">
                                        <div class="product-name">Streetwear & Apparel</div>
                                        <div class="product-pct-bar"><div style="width: 25%; background: var(--olive);"></div></div>
                                        <div class="product-pct">25% of sales</div>
                                    </div>
                                </div>
                                <div class="product-item">
                                    <div class="product-icon-wrap accessories">🎒</div>
                                    <div class="product-info">
                                        <div class="product-name">Accessories</div>
                                        <div class="product-pct-bar"><div style="width: 5%; background: var(--olive-dark);"></div></div>
                                        <div class="product-pct">5% of sales</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- FINANCIALS FY24 INFOGRAPHIC -->
                <div class="infographic-card" style="margin-bottom: 32px;">
                    <div class="infographic-header black">
                        <div class="infographic-icon"><i class="fas fa-file-invoice-dollar"></i></div>
                        <div class="infographic-title-wrap">
                            <h3 class="infographic-title">💼 Audited Financials FY24</h3>
                            <p class="infographic-subtitle">April 2023 - March 2024 • Official Accounts</p>
                        </div>
                        <a href="https://drive.google.com/drive/folders/1W5KzPuaOyhZvsTikFjlmPDxu5PuJ2XBy" target="_blank" class="download-pill"><i class="fas fa-external-link-alt"></i> Open</a>
                    </div>
                    <div class="infographic-body">
                        <div class="infographic-section">
                            <div class="info-label">📋 BALANCE SHEET EXPLAINED (What CDC Owns & Owes)</div>
                            <div class="balance-visual">
                                <div class="balance-side owns">
                                    <div class="balance-title">✅ WHAT CDC OWNS (Assets)</div>
                                    <div class="balance-total">₹1.57 Crore</div>
                                    <div class="balance-items">
                                        <div class="balance-item">
                                            <span class="balance-icon">🏪</span>
                                            <span class="balance-name">Store Equipment & Fixtures</span>
                                            <span class="balance-val">₹16 L</span>
                                        </div>
                                        <div class="balance-item">
                                            <span class="balance-icon">📦</span>
                                            <span class="balance-name">Inventory (Products)</span>
                                            <span class="balance-val">₹49 L</span>
                                        </div>
                                        <div class="balance-item">
                                            <span class="balance-icon">💵</span>
                                            <span class="balance-name">Cash in Bank</span>
                                            <span class="balance-val">₹67 L</span>
                                        </div>
                                        <div class="balance-item">
                                            <span class="balance-icon">📄</span>
                                            <span class="balance-name">Money Owed to CDC</span>
                                            <span class="balance-val">₹3.8 L</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="balance-side owes">
                                    <div class="balance-title">💳 WHAT CDC OWES (Liabilities)</div>
                                    <div class="balance-total">₹51.5 Lakh</div>
                                    <div class="balance-items">
                                        <div class="balance-item">
                                            <span class="balance-icon">🏦</span>
                                            <span class="balance-name">Founder Loans</span>
                                            <span class="balance-val">₹3.3 L</span>
                                        </div>
                                        <div class="balance-item">
                                            <span class="balance-icon">🏢</span>
                                            <span class="balance-name">Supplier Payments Due</span>
                                            <span class="balance-val">₹34 L</span>
                                        </div>
                                        <div class="balance-item">
                                            <span class="balance-icon">📋</span>
                                            <span class="balance-name">Other Payables</span>
                                            <span class="balance-val">₹14 L</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="net-worth-box">
                                <span class="net-worth-label">🎯 NET WORTH (Owns - Owes)</span>
                                <span class="net-worth-value">₹1.05 Crore</span>
                                <span class="net-worth-explain">💡 This is the company's real value after paying all debts</span>
                            </div>
                        </div>
                        
                        <div class="infographic-section">
                            <div class="info-label">📊 PROFIT & LOSS EXPLAINED (Did CDC Make or Lose Money?)</div>
                            <div class="pnl-visual">
                                <div class="pnl-item income">
                                    <div class="pnl-icon">💰</div>
                                    <div class="pnl-details">
                                        <div class="pnl-label">Total Sales Revenue</div>
                                        <div class="pnl-value">₹65.5 Crore</div>
                                    </div>
                                </div>
                                <div class="pnl-minus">−</div>
                                <div class="pnl-item expense">
                                    <div class="pnl-icon">💸</div>
                                    <div class="pnl-details">
                                        <div class="pnl-label">Cost of Products</div>
                                        <div class="pnl-value">₹54 Crore</div>
                                    </div>
                                </div>
                                <div class="pnl-minus">−</div>
                                <div class="pnl-item expense">
                                    <div class="pnl-icon">🏢</div>
                                    <div class="pnl-details">
                                        <div class="pnl-label">Operating Costs (Rent, Salary, etc)</div>
                                        <div class="pnl-value">₹11.5 Crore</div>
                                    </div>
                                </div>
                                <div class="pnl-equals">=</div>
                                <div class="pnl-item result loss">
                                    <div class="pnl-icon">📉</div>
                                    <div class="pnl-details">
                                        <div class="pnl-label">Net Loss</div>
                                        <div class="pnl-value">-₹77 Lakh</div>
                                    </div>
                                </div>
                            </div>
                            <div class="loss-explain">
                                <div class="loss-reason">
                                    <span class="reason-icon">🔥</span>
                                    <span class="reason-text"><strong>Why the loss?</strong> Mumbai store had a fire in May 2024, disrupting 2 months of operations. Without this, CDC would have been profitable!</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="infographic-section">
                            <div class="info-label">📈 KEY FINANCIAL RATIOS (Health Check)</div>
                            <div class="ratios-grid">
                                <div class="ratio-card good">
                                    <div class="ratio-name">Current Ratio</div>
                                    <div class="ratio-value">2.69</div>
                                    <div class="ratio-status">✅ Healthy</div>
                                    <div class="ratio-explain">💡 Can pay bills 2.7x over. Good!</div>
                                </div>
                                <div class="ratio-card good">
                                    <div class="ratio-name">Debt-to-Equity</div>
                                    <div class="ratio-value">0.49</div>
                                    <div class="ratio-status">✅ Low Debt</div>
                                    <div class="ratio-explain">💡 Not over-leveraged. Safe!</div>
                                </div>
                                <div class="ratio-card excellent">
                                    <div class="ratio-name">Inventory Turnover</div>
                                    <div class="ratio-value">26.5x</div>
                                    <div class="ratio-status">🌟 Excellent</div>
                                    <div class="ratio-explain">💡 Products sell fast. Very efficient!</div>
                                </div>
                                <div class="ratio-card neutral">
                                    <div class="ratio-name">Net Profit Margin</div>
                                    <div class="ratio-value">-1%</div>
                                    <div class="ratio-status">⚠️ Loss Year</div>
                                    <div class="ratio-explain">💡 Due to Mumbai fire incident</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- FINANCIALS FY23 INFOGRAPHIC -->
                <div class="infographic-card" style="margin-bottom: 32px;">
                    <div class="infographic-header olive">
                        <div class="infographic-icon"><i class="fas fa-file-invoice-dollar"></i></div>
                        <div class="infographic-title-wrap">
                            <h3 class="infographic-title">📁 Audited Financials FY23</h3>
                            <p class="infographic-subtitle">Sep 2022 - March 2023 • First Year of Pvt Ltd</p>
                        </div>
                        <a href="https://drive.google.com/drive/folders/1W5KzPuaOyhZvsTikFjlmPDxu5PuJ2XBy" target="_blank" class="download-pill"><i class="fas fa-external-link-alt"></i> Open</a>
                    </div>
                    <div class="infographic-body">
                        <div class="infographic-section">
                            <div class="info-label">🚀 FIRST YEAR HIGHLIGHTS (Only 6 Months!)</div>
                            <div class="first-year-stats">
                                <div class="fy-stat">
                                    <div class="fy-stat-icon">💰</div>
                                    <div class="fy-stat-value">₹12.46 Cr</div>
                                    <div class="fy-stat-label">Revenue in 6 months</div>
                                </div>
                                <div class="fy-stat">
                                    <div class="fy-stat-icon">✅</div>
                                    <div class="fy-stat-value">₹18.5 L</div>
                                    <div class="fy-stat-label">Net Profit</div>
                                </div>
                                <div class="fy-stat">
                                    <div class="fy-stat-icon">🏪</div>
                                    <div class="fy-stat-value">1</div>
                                    <div class="fy-stat-label">Store (Delhi)</div>
                                </div>
                                <div class="fy-stat">
                                    <div class="fy-stat-icon">💵</div>
                                    <div class="fy-stat-value">₹2.63 Cr</div>
                                    <div class="fy-stat-label">Cash in Bank</div>
                                </div>
                            </div>
                            <div class="fy23-note">
                                <span class="note-icon">💡</span>
                                <span class="note-text"><strong>Key Point:</strong> This was CDC's first year as a Private Limited company. Started with just 1 store in Delhi and was already profitable!</span>
                            </div>
                        </div>
                        
                        <div class="infographic-section">
                            <div class="info-label">📊 FY23 vs FY24 GROWTH</div>
                            <div class="growth-comparison">
                                <div class="growth-metric">
                                    <div class="growth-label">Revenue</div>
                                    <div class="growth-bars">
                                        <div class="growth-bar-fy23">
                                            <span class="growth-year">FY23</span>
                                            <div class="growth-fill" style="width: 19%;"></div>
                                            <span class="growth-val">₹12.5 Cr</span>
                                        </div>
                                        <div class="growth-bar-fy24">
                                            <span class="growth-year">FY24</span>
                                            <div class="growth-fill" style="width: 100%;"></div>
                                            <span class="growth-val">₹65.5 Cr</span>
                                        </div>
                                    </div>
                                    <div class="growth-pct">📈 5.2x Growth!</div>
                                </div>
                                <div class="growth-metric">
                                    <div class="growth-label">Stores</div>
                                    <div class="growth-bars">
                                        <div class="growth-bar-fy23">
                                            <span class="growth-year">FY23</span>
                                            <div class="growth-fill" style="width: 33%;"></div>
                                            <span class="growth-val">1 Store</span>
                                        </div>
                                        <div class="growth-bar-fy24">
                                            <span class="growth-year">FY24</span>
                                            <div class="growth-fill" style="width: 66%;"></div>
                                            <span class="growth-val">2 Stores</span>
                                        </div>
                                    </div>
                                    <div class="growth-pct">📈 +Mumbai Added!</div>
                                </div>
                                <div class="growth-metric">
                                    <div class="growth-label">Net Worth</div>
                                    <div class="growth-bars">
                                        <div class="growth-bar-fy23">
                                            <span class="growth-year">FY23</span>
                                            <div class="growth-fill" style="width: 42%;"></div>
                                            <span class="growth-val">₹43.8 L</span>
                                        </div>
                                        <div class="growth-bar-fy24">
                                            <span class="growth-year">FY24</span>
                                            <div class="growth-fill" style="width: 100%;"></div>
                                            <span class="growth-val">₹1.05 Cr</span>
                                        </div>
                                    </div>
                                    <div class="growth-pct">📈 2.4x Growth!</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- INVESTOR FAQ INFOGRAPHIC -->
                <div class="infographic-card" style="margin-bottom: 32px;">
                    <div class="infographic-header lime">
                        <div class="infographic-icon"><i class="fas fa-question-circle"></i></div>
                        <div class="infographic-title-wrap">
                            <h3 class="infographic-title">❓ Investor FAQ</h3>
                            <p class="infographic-subtitle">27+ Questions Answered • November 2025</p>
                        </div>
                        <a href="https://drive.google.com/drive/folders/1tEKigXvDH5w28onKJCXJZyRw608mdl8x" target="_blank" class="download-pill"><i class="fas fa-external-link-alt"></i> Open</a>
                    </div>
                    <div class="infographic-body">
                        <div class="infographic-section">
                            <div class="info-label">🎯 TOP INVESTOR QUESTIONS (Quick Answers)</div>
                            <div class="faq-grid">
                                <div class="faq-item">
                                    <div class="faq-q">What does CDC sell?</div>
                                    <div class="faq-a">Premium sneakers (Nike, Adidas, Jordan, Yeezy), streetwear, and accessories - all 100% authentic</div>
                                </div>
                                <div class="faq-item">
                                    <div class="faq-q">How does CDC make money?</div>
                                    <div class="faq-a">22% margin on each sale. Gets products from brands, sells to customers, keeps the difference</div>
                                </div>
                                <div class="faq-item">
                                    <div class="faq-q">What is SOR model?</div>
                                    <div class="faq-a">"Sell Or Return" - CDC doesn't pay upfront for inventory. Only pays brands after selling. Zero risk!</div>
                                </div>
                                <div class="faq-item">
                                    <div class="faq-q">Who are the customers?</div>
                                    <div class="faq-a">Urban males, 14-35 years, earning ₹10-50 LPA. Sneakerheads & fashion enthusiasts</div>
                                </div>
                                <div class="faq-item">
                                    <div class="faq-q">What's the market size?</div>
                                    <div class="faq-a">₹15,150 Cr today → ₹35,000 Cr by 2030. CDC targets 3% = ₹1,000 Cr revenue</div>
                                </div>
                                <div class="faq-item">
                                    <div class="faq-q">Why invest now?</div>
                                    <div class="faq-a">10x growth in 3 years, market leader, capital-efficient model, scaling to 10+ stores</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="infographic-section">
                            <div class="info-label">📚 FAQ COVERS THESE TOPICS</div>
                            <div class="topics-visual">
                                <div class="topic-tag"><span>🏢</span> Company Overview</div>
                                <div class="topic-tag"><span>💼</span> Business Model</div>
                                <div class="topic-tag"><span>💰</span> Revenue & Financials</div>
                                <div class="topic-tag"><span>📊</span> Market Analysis</div>
                                <div class="topic-tag"><span>🏆</span> Competition</div>
                                <div class="topic-tag"><span>📈</span> Growth Strategy</div>
                                <div class="topic-tag"><span>🏪</span> Store Economics</div>
                                <div class="topic-tag"><span>💵</span> Funding Plans</div>
                                <div class="topic-tag"><span>👥</span> Team & Leadership</div>
                                <div class="topic-tag"><span>⚠️</span> Risk Factors</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- DOWNLOAD ALL SECTION -->
                <div class="download-all-section">
                    <div class="download-all-content">
                        <div class="download-all-icon">📁</div>
                        <div class="download-all-text">
                            <h3>Access Complete Data Room</h3>
                            <p>Open Google Drive folder with all documents - Pitch Deck, MIS, Financials, FAQ & more</p>
                        </div>
                        <a href="https://drive.google.com/drive/folders/1Y8seSfR-Lpy-ESndy08BE0kk0G4gElJ2" target="_blank" class="download-all-btn">
                            <i class="fas fa-external-link-alt"></i> Open Data Room
                        </a>
                    </div>
                </div>
            </section>
        </main>
    </div>
    
    <!-- Chatbot -->
    <div class="chatbot" id="chatbot">
        <div class="chatbot-header">
            <div class="chatbot-avatar"><i class="fas fa-robot"></i></div>
            <div class="chatbot-info">
                <div class="chatbot-title">CDC AI Assistant</div>
                <div class="chatbot-subtitle">Powered by Investor FAQ & Data Room</div>
            </div>
            <button class="chatbot-close" onclick="toggleChat()"><i class="fas fa-times"></i></button>
        </div>
        <div class="chatbot-messages" id="chatMessages">
            <div class="chat-msg bot">
                <div class="chat-bubble">👋 Hi! I'm your CDC Data Room AI Assistant. I have comprehensive knowledge about Crepdog Crew including business model, SOR strategy, financials, stores, market opportunity, competition, funding plans, and more. Ask me anything!</div>
            </div>
        </div>
        <div class="chat-suggestions">
            <div class="chat-suggestions-title">Suggested Questions</div>
            <button class="chat-btn" onclick="ask('What is CDC?')">About CDC</button>
            <button class="chat-btn" onclick="ask('Revenue and financials')">Financials</button>
            <button class="chat-btn" onclick="ask('What is SOR model?')">SOR Model</button>
            <button class="chat-btn" onclick="ask('How will funds be used?')">Funding</button>
            <button class="chat-btn" onclick="ask('Market opportunity')">Market</button>
            <button class="chat-btn" onclick="ask('Competition')">Competition</button>
        </div>
        <div class="chatbot-input">
            <input type="text" id="chatInput" placeholder="Ask about CDC..." onkeypress="if(event.key==='Enter')sendMsg()">
            <button onclick="sendMsg()"><i class="fas fa-paper-plane"></i></button>
        </div>
    </div>
    
    <button class="chat-fab" id="chatFab" onclick="toggleChat()"><i class="fas fa-comment-dots"></i></button>
    
    <script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script><script>
        // Mobile Menu Toggle
        function toggleMobileMenu() {
            const sidebar = document.querySelector('.sidebar');
            const overlay = document.getElementById('sidebarOverlay');
            const menuIcon = document.getElementById('menuIcon');
            
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
            
            if (sidebar.classList.contains('active')) {
                menuIcon.className = 'fas fa-times';
            } else {
                menuIcon.className = 'fas fa-bars';
            }
        }
        
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
                document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
                item.classList.add('active');
                document.getElementById(item.dataset.section).classList.add('active');
                
                // Close mobile menu on nav click
                if (window.innerWidth <= 768) {
                    toggleMobileMenu();
                }
            });
        });
        
        // Chat - Comprehensive Knowledge Base
        const qa = {
            // Company Overview
            overview: "Crepdog Crew (CDC) is India's premier destination for premium luxury lifestyle products, specializing in authenticated sneakers, streetwear, and accessories. Founded in 2019 as Instagram page, incorporated as Pvt Ltd in Sept 2022. We operate 3 stores (12,500 sqft) across Delhi, Mumbai & Hyderabad with 250,000+ active crew members.",
            mission: "Our mission: To be India's largest premium luxury lifestyle destination, providing transparent, curated, authenticated products to urban India. Key drivers: 100% authentication, no hidden markups, single platform for global & homegrown brands.",
            founders: "Three co-founders: Anchit Kapil (CEO, Lancaster + Summer House Cafe background), Shaurya Kumar (COO, LSE graduate), Bharat Mehrotra (CBO, Lancaster + Warwick). Combined 15+ years in retail, hospitality & finance.",
            
            // Business Model
            businessModel: "Dual-channel model: Retail (51% of revenue) + Online D2C (49%). We source from 50+ homegrown brands and vendor partners. Take rate: 18% for shoes, 37% for apparel = 22% blended gross margin. SOR (Sell or Return) model ensures zero inventory risk.",
            sor: "SOR (Sell Or Return) is our capital-efficient inventory model. Benefits: Zero upfront investment, no dead stock risk, exclusive access to premium drops, rapid scalability. Partners include FILA, CASIO for exclusive releases.",
            
            // Revenue & Financials
            revenue: "YTD FY'26 GMV: ₹93.3 Cr, Operating Revenue: ₹88.5 Cr. FY'25: ₹80 Cr, FY'24: ₹65 Cr, FY'23: ₹12.5 Cr. Targeting ₹120 Cr for FY'26. ARR (Annualized Run Rate): ₹188 Crore.",
            margin: "Gross Margin: 22% blended (Sneakers 18-20%, Streetwear 35-40%, Accessories 18-50%). Retail: 24% margin, Online: 21%. CM2: 9% company level. Retail EBITDA: 9%, Online: 3%.",
            profitability: "FY24 showed loss due to Mumbai store fire (May 2024) disrupting 2 months of operations. Improvement driven by operating leverage, retail expansion (higher EBITDA), and product mix optimization.",
            ratios: "Key Ratios FY24: Current Ratio 2.69, Debt-Equity 0.49, Inventory Turnover 26.53x, Net Capital Turnover 16.03, ROCE 5%. Healthy working capital cycle with 65-80 day inventory turns.",
            
            // Stores
            stores: "3 stores: Delhi (4,000 sqft, Feb 2022, flagship), Mumbai (2,500 sqft, May 2023), Hyderabad (3,700 sqft, Oct 2024). Total: 12,500 sqft. Monthly footfall: 9,000+, Conversion: 35%.",
            storeEconomics: "Store Economics: Investment ₹3-7.5 Cr per flagship, Payback 12-24 months, Target ROI 100% annually. Per store team: 1 SM, 1 AM, 6-7 Floor Captains, 1 Cashier (~10 employees).",
            expansion: "Expansion Roadmap: FY27 target 10 stores, FY30 target 20+ stores. Next cities: Bangalore, Pune, Kolkata, Chandigarh. Focus on Tier 1 & premium Tier 2 cities.",
            
            // Products
            products: "Product Mix: Sneakers 70%, Streetwear 25%, Accessories 5%. Future expansion to premium watches, bags, lifestyle products. Category expansion expected to add 20-30% revenue uplift.",
            aov: "AOV (Average Order Value): ₹12,500 overall. Retail: ₹15,000 (premium experience), Online: ₹10,500 (competitive pricing). Retail AOV higher due to browsing effect and convenience markup.",
            
            // Market
            market: "Indian premium lifestyle market: ₹15,150 Cr (2025) → ₹35,000 Cr by 2030 at 6.5% CAGR. CDC current share: 0.83%. Target: 3% market share = ₹1,000 Cr revenue by 2030.",
            customer: "Target Customer: Urban males 14-35 years, income ₹10-50 LPA, sneakerheads & streetwear enthusiasts. Tech-savvy, active on Instagram/TikTok. Values: authenticity, exclusivity, community.",
            
            // Competition
            competition: "CDC leads with ₹120 Cr revenue, 98% fulfillment, 99% authenticity. Competitors: Culture (₹50 Cr), Dawntown (₹40 Cr), MainStreet (₹25 Cr). Key differentiators: authentication, fulfillment, SOR model.",
            differentiators: "CDC Differentiators: 99% authenticity vs 60-80% competitors, 98% fulfillment vs 10-60%, Capital-efficient SOR model, 250K+ customers, industry-leading take rates, omnichannel presence.",
            
            // Funding
            funding: "Raising ₹40 Cr Pre-Series A. Allocation: Store Expansion ₹21 Cr (53%), Store Opex ₹8 Cr (20%), Inventory ₹6 Cr (15%), Marketing ₹3.5 Cr (9%), Team ₹1.5 Cr (3%). Series A planned: ₹160 Cr.",
            previousRounds: "Previous funding: ₹4 Cr Seed + ₹9.5 Cr Angel rounds. Total raised: ₹13.5 Cr. Current investors include strategic angels in retail and fashion.",
            
            // Online Strategy
            online: "Online Strategy: Current ROAS 11X at ₹35L/month spend. Target: Scale to 3-4X ROAS with higher volume. Channels: Instagram, Meta, WhatsApp. CAC: ₹1,000. Focus on experiential marketing via Zomaland, concerts.",
            
            // Risk & Resilience
            risk: "Market Risk Mitigation: 'Essential luxury' segment resilient in downturns. Diversified product mix beyond high-ticket items. SOR model transfers inventory risk to brand partners. Focus on trend-driven products.",
            
            // Team
            team: "100+ employees across retail and operations. Leadership: Anchit Kapil (CEO), Shaurya Kumar (COO), Bharat Mehrotra (CBO). Advisory from retail and fashion industry veterans."
        };
        
        function findAnswer(q) {
            const query = q.toLowerCase();
            // Company Overview
            if (query.match(/what is cdc|about cdc|company|crepdog/)) return qa.overview;
            if (query.match(/mission|vision|goal/)) return qa.mission;
            if (query.match(/founder|who started|leadership|anchit|shaurya|bharat/)) return qa.founders;
            
            // Business Model
            if (query.match(/business model|how.*work|model/)) return qa.businessModel;
            if (query.match(/sor|sell or return|consignment|inventory model/)) return qa.sor;
            
            // Financials
            if (query.match(/revenue|sales|gmv|arr|turnover/)) return qa.revenue;
            if (query.match(/margin|cm2|gross|ebitda/)) return qa.margin;
            if (query.match(/profit|loss|why loss|fy24 loss/)) return qa.profitability;
            if (query.match(/ratio|current ratio|debt|roce|financial ratio/)) return qa.ratios;
            
            // Stores
            if (query.match(/store|retail|delhi|mumbai|hyderabad|location/)) return qa.stores;
            if (query.match(/store economic|payback|roi|store cost/)) return qa.storeEconomics;
            if (query.match(/expansion|new store|roadmap|growth plan/)) return qa.expansion;
            
            // Products
            if (query.match(/product|category|sneaker|streetwear|shoe|apparel/)) return qa.products;
            if (query.match(/aov|order value|ticket size|average/)) return qa.aov;
            
            // Market
            if (query.match(/market|opportunity|tam|sam|som|cagr|size/)) return qa.market;
            if (query.match(/customer|target|demographic|audience|who buy/)) return qa.customer;
            
            // Competition
            if (query.match(/compet|vs|culture|dawntown|mainstreet|compare/)) return qa.competition;
            if (query.match(/differ|why cdc|usp|unique|advantage|authentic/)) return qa.differentiators;
            
            // Funding
            if (query.match(/fund|raise|invest|capital|series|alloc|use of/)) return qa.funding;
            if (query.match(/previous.*fund|seed|angel|raised so far/)) return qa.previousRounds;
            
            // Online
            if (query.match(/online|digital|ecommerce|roas|cac|marketing/)) return qa.online;
            
            // Risk
            if (query.match(/risk|downturn|crash|resilience|what if/)) return qa.risk;
            
            // Team
            if (query.match(/team|employee|people|staff/)) return qa.team;
            
            return "I can help with: company overview, business model, SOR strategy, revenue & financials, stores, products, market opportunity, competition, funding, online strategy, risk factors, or team. What would you like to know?";
        }
        
        function downloadAll() {
            const files = ['CDC_Pitch_Deck_Jan_2026.pdf', 'CDC_MIS_YTD_FY26.xlsx', 'CDC_Investor_FAQ.docx', 'CDC_Financial_Statement_FY24.pdf', 'CDC_Financial_Statement_FY23.pdf'];
            files.forEach((file, i) => {
                setTimeout(() => {
                    const a = document.createElement('a');
                    a.href = file;
                    a.download = file;
                    a.click();
                }, i * 500);
            });
        }
        
        function toggleChat() {
            document.getElementById('chatbot').classList.toggle('active');
            document.getElementById('chatFab').classList.toggle('hidden');
        }
        
        function addMsg(text, isUser) {
            const messages = document.getElementById('chatMessages');
            const msg = document.createElement('div');
            msg.className = `chat-msg ${isUser ? 'user' : 'bot'}`;
            msg.innerHTML = `<div class="chat-bubble">${text}</div>`;
            messages.appendChild(msg);
            messages.scrollTop = messages.scrollHeight;
        }
        
        function sendMsg() {
            const input = document.getElementById('chatInput');
            const text = input.value.trim();
            if (!text) return;
            addMsg(text, true);
            input.value = '';
            setTimeout(() => addMsg(findAnswer(text), false), 400);
        }
        
        function ask(q) {
            document.getElementById('chatInput').value = q;
            sendMsg();
        }
        
        // Charts
        const colors = {
            lime: '#C0E529',
            limeDark: '#9BBF1E',
            olive: '#6B8E23',
            oliveDark: '#4A5D23',
            oliveDarker: '#3D4A2B'
        };
        
        // Revenue Chart
        new Chart(document.getElementById('revenueChart'), {
            type: 'bar',
            data: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q1', 'Q2', 'Q3'],
                datasets: [{
                    label: 'Revenue (₹ Cr)',
                    data: [17.1, 17.4, 23.6, 21.7, 27.1, 28.4, 37.8],
                    backgroundColor: colors.lime,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: ctx => `₹${ctx.raw} Cr`,
                            afterLabel: (ctx) => {
                                const gm = ['22%', '22%', '21%', '21%', '23%', '22%', '18%'];
                                return `GM: ${gm[ctx.dataIndex]}`;
                            }
                        }
                    }
                },
                scales: {
                    x: { grid: { display: false }, ticks: { font: { weight: 'bold' } } },
                    y: { beginAtZero: true, ticks: { callback: v => `₹${v}` } }
                }
            }
        });
        
        // Channel Donut
        const channelDonutCtx = document.getElementById('channelDonut');
        new Chart(channelDonutCtx, {
            type: 'doughnut',
            data: {
                labels: ['Online', 'Retail'],
                datasets: [{
                    data: [41, 59],
                    backgroundColor: [colors.oliveDarker, colors.oliveDark],
                    borderWidth: 3,
                    borderColor: '#000'
                }]
            },
            options: { 
                responsive: true, 
                cutout: '65%', 
                plugins: { 
                    legend: { display: false },
                    tooltip: { enabled: true }
                }
            },
            plugins: [{
                id: 'doughnutLabels',
                afterDraw: function(chart) {
                    const ctx = chart.ctx;
                    const meta = chart.getDatasetMeta(0);
                    
                    meta.data.forEach((arc, index) => {
                        const data = chart.data.datasets[0].data[index];
                        const centerAngle = (arc.startAngle + arc.endAngle) / 2;
                        const radius = (arc.innerRadius + arc.outerRadius) / 2;
                        const x = arc.x + Math.cos(centerAngle) * radius;
                        const y = arc.y + Math.sin(centerAngle) * radius;
                        
                        ctx.save();
                        ctx.font = 'bold 16px Inter';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillStyle = index === 1 ? '#FFFFFF' : '#FFFFFF';
                        ctx.fillText(data + '%', x, y);
                        ctx.restore();
                    });
                }
            }]
        });
        
        // Online Donut
        new Chart(document.getElementById('onlineDonut'), {
            type: 'doughnut',
            data: {
                labels: ['Shoes', 'Apparel'],
                datasets: [{ data: [92, 8], backgroundColor: [colors.oliveDarker, colors.oliveDark], borderWidth: 2, borderColor: '#000' }]
            },
            options: { responsive: true, cutout: '55%', plugins: { legend: { display: false } } }
        });
        
        // Retail Donut
        new Chart(document.getElementById('retailDonut'), {
            type: 'doughnut',
            data: {
                labels: ['Shoes', 'Apparel'],
                datasets: [{ data: [75, 25], backgroundColor: [colors.oliveDarker, colors.oliveDark], borderWidth: 2, borderColor: '#000' }]
            },
            options: { responsive: true, cutout: '55%', plugins: { legend: { display: false } } }
        });
        
        // Channel Trend
        new Chart(document.getElementById('channelTrendChart'), {
            type: 'bar',
            data: {
                labels: ["FY'25 Q1", "Q2", "Q3", "Q4", "FY'26 Q1", "Q2", "Q3"],
                datasets: [
                    { label: 'Online', data: [9.31, 8.32, 11.78, 11.08, 12.76, 14.0, 21.0], backgroundColor: colors.oliveDark, borderRadius: 4 },
                    { label: 'Retail', data: [7.79, 9.08, 11.82, 10.62, 14.34, 14.4, 16.8], backgroundColor: colors.lime, borderRadius: 4 }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } },
                scales: {
                    x: { stacked: true, grid: { display: false } },
                    y: { stacked: true, beginAtZero: true, ticks: { callback: v => `₹${v}` } }
                }
            }
        });
        
        // Store Chart
        new Chart(document.getElementById('storeChart'), {
            type: 'bar',
            data: {
                labels: ["FY'25 Q1", "FY'25 Q2", "FY'25 Q3", "FY'25 Q4", "FY'26 Q1", "FY'26 Q2", "FY'26 Q3"],
                datasets: [
                    { label: 'Delhi', data: [5.65, 4.51, 4.67, 3.92, 5.91, 5.34, 6.52], backgroundColor: colors.lime, borderRadius: 4 },
                    { label: 'Mumbai', data: [2.08, 4.56, 4.22, 2.84, 4.61, 4.66, 5.40], backgroundColor: colors.oliveDark, borderRadius: 4 },
                    { label: 'Hyderabad', data: [0, 0, 0, 2.94, 3.82, 3.80, 4.61], backgroundColor: colors.oliveDarker, borderRadius: 4 }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } },
                scales: {
                    x: { grid: { display: false } },
                    y: { beginAtZero: true, ticks: { callback: v => `₹${v}` } }
                }
            }
        });
        
        // Funding Donut
        new Chart(document.getElementById('fundingDonut'), {
            type: 'doughnut',
            data: {
                labels: ['Store Expansion', 'Store Opex', 'Inventory', 'Marketing', 'Team'],
                datasets: [{
                    data: [21, 8, 6, 3.5, 1.5],
                    backgroundColor: [colors.oliveDarker, colors.oliveDark, colors.olive, colors.limeDark, colors.lime],
                    borderWidth: 0
                }]
            },
            options: { responsive: true, cutout: '55%', plugins: { legend: { display: false } } }
        });
        
        // Expansion Chart
        new Chart(document.getElementById('expansionChart'), {
            type: 'bar',
            data: {
                labels: ['Delhi NCR', 'Mumbai', 'Hyderabad', 'Bangalore', 'Ahmedabad', 'Chandigarh'],
                datasets: [
                    { label: '2025', data: [4000, 2500, 3700, 0, 0, 0], backgroundColor: colors.oliveDarker, borderRadius: 4 },
                    { label: '2027', data: [6500, 7500, 3700, 15000, 0, 0], backgroundColor: colors.oliveDark, borderRadius: 4 },
                    { label: '2030', data: [30000, 30000, 3700, 30000, 3000, 3000], backgroundColor: colors.lime, borderRadius: 4 }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } },
                scales: {
                    x: { stacked: true, grid: { display: false } },
                    y: { stacked: true, beginAtZero: true, ticks: { callback: v => `${v/1000}K sqft` } }
                }
            }
        });
    </script>
</body>
</html>
