const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const imageBase64 = body.image.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Buffer.from(imageBase64, "base64");

    const response = await fetch("https://clipdrop-api.co/remove-background/v1", {
      method: "POST",
      headers: {
        "x-api-key": process.env.CLIPDROP_API_KEY, // API key will be hidden in Netlify settings
      },
      body: imageBuffer,
    });

    if (!response.ok) {
      return { statusCode: 500, body: JSON.stringify({ error: "Clipdrop API failed" }) };
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    return {
      statusCode: 200,
      body: JSON.stringify({
        image: `data:image/png;base64,${base64}`,
      }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
