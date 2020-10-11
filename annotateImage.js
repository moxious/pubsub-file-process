const vision = require('@google-cloud/vision');

async function annotate(uri) {
    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    // Performs label detection on the image file
    const [result] = await client.labelDetection(uri);
    return result.labelAnnotations;
}

module.exports = annotate;