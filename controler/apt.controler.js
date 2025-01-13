// const Apt = require('../models/apt.model.js');

// const getApts = async (req, res) => {
//     try {
//         const AptList = await Apt.find();
//         res.status(200).json(AptList);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// const getApt = async (req, res) => {
//     try {
//         const data = await Apt.findById(req.params.id);
//         res.status(200).json(data);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// const postApt = async (req, res) => {
//     try {
//         const apt = await Apt.create(req.body);
//         res.status(201).json(apt);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// const updateApt = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const apt = await findByIdAndUpdate(id, req.body);
//         if (!apt) {
//             return res.status(404).json({ message: 'Current question not found' });
//         }
//         const updatedApt = await Apt.findById(id);
//         res.status(200).json(updatedApt);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// const deleteApt = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const apt = await Apt.findByIdAndDelete(id);
//         if (!apt) {
//             return res.status(404).json({ message: 'Current question not found' });
//         }
//         res.status(200).json({ message: 'Question deleted successfully' });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// module.exports = { getApts, getApt, postApt, updateApt, deleteApt };
