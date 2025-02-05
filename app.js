from flask import Flask, request, render_template, jsonify
import numpy as np
import pickle
import requests  # To interact with the Blynk API

# Load the model and scaler for crop prediction
model = pickle.load(open('model.pkl', 'rb'))
ms = pickle.load(open('minmaxscaler.pkl', 'rb'))

# Blynk configuration
BLYNK_AUTH = "nUzF85mb0M3fQNRmoiHMEyuoZILJzMxn"
# Replace with your Blynk Auth Token

# Create Flask app
app = Flask(_name_)

# Home route to render the crop prediction form
@app.route('/')
def index():
    return render_template("index.html")

# Crop prediction route
@app.route("/predict", methods=['POST'])
def predict():
    try:
        N = float(request.form['Nitrogen'])
        P = float(request.form['Phosporus'])
        K = float(request.form['Potassium'])
        temp = float(request.form['Temperature'])
        humidity = float(request.form['Humidity'])
        ph = float(request.form['Ph'])
        rainfall = float(request.form['Rainfall'])

        feature_list = [N, P, K, temp, humidity, ph, rainfall]
        single_pred = np.array(feature_list).reshape(1, -1)

        # Scale the features and make a prediction
        final_feature = ms.transform(single_pred)
        final_features = np.nan_to_num(final_feature)
        prediction = model.predict(final_features)

        # Map prediction to crop name
        crop_dict = {1: "Rice", 2: "Maize", 3: "Jute", 4: "Cotton", 5: "Coconut", 6: "Papaya",
                     7: "Orange", 8: "Apple", 9: "Muskmelon", 10: "Watermelon", 11: "Grapes",
                     12: "Mango", 13: "Banana", 14: "Pomegranate", 15: "Lentil", 16: "Blackgram",
                     17: "Mungbean", 18: "Mothbeans", 19: "Pigeonpeas", 20: "Kidneybeans",
                     21: "Chickpea", 22: "Coffee"}

        if prediction[0] in crop_dict:
            crop = crop_dict[prediction[0]]
            result = "{} is the best crop to be cultivated right there.".format(crop)
        else:
            result = "Sorry, we could not determine the best crop with the provided data."
    except Exception as e:
        result = f"Error occurred: {e}"

    return render_template('index.html', result=result)

# Function to send data to Blynk
def send_to_blynk(pin, value):
    try:
        url = f"http://blynk-cloud.com/{BLYNK_AUTH}/update/{pin}"
        response = requests.get(url, params={'value': value})
        if response.status_code == 200:
            print(f"Successfully sent data to Blynk: Pin {pin}, Value: {value}")
        else:
            print(f"Failed to send data to Blynk: {response.status_code}")
    except Exception as e:
        print(f"Error sending data to Blynk: {e}")

# Sensor data reception route
@app.route('/sensor-data', methods=['POST'])
def receive_sensor_data():
    try:
        data = request.get_json()
        N = data['Nitrogen']
        P = data['Phosporus']
        K = data['Potassium']
        temp = data['Temperature']
        humidity = data['Humidity']
        ph = data['Ph']
        rainfall = data['Rainfall']

        # Log the received data
        print(f"Received Sensor Data -> N: {N}, P: {P}, K: {K}, Temp: {temp}°C, Humidity: {humidity}%, pH: {ph}, Rainfall: {rainfall}mm")

        # Perform prediction
        feature_list = [N, P, K, temp, humidity, ph, rainfall]
        single_pred = np.array(feature_list).reshape(1, -1)
        final_feature = ms.transform(single_pred)
        final_features = np.nan_to_num(final_feature)
        prediction = model.predict(final_features)

        # Map prediction to crop name
        crop_dict = {1: "Rice", 2: "Maize", 3: "Jute", 4: "Cotton", 5: "Coconut", 6: "Papaya",
                     7: "Orange", 8: "Apple", 9: "Muskmelon", 10: "Watermelon", 11: "Grapes",
                     12: "Mango", 13: "Banana", 14: "Pomegranate", 15: "Lentil", 16: "Blackgram",
                     17: "Mungbean", 18: "Mothbeans", 19: "Pigeonpeas", 20: "Kidneybeans",
                     21: "Chickpea", 22: "Coffee"}

        crop = crop_dict.get(prediction[0], "Unknown Crop")

        # Send prediction result to Blynk (e.g., Virtual Pin V1)
        send_to_blynk("V1", crop)

        # Respond to the ESP32
        return jsonify({"message": "Data received successfully!", "prediction": crop}), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"message": "Error receiving data"}), 400

# Run the Flask app
if _name_ == '_main_':
    app.run(host='0.0.0.0', port=5000, debug=True)