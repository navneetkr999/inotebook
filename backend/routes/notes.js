import express from 'express'; 

const notesRouter = express.Router();

notesRouter.get('/', (req, res) => {
    res.json([])
});

export default notesRouter;