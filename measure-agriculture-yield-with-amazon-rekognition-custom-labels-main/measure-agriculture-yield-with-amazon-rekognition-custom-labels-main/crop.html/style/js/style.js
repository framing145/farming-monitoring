// Import AWS SDK
AWS.config.update({
    region: 'us-east-1', // Update to your AWS region
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx' // Replace with your Identity Pool ID
    })
});

const docClient = new AWS.DynamoDB.DocumentClient();

document.getElementById("crop-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const cropName = document.getElementById("crop-name").value;
    const yieldAmount = parseFloat(document.getElementById("yield-amount").value);
    const region = document.getElementById("region").value;

    if (cropName && yieldAmount && region) {
        const params = {
            TableName: "CropYields", // Replace with your DynamoDB table name
            Item: {
                cropId: Date.now().toString(),
                cropName: cropName,
                yieldAmount: yieldAmount,
                region: region,
                timestamp: new Date().toISOString()
            }
        };

        docClient.put(params, function (err, data) {
            if (err) {
                document.getElementById("output").textContent =
                    "Error saving data: " + JSON.stringify(err);
            } else {
                document.getElementById("output").textContent =
                    "Data successfully saved!";
                document.getElementById("crop-form").reset();
            }
        });
    } else {
        alert("All fields are required!");
    }
});
