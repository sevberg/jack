#!/bin/bash

# if server machine has been restarted, the following command will need to be run:
# sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000



EMJDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"/..
LOGDIR=$EMJDIR/logs

# Start EMJ server
forever start --sourceDir $EMJDIR --workingDir $EMJDIR --append -l $LOGDIR/emj.log bin/www

# Start database monitor/mailer script
forever start -c python --sourceDir $EMJDIR/mailer --workingDir $EMJDIR/mailer --append -l $LOGDIR/mailer.log request_monitor.py
