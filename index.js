const { PubSub } = require('@google-cloud/pubsub');
const annotateImage = require('./annotateImage');

const annotateImageToPubsubTopic = async (file, context) => {
    console.log(`  Event: ${context.eventId}`);
    console.log(`  Event Type: ${context.eventType}`);
    console.log(`  Bucket: ${file.bucket}`);
    console.log(`  File: ${file.name}`);
    console.log(`  Metageneration: ${file.metageneration}`);
    console.log(`  Created: ${file.timeCreated}`);
    console.log(`  Updated: ${file.updated}`);

    const uri = `gs://${file.bucket}/${file.name}`;

    const pubsub = new PubSub();
    const topic = pubsub.topic(process.env.OUTPUT_TOPIC);

    // Use the vision API to annotate the image
    const labels = await(annotateImage(uri));

    labels.forEach(label => {
        label.uri = uri;
    });

    // Construct a message to send via Pubsub
    const messageObject = {
        data: {
            message: labels,
        },
    };

    const messageBuffer = Buffer.from(JSON.stringify(messageObject), 'utf8');
    // console.log(`Labels for ${uri}: `, JSON.stringify(messageObject, null, 2));

    // Publishes a message
    const res = await topic.publish(messageBuffer);
    console.log(`Labels published for ${uri} successfully`, res);
}

module.exports = {
    annotateImage: annotateImageToPubsubTopic,
};