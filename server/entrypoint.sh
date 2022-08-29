#!/bin/bash

set -e

rm tmp/pids/server.pid || true
bundle exec rails db:migrate
bundle exec rails s -b 0.0.0.0 -p 3000
