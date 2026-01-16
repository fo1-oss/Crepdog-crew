# Google Sheets Data Integration Template

This document describes how to set up a Google Sheet to dynamically update the CDC Investor Portal data cards.

## Quick Setup

1. **Create a new Google Sheet** at [sheets.google.com](https://sheets.google.com)
2. **Create 4 tabs** with the exact names below
3. **Copy the data structure** from each section
4. **Publish to web**: File → Share → Publish to web → Entire Document → Publish
5. **Copy Sheet ID** from URL: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`
6. **Add to webapp**: Create `.env` file with `VITE_GOOGLE_SHEET_ID=your_sheet_id`

---

## Tab 1: "Metrics" (Main KPIs)

| Column A (Key)     | Column B (Value) | Description                    |
| ------------------ | ---------------- | ------------------------------ |
| company_name       | Crepdog Crew     | Company name                   |
| founded            | 2020             | Year founded                   |
| total_employees    | 100+             | Team size display              |
| total_customers    | 3,00,000+        | Total customers (LTD)          |
| store_count        | 5                | Number of stores               |
| arr                | 188              | Annual Recurring Revenue (Cr)  |
| ytd_revenue        | 94               | YTD Revenue FY26 (Cr)          |
| gross_margin       | 53               | Gross Margin % (YTD FY26)      |
| cm2                | 9                | CM2 % (YTD FY26)               |
| aov_overall        | 4200             | Average Order Value (Overall)  |
| aov_online         | 3800             | AOV - Online channel           |
| aov_retail         | 6000             | AOV - Retail channel           |

---

## Tab 2: "Revenue" (Historical Data)

| Column A (Key) | Column B (Value) | Description               |
| -------------- | ---------------- | ------------------------- |
| fy23_revenue   | 52               | FY23 Revenue (Cr)         |
| fy24_revenue   | 113              | FY24 Revenue (Cr)         |
| fy25_revenue   | 141              | FY25 Revenue (Cr)         |
| fy26_revenue   | 188              | FY26 Revenue (Cr) - ARR   |
| fy23_margin    | 43               | FY23 Gross Margin %       |
| fy24_margin    | 46               | FY24 Gross Margin %       |
| fy25_margin    | 50               | FY25 Gross Margin %       |
| fy26_margin    | 53               | FY26 Gross Margin %       |

---

## Tab 3: "Stores" (Store Metrics)

| Column A (Key)    | Column B (Value) | Description              |
| ----------------- | ---------------- | ------------------------ |
| monthly_billings  | 11,400 orders    | Monthly billing count    |
| revenue_per_sqft  | ₹6,000           | Revenue per square foot  |
| retention_rate    | 30%              | Customer retention (YTD) |

---

## Tab 4: "Team" (Team Data)

| Column A (Key)   | Column B (Value) | Description       |
| ---------------- | ---------------- | ----------------- |
| total_size       | 100+             | Total team size   |
| tech_team        | 15               | Tech team members |
| operations_team  | 50               | Ops team members  |

---

## Example Google Sheet Layout

Your sheet should look like this:

```
┌─────────────────────┬─────────────────┐
│ Metrics (Tab 1)     │                 │
├─────────────────────┼─────────────────┤
│ company_name        │ Crepdog Crew    │
│ founded             │ 2020            │
│ total_employees     │ 100+            │
│ total_customers     │ 3,00,000+       │
│ store_count         │ 5               │
│ arr                 │ 188             │
│ ytd_revenue         │ 94              │
│ gross_margin        │ 53              │
│ cm2                 │ 9               │
│ aov_overall         │ 4200            │
│ aov_online          │ 3800            │
│ aov_retail          │ 6000            │
└─────────────────────┴─────────────────┘
```

---

## Important Notes

1. **Column A must contain the exact key names** as shown above (case-sensitive)
2. **Column B contains the values** you want to display
3. **Numeric values** should be numbers only (no currency symbols for arr, revenue, margins)
4. **The sheet must be published to web** for the webapp to access it
5. **Changes reflect automatically** when you refresh the webapp (or click the refresh button)

---

## Updating Data

To update data in the webapp:

1. Open your Google Sheet
2. Change any value in Column B
3. Save (automatic in Google Sheets)
4. Refresh the webapp or click the "Refresh Data" button

The webapp fetches fresh data from Google Sheets each time it loads or when you manually refresh.
