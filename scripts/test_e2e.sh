#!/usr/bin/env bash

# prepare server
grunt build
grunt connect:build &
sleep 1

# run tests
./node_modules/protractor/bin/webdriver-manager update
./node_modules/protractor/bin/protractor protractor-conf.js
TEST_STATUS=$?

# stop server
kill $!

# return test status
exit $TEST_STATUS

