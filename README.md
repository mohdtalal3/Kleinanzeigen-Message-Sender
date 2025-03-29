# Kleinanzeigen Message Sender

A Streamlit application for automating messages to apartment listings on Kleinanzeigen.

## Features

- **Bulk Message Sending**: Send messages to multiple apartment listings from different search URLs
- **Information View**: View and filter all previously contacted listings
- **Automatic Tracking**: The app tracks all contacted listings to avoid duplication

## Installation

1. Clone this repository
2. Install the requirements:

   **For Windows:**
   ```
   pip install -r requirements.txt
   ```

   **For Mac:**
   ```
   pip3 install -r requirements.txt
   ```

3. Make sure Chrome browser is installed on your system

## Usage

### Running the Application

**For Windows:**
```
streamlit run app.py
```

**For Mac:**
```
python3 -m streamlit run app.py
```

### Bulk Message Sender

1. Select "Bulk Message" from the sidebar
2. Enter the search URLs and city names
3. Click the "+" button to add more URLs
4. Click "Run Scraper" to start the process

### Information View

1. Select "View Information" from the sidebar
2. Use the date range calendar to filter by date
3. Use the city filter to view listings from specific cities
4. Download the filtered data as CSV if needed

## Captcha Solver Setup

If you encounter captchas during the scraping process, you'll need to set up a captcha solving service:

1. Sign up for a captcha solving service (like CapSolver.)
2. Get your API key from the service
3. Navigate to the extension folder in the project directory
4. Create or edit the file `extension\cap_solver_api.txt` and add your API key:
   ```
   YOUR_API_KEY_HERE
   ```
5. Save the file and restart the application

## File Structure

- `app.py` - Main Streamlit application
- `utils.py` - Helper functions for message filling and data handling
- `message.txt` - Template for messages (supports {name} and {city} placeholders)
- `ad_id.json` - Database of processed ads (created automatically)
- `extension/cap_solver_api.txt` - File containing your captcha solver API key 