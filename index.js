import express from 'express';
const app = express();

import { VertexAI } from '@google-cloud/vertexai';
import { GoogleAuth } from 'google-auth-library';
const auth = new GoogleAuth();

app.use(express.json());
app.use(express.static('public'));
const searchWord = '';

app.post('/api/keyword', (req, res) => {
    const { keyword } = req.body;
    console.log('Received keyword:', keyword);
    searchWord = keyword;
    res.json({ message: `Keyword received: ${keyword}` });
});

app.get('/', async (req, res) => {
    const projectId = await auth.getProjectId();

    const vertex = new VertexAI({ project: projectId });
    const generativeModel = vertex.getGenerativeModel({
        model: 'gemini-1.5-flash'
    });

    // const animal = req.query.animal || 'dog';
    // const prompt1 = `Give me 10 fun facts about ${animal}. Return this as html without backticks.`
    const prompt = `Give me 10 fun facts about ${searchWord}. Return this as html without backticks.`
    const resp = await generativeModel.generateContent(prompt);
    const html = resp.response.candidates[0].content.parts[0].text;
    res.send(html);
});

const port = parseInt(process.env.PORT) || 8081;
app.listen(port, () => {
    console.log(`helloworld: listening on port ${port}`);
});
