# Kleinanzeigen Message Sender

A Streamlit application for automating messages to apartment listings on Kleinanzeigen.

## Features

- **Bulk Message Sending**: Send messages to multiple apartment listings from different search URLs
- **Information View**: View and filter all previously contacted listings
- **Automatic Tracking**: The app tracks all contacted listings to avoid duplication
- **Manual Login**: Secure login process through terminal input
- **Customizable Messages**: Template-based messaging with dynamic name and city placeholders
- **Random Delays**: Configurable random delays between messages to avoid detection

## Installation

1. Clone this repository
2. Install the requirements: (Only for first time)

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

### Customizing Message Template

The application uses a template-based messaging system that automatically personalizes messages for each listing:

1. Open the `message.txt` file in the project root directory
2. Edit the message content as needed
3. Use the following placeholders that will be automatically replaced:
   - `{name}` - Will be replaced with the listing owner's name
   - `{city}` - Will be replaced with the city name you specify in the app

Example message template:
```
Hallo {name},

Nur ein Tipp von mir, der mir geholfen hat, in zwei Wochen eine Wohnung in {city} zu finden. Ich habe die Internetseite Immohero24.com benutzt. Ich kann dir nur empfehlen, sie auszuprobieren. Viel Glück beim Suchen!

~ Felix. M
```

When processed, this template will insert the ad owner's name and your specified city automatically.

### Message Delay Settings

To avoid detection and make the messaging pattern more natural, you can configure random delays between messages:

1. In the "Bulk Message Sender" section, find the "Message Delay Settings"
2. Enable/disable random delays using the checkbox
3. If enabled, set:
   - Minimum delay (1-60 seconds)
   - Maximum delay (must be greater than minimum, up to 120 seconds)
4. The system will wait for a random time between these values after each message

### Manual Login Process

When you start the scraper:
1. A Chrome browser window will open with Kleinanzeigen login page
2. A prompt will appear in your terminal (command prompt/PowerShell/Terminal)
3. Log in to your account in the browser window
4. After successful login, return to the terminal and press Enter
5. The scraping process will continue automatically

### Bulk Message Sender

1. Select "Bulk Message" from the sidebar
2. Configure message delay settings (optional)
3. Enter the search URLs and city names
4. Click the "+" button to add more URLs
5. Click "Run Scraper" to start the process

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