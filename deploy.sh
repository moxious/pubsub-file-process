#!/bin/bash

# Customize these for your project setup!
SERVICE_ACCOUNT=neo4j-serverless-functions@graphs-are-everywhere.iam.gserviceaccount.com
PROJECT=graphs-are-everywhere
BUCKET=gs://graph-image-classification
OUTPUT_TOPIC=imageAnnotation

gcloud functions deploy annotateImage \
     --ingress-settings=all --runtime=nodejs12 --allow-unauthenticated \
     --timeout=300 \
     --service-account=$SERVICE_ACCOUNT \
     --set-env-vars GCP_PROJECT=$PROJECT \
     --set-env-vars OUTPUT_TOPIC=$OUTPUT_TOPIC \
     --trigger-bucket $BUCKET \
     --project $PROJECT