import { version } from '../../package.json';
import { Router } from 'express';
import clarifai from 'clarifai'

const app = new Clarifai.App({
 apiKey: 'faef1e5b2dea4c708a18af8a97d79097'
})
const apparelId = 'e0be3b9d6a454f0493ac3a30784001ff'

export default ({ config, db }) => {
	let api = Router();

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		const url = req.query.url
		const magento = req.query.magento
		app.models.predict(apparelId, [url])
			.then(response => {
				const data = response.outputs[0].data.concepts
		    res.send(data)
			},err => {
		    console.log(err)
			}
		);
	});

	return api;
}