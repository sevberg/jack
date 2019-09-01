#!/usr/bin/python

import mysql.connector as mc
import requests
from time import sleep
from datetime import datetime as dt

############### Send msg Function ###############
def send_message(msg, sub):
    print("Sending Message")
    return requests.post(
        "https://api.mailgun.net/v3/sandboxb7cc3744e4cd46aab37a90c5946dd4a4.mailgun.org/messages",
        auth=("api", "key-40fec02026b38ca2fa87737c340541c8"),
        data={"from": "EMJ Request Notifier <postmaster@sandboxb7cc3744e4cd46aab37a90c5946dd4a4.mailgun.org>",
              "to": "EMJ Master <dryberg87@gmail.com>",
              "subject": sub,
              "text": msg})

############# Setup mysql connection ##############

cnx = mc.connect(   user='emj', 
                    password='password',
                    host='127.0.0.1',
                    database='everymanjack')

csr = cnx.cursor(dictionary=True)

############# BEGIN MAIN SCRIPT ####################

while(True):

	cnx.commit();
	## Open the cursor

	################################################
	## Action for Requests table
        ################################################

	## Check the database for unnotified requests
	q = "select * from requests where notified=False;"
	csr.execute( q )

	results = csr.fetchall()

	## Check for no results, if true skip to sleep
	if( len(results) > 0 ):

		sub = ""
		msg = ""
		order = ['name','job_type', 'address', 'contact', 'description', '', '', 'id', 'created', 'ip_addr']
		## Notify that theere are new requests
		if(len(results) == 1):
			sub = "1 new request!"
		else:
			sub = "%d new requests!" % len(results)

		for row in results:
			for key in order:
				if( key != ''):
					msg += "%s - %s\n" % (key, row[key] )
				else:
					msg += "\n"
			msg += "\n--------------------------------------------------------------\n\n"

		## Send Message
		send_message(msg, sub)

		## Set notified flag for each result to true
		q = "update requests set notified=True where notified=False;"
		csr.execute( q )


	################################################
	## Action for Help table
        ################################################
    
	## Check the database for unnotified requests
	q = "select * from help where notified=False;"
	csr.execute( q )

	results = csr.fetchall()

	## Check for no results, if true skip to sleep
	if( len(results) > 0 ):

		sub = ""
		msg = ""
		order = ['name','purpose', 'email', 'description', '', '', 'id', 'created', 'ip_addr']
		## Notify that theere are new requests
		if(len(results) == 1):
			sub = "1 new request!"
		else:
			sub = "%d new requests!" % len(results)

		for row in results:
			for key in order:
				if( key != ''):
					msg += "%s - %s\n" % (key, row[key] )
				else:
					msg += "\n"
			msg += "\n--------------------------------------------------------------\n\n"

		## Send Message
		send_message(msg, sub)
		
		## Set notified flag for each result to true
		q = "update help set notified=True where notified=False;"
		csr.execute( q )

	## Sleep for 5 minutes
	sleep(300)

print ( "Exiting main loop...")

# Close down connections
csr.close()
cnx.close()
