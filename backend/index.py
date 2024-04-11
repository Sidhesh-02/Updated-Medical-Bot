import jsons
import json
import os 
import hashlib
import datetime
from dotenv import load_dotenv
from flask import Flask , request ,jsonify 
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from prisma import Prisma
from  model  import final_result
from flask_cors import CORS

app = Flask(__name__)
load_dotenv()

# Configure CORS
CORS(app, origins="*",supports_credentials=True)

# Configure Flask JWT
jwt = JWTManager(app)
JWT_SECRET_KEY = os.getenv('JWT_KEY')
app.config['JWT_SECRET_KEY'] = JWT_SECRET_KEY
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(days=1)

# Confiigure Postgres
db = Prisma()
db.connect()

# Routes
@app.route("/signup", methods=["POST"])
def register():
    new_user = request.get_json()  # store the json body request
    # Hash the password
    new_user["password"] = hashlib.sha256(new_user['password'].encode("utf-8")).hexdigest()
    
    existing_user = db.user.find_unique(
        where = {
            "username": new_user["username"],
            "email": new_user["email"]
        }
    )
    if not existing_user:
        db.user.create(new_user)
        return jsonify({'msg': 'User created successfully'}), 201
    else:
        return jsonify({'msg': 'Username or Email already exists'}), 409

@app.route("/login", methods=["POST"])    
def login():
    login_details = request.get_json()
    # Check if the login information is provided
    if 'email' not in login_details or 'password' not in login_details:
        return jsonify({'msg': 'Invalid login details'}), 400
    
    # Query the database based on email
    user_from_db = db.user.find_first(where={'email': login_details['email']})
    if user_from_db:
        encrypted_password = hashlib.sha256(login_details['password'].encode("utf-8")).hexdigest()
        if encrypted_password == user_from_db.password:
            access_token = create_access_token(identity=user_from_db.email)
            db.user.update(
                where={'email': login_details['email']},
                data = {'accesstoken': access_token}
            )
            db.loginsession.create(data={})
            
            return jsonify({'access_token': access_token, 'redirect_url': '/interface'}), 200

    return jsonify({'msg': 'The email or password is incorrect'}), 401

@app.route("/", methods=["POST"])
@jwt_required
def profile():
    current_user = get_jwt_identity()
    user_from_db = db.user.find_unique({'username':current_user})
    if user_from_db:
        del user_from_db['id'], user_from_db['password']
        return jsonify({'profile' : user_from_db}), 200
    else:
        return jsonify({'msg': 'Profile not found'}), 404

@app.route('/data',methods=['POST'])
def query_parsing():
    if request.method == 'POST':
        data = request.data.decode('utf-8')
        print("Question Asked : ",data)
        res = jsons.dump(final_result(data))
        return res

@app.route('/history/<object_id>', methods=['POST','PUT'])
def history(object_id):
    if request.method == 'POST':
        info = request.data.decode('utf-8')
        data_dict = json.loads(info) 
        db.page.create(
            {
                'sourceid': data_dict['sourceid'],
                'response': data_dict['response'],
                'finalQuestion': data_dict['finalQuestion'],
            }
        )
        return "page created"
    elif request.method == 'PUT':
        page_details = request.get_json()
        db.page.update(
            where={"sourceid": object_id}, 
            data={
                'response': page_details['response'],
                'finalQuestion': page_details['finalQuestion']
            }
        )
        return "page updated"

@app.route('/history', methods=['GET'])
def gethistory():
    if request.method == 'GET':
        page_instances = db.page.find_many()
        page_list = []

        for page_instance in page_instances:
            page_dict = {
                'finalque': page_instance.finalQuestion,
                'response': page_instance.response
            }
            page_list.append(page_dict)

        return jsonify(page_list)
    else:
        return jsonify({'error': 'No history found for the specified object ID'})

if __name__ == '__main__':
    app.run(debug=False)


