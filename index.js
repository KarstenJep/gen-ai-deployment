import express from 'express';
const app = express();

import { VertexAI } from '@google-cloud/vertexai';
import { GoogleAuth } from 'google-auth-library';
const auth = new GoogleAuth();

app.use(express.json());
app.use(express.static('public'));

app.post('/api/keyword', async (req, res) => {
    try {
        console.log('Request body:', req.body);

        const projectId = await auth.getProjectId();
        const vertex = new VertexAI({ project: projectId });
        const generativeModel = vertex.getGenerativeModel({
            model: 'gemini-1.5-flash'
        });

        const keyword = req.body.keyword || 'dog';
        console.log('Using keyword:', keyword);
        const prompt = `Give me 10 fun facts about ${keyword}. Return this as html without backticks.`
        const resp = await generativeModel.generateContent(prompt);
        const html = resp.response.candidates[0].content.parts[0].text;
        res.send(html);
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).send('Error generating content');
    }
});

const port = parseInt(process.env.PORT) || 8081;
app.listen(port, () => {
    console.log(`helloworld: listening on port ${port}`);
});
