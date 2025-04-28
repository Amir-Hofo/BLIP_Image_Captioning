from model import *

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/generate_caption', methods=['POST'])
def generate_caption():
    caption = call_model()
    return caption