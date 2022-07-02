import os
import json
from flask import Flask, request, session
from werkzeug.utils import secure_filename
from flask_cors import CORS

import numpy as np
from keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array


UPLOAD_FOLDER = 'src/uploads'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)
CORS(app)

# Define a route to fetch the avaialable articles

def predictResult(filepath):
    
    model = load_model('best_weights.hdf5')

    img = load_img(filepath, target_size=(224,224))
    img = img_to_array(img)
    img = img / 255
    img = np.expand_dims(img,axis=0)
    answer = model.predict(img)
    result = str()
    if answer[0][0] > 0.5:
        result = "The image belongs to Non Biodegradable waste"
    else:
        result = "The image belongs to Biodegradable waste"

    return result


@app.route('/upload', methods=['POST'])

def fileUpload():

    target = UPLOAD_FOLDER
    if not os.path.isdir(target):
        os.mkdir(target)
    else:
        for filename in os.listdir(target):
            file_path = os.path.join(target, filename)
            try:
                os.unlink(file_path)
            except Exception as e:
                print('Failed to delete %s. Reason: %s' % (file_path, e))

    file = request.files['file'] 
    filename = secure_filename(file.filename)
    destination="/".join([target, filename])
    file.save(destination)

    result = predictResult(destination)
    
    output = {
        "result": result,
        "fileName": destination
    }
    # print(output)

    return output


if __name__ == "__main__":
    app.run(debug=True)