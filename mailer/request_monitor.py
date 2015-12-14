#!/usr/bin/python


import requests

def send_simple_message():
    print( "sending..." )
    return requests.post(
        "https://api.mailgun.net/v3/sandboxb7cc3744e4cd46aab37a90c5946dd4a4.mailgun.org/messages",
        auth=("api", "key-40fec02026b38ca2fa87737c340541c8"),
        data={"from": "Mailgun Sandbox <postmaster@sandboxb7cc3744e4cd46aab37a90c5946dd4a4.mailgun.org>",
              "to": "Severin Ryberg <sevberg129@gmail.com>",
              "subject": "Hello Severin Ryberg",
              "text": "Congratulations Severin Ryberg, you just sent an email with Mailgun!  You are truly awesome!  You can see a record of this email in your logs: https://mailgun.com/cp/log .  You can send up to 300 emails/day from this sandbox server.  Next, you should add your own domain so you can send 10,000 emails/month for free."})

print( send_simple_message() )