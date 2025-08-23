import re
import os
import time
from flask import Flask, render_template
from flask_socketio import SocketIO
import serial
import threading

import dotenv

dotenv.load_dotenv()

app = Flask(__name__)
app.config["SECRET_KEY"] = "secret!"
socketio = SocketIO(app, cors_allowed_origins="*")

# Configure the serial connection
arduino = serial.Serial(os.getenv("BOARD_ID"), 9600, timeout=1)
time.sleep(2)  # Wait for connection to establish


def send_to_arduino():
    try:
        while True:
            # Get text input from user
            text_to_send = input("Enter text to send to Arduino: ")
            
            # Send text to Arduino
            arduino.write(text_to_send.encode())
            
            # Optional: Read response from Arduino
            if arduino.in_waiting > 0:
                response = arduino.readline().decode().strip()
                print(f"Arduino response: {response}")
            
            time.sleep(0.1)
    except KeyboardInterrupt:
        print("Exiting...")
    finally:
        arduino.close()


@app.route("/")
def main():
    return render_template("welcome.html")


if __name__ == "__main__":
    # Run the serial reading in a separate thread
    serial_thread = threading.Thread(target=send_to_arduino)
    serial_thread.daemon = True
    serial_thread.start()
    # Start the Flask app with WebSocket support
    socketio.run(app, host="0.0.0.0", port=5550)
