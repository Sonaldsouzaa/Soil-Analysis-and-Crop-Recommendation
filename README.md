# Soil-Analysis-and-Crop-Recommendation
Description

This project is an AI-driven soil analysis and crop recommendation system that utilizes IoT sensors and machine learning to help farmers select the most suitable crops based on soil conditions. The system collects real-time soil data using advanced sensors and processes it with a machine learning model to generate recommendations.

Features

Collects Soil Data: Measures NPK, pH, humidity, temperature, and rainfall.  
AI-Based Recommendations: Uses machine learning to suggest the best crops.  
IoT Integration: Uses ESP32 to transmit data to the cloud.  
User-Friendly Interface: Farmers can access insights through a web app.  
Fast and Accurate Processing: Ensures timely and precise crop suggestions.  

Installation
1. Hardware Requirements:
ESP32 Microcontroller, 
DHT11 (Temperature & Humidity Sensor), 
NPK Sensor, 
pH Sensor, 
Rainfall Sensor, 
Power Supply (12V 1A)

2. Software Requirements:
Python 3.x, 
Flask, 
scikit-learn, 
Arduino IDE (for ESP32 programming), 
Blynk IoT platform setup

Setup Instructions

1. Clone the Repository  
git clone https://github.com/your-repo-name.git  
cd your-repo-name  
2. Install Dependencies  
pip install -r requirements.txt  
3. Upload Arduino Code  
Open arduino_code.ino in Arduino IDE  
Select ESP32 board and configure Wi-Fi credentials  
Upload the code to ESP32  
4. Run the Flask Application  
python app.py  
5. Access the Web Interface  
Open http://localhost:5000 in a browser.  

Usage

Step 1: Sensors collect real-time soil data.  
Step 2: ESP32 transmits data to Blynk IoT.  
Step 3: Machine learning model processes data and predicts the best crop.  
Step 4: Recommendations are displayed on the Flask web app.

Testing & Results

Accuracy Reports: Evaluates the model's performance with real-world soil data.  
Classification Metrics: Includes precision, recall, F1-score, and confusion matrix.  
UI Snapshots: Displays sensor data, Blynk IoT integration, and crop recommendations.  

Future Scope

Scalability: Expand system to cover more crops and soil types.  
Additional Features: Improve sensor integration, data analytics, and user interface.  
Enhancements: Optimize machine learning models for better prediction accuracy.

Contributors

Abhin S Shetty - Mangalore Institute of Technology & Engineering  
Deeksha Kamath - Mangalore Institute of Technology & Engineering  
Joyvi Rodrigues - Mangalore Institute of Technology & Engineering  
Sonal Dsouza - Mangalore Institute of Technology & Engineering
