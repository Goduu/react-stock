
from flask import Flask

app = Flask(__name__,
        static_folder="./dist/static/",
        template_folder="./dist/")
app.config.from_object(__name__)
