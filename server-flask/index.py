from urllib import response
from flask import Flask ,request
import time
import atexit
from apscheduler.schedulers.background import BackgroundScheduler
from flask_cors import CORS,cross_origin
import requests
import os
from flask_sslify import SSLify


# def print_date_time():
#     print(time.strftime("%A, %d. %B %Y %I:%M:%S %p"))

display=[]

def print_Hi():
    print("Hi")


scheduler = BackgroundScheduler()
scheduler.add_job(func=print_Hi, trigger="interval", minutes = 60)
scheduler.start()


# Shut down the scheduler when exiting the app
atexit.register(lambda: scheduler.shutdown())
ASSETS_DIR = os.path.dirname(os.path.abspath(__file__))
app = Flask('backgroundScheduler')

cors =  CORS(app)


# app.url_map.strict_slashes = False
# CORS(app, origins="*", allow_headers=["Content-Type", "Authorization", "Access-Control-Allow-Credentials"],supports_credentials=True)
# SSLify(app)
# app.config['CORS_HEADERS'] = ['Content-Type','Authorization']
# app.config['SWAGGER'] = {
#     'title': 'STARS.AI APIs'
# }

@app.route('/scheduler',methods=['GET'])
def scheduleHi():
    display.append("Hi")
    return {"display": display}

@app.route('/python',methods=['GET'])
def bgSchduler():
    value= {"details":"Hi"}
    return value

@app.route('/py',methods=['GET'])
def newEffect():
    return {"details":"New Endpoint Says Hi"}

@app.route('/pyt',methods=['GET','POST'])
def newEffectPost():
    return {"detailing" : "This is post method!"}

@app.route('/test',methods=['POST'])
def callBatchApi():
    # print("headers->",request.headers)
    # print("body->",request.json['body'])
    r=requests.post(url='https://sit-dsmbrsvc.anthem.com/dsstarsai/v2/api/eds/batch',headers=request.headers,json=request.json['body'])
    print(r.json)
    return r.json


if __name__ == '__main__':
    context=('C:/Users/AL03988/OneDrive - Elevance Health/Desktop/usecase/server-nodeJS/certs/app.crt','C:/Users/AL03988/OneDrive - Elevance Health/Desktop/usecase/server-nodeJS/certs/app.key')
    
    app.run(debug=True,ssl_context= context)
   

