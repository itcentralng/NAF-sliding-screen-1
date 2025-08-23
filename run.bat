@echo off
:: Start the Flask app
start "" python main.py
timeout /t 5 /nobreak

:: Uncomment the line below if you prefer to use Microsoft Edge
start "" "msedge" --app=http://127.0.0.1:5550