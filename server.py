#####################################################
## Parse Args
#####################################################
import argparse

parser = argparse.ArgumentParser(description='server manager')
parser.add_argument("--mode", dest='mode', type=str, default="run", 
	                help='''options are: run, debug, init''')

args = parser.parse_args()

#####################################################
## Define Constants
#####################################################
import os
import sqlite3 as sql

TOP = os.path.dirname( __file__ )
JACK_DB = os.path.join(TOP, "jack.db")

#####################################################
## Handle mode="init"
#####################################################
if args.mode=="init":
	# Remove file if it exists
	if os.path.isfile(JACK_DB):
		os.remove(JACK_DB)

	# Connect
	conn = sql.connect(JACK_DB)
	c = conn.cursor()

	# Create jacks table
	c.execute('''CREATE TABLE jacks (username text, password text, lat real, lon real)''')
	conn.commit()

	# Add some jacks
	c.execute('''INSERT INTO jacks VALUES ("sev", "password", 1.1, 2.1),
		                                  ("dan", "password", 1.2, 2.2),
		                                  ("claire", "password", 1.3, 2.3)''')
	conn.commit()

	# Create jobs table
	c.execute('''CREATE TABLE jobs (username text, lat real, lon real, job text, reward real)''')
	conn.commit()

	# Add some users
	c.execute('''INSERT INTO jobs VALUES ("mom", 1.5, 2.5, "take out the trash", 5.0),
		                                 ("dad", 1.6, 2.6, "mow my lawn", 20.0)''')
	conn.commit()

	# Done making table
	conn.close()
	exit()

#####################################################
## Define Server
#####################################################
from flask import Flask, render_template
from datetime import datetime

class CustomFlask(Flask):
  jinja_options = Flask.jinja_options.copy()
  jinja_options.update(dict(
    block_start_string='(%',
    block_end_string='%)',
    variable_start_string='((',
    variable_end_string='))',
    comment_start_string='(#',
    comment_end_string='#)',
  ))
app = CustomFlask("__main__")

### Index page
@app.route("/")
def index():
    return render_template("index.html", date=datetime.now())


#####################################################
## Start server if in debug mode
#####################################################
if args.mode.lower()=="debug":
	app.run(port=8888, host="0.0.0.0")