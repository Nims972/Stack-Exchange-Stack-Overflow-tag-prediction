#!/usr/bin/env python
# coding: utf-8

# In[1]:


import numpy as np
import pandas as pd
import pickle
import os
from sklearn.externals import joblib


# In[2]:


model = open("model.pkl","rb")
clf = joblib.load(model)


# In[3]:


tags_p = open("tags.pkl","rb")
tags = joblib.load(tags_p)


# In[4]:


tf_p = open("tf.pkl","rb")
tf = joblib.load(tf_p)


# In[5]:


import nltk
import re
from nltk.corpus import stopwords
REPLACE_BY_SPACE_RE = re.compile('[/(){}\[\]\|@,;]')
BAD_SYMBOLS_RE = re.compile('[^0-9a-z #+_]')
STOPWORDS = set(stopwords.words('english'))

def text_prepare(text):
    text = text.lower()
    text = REPLACE_BY_SPACE_RE.sub(' ', text)
    text = BAD_SYMBOLS_RE.sub('', text)
    text = ' '.join(word for word in text.split() if word not in STOPWORDS)
    return text


# In[7]:


que = ['How do I stop pasta from clumping/sticking together?','What is a stick of butter?','how to do tadka in daal?', 'how to make chocolate brownie?']
que = [text_prepare(i) for i in que]
# que = [que]
que = tf.transform(que)
yp = clf.predict(que)
print(tags.inverse_transform(yp))


# In[9]:


from flask import Flask, render_template, request,flash,jsonify
app = Flask(__name__)
@app.route('/<string:que>')
def index(que):
    print(que)
    que = [que]
    que = [text_prepare(i) for i in que]
    print("after prepare")
    print(que)
    que = tf.transform(que)
    yp = clf.predict(que)
    pred = tags.inverse_transform(yp)
    data = []
    for i in range(len(pred[0])):
        data.append(pred[0][i])
    #print(tags.inverse_transform(yp)[0][0],len(tags.inverse_transform(yp)[0]))
    res = {'tags' : data}
    return jsonify(res)
    #return render_template('layout.html', tags=(tags.inverse_transform(yp)))

if __name__ == '__main__':
    app.run()


# In[ ]:





# In[ ]:




