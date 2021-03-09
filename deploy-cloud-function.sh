#!/bin/bash

gcloud functions deploy email-sender \
 --entry-point processEmailMessagesFromBus \
 --runtime nodejs14 \
 --trigger-topic email-requester-sender \
 --set-env-vars EMAIL_SEND_TO=dsaltz190@gmail.com,EMAIL_SEND_FROM=dsaltz190@gmail.com
