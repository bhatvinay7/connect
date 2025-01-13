// const { readFileSync } = require('fs');
// const { join } = require('path');
// const cResource = require('../models/coderesource.model.js');

// const getResources = async (req, res) => {
//     try {
//         const cResources = await cResource.find();
//         res.status(200).json(cResources);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// const getResource = async (req, res) => {
//     try {
//         const Resource = await cResource.findById(req.params.id);
//         res.status(200).json(Resource);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// const postResource = async (req, res) => {
//     try {
//         const Resource = new cResource({
//             name: req.body.name,
//             img: {
//                 data: readFileSync(join('./upload/coderesource/codeImage/' + req.file.filename)),
//                 contentType: 'image/png',
//             },
//             language: req.body.language,
//             vote: req.body.vote,
//             resource: req.body.resource,
//         });
//         Resource.save()
//             .then((resource) => {
//                 res.status(200).json(resource);
//             })
//             .catch((err) => {
//                 res.status(500).json({ message: err.message });
//             });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// const updateResource = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const Resource = await cResource.findByIdAndUpdate(id, req.body);
//         if (!Resource) {
//             return res.status(404).json({ message: 'Current resource not found' });
//         }
//         const updatedResource = await cResource.findById(id);
//         res.status(200).json(updatedResource);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// const deleteResource = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const Resource = await cResource.findByIdAndDelete(id);
//         if (!Resource) {
//             return res.status(404).json({ message: 'Current resource not found' });
//         }
//         res.status(200).json({ message: 'Resource deleted successfully' });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// module.exports = { getResources, getResource, postResource, updateResource, deleteResource };
