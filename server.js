const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/upload', (req, res) => {
    const xmlData = req.body.xmlData;
    // Process XML data here
    const duplicates = findDuplicates(xmlData);
    res.json({ duplicates });
});

function findDuplicates(xml) {
    // Implement XML parsing and duplicate checking here
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, "text/xml");
    const huElements = xmlDoc.getElementsByTagName("HU");
    const huIds = [];
    const duplicates = [];

    for (let i = 0; i < huElements.length; i++) {
        const id = huElements[i].getAttribute("ID");
        if (huIds.includes(id)) {
            duplicates.push(id);
        } else {
            huIds.push(id);
        }
    }

    return duplicates;
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});