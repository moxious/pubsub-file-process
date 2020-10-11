# Pubsub File Process

This repo is a simple example of how to process files coming into GCP Storage buckets, and send data about
that processing on to Pubsub

## Setup

- Create a service account, grant access to read objects in the bucket
- Enable cloud vision API for the project, and that service account
- Check the parameters carefully in the `deploy.sh` file to deploy a sample instance.

The key parameters are the bucket you want to watch, and the topic to publish to.

## Sample set

I use the base APCM animal image set as a test resource.   For a demo, I might copy up a selection of the
files like this:

```
cd base_apcm_animals
gsutil cp *20.jpg gs://graph-image-classification/
```