from model import *

app= Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/generate_caption', methods= ['POST'])
def generate_caption():
    if 'image' in request.files:
        file= request.files['image']
        image_data= file.read()
        caption= call_model("./model/token.txt", image_data)
        return caption