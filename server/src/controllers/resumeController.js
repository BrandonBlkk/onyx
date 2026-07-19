import Resumes from "../models/resumeModel.js";

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const resumeSortOptions = {
    updated: { updatedAt: -1 },
    'Last Updated': { updatedAt: -1 },
    name: { title: 1 },
    Name: { title: 1 },
    created: { createdAt: -1 },
    'Recently Created': { createdAt: -1 },
};

const getResumeSort = (sortBy) => resumeSortOptions[sortBy] || resumeSortOptions.updated;

export const getAllResumes = async (req, res) => {
    try {
        const resumes = await Resumes.find({ user: req.user.id }).sort(getResumeSort(req.query.sort));

        if (!resumes) {
            return res.status(404).json({ message: 'No resumes found' });
        }

        res.status(200).json(resumes);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid resume id' });
        }

        res.status(500).json({ message: error.message });
    }
};

export const searchResumes = async (req, res) => {
    try {
        const query = req.params.query?.trim();

        if (!query) {
            return res.status(200).json([]);
        }

        const resumes = await Resumes.find({
            user: req.user.id,
            $or: [
                { title: { $regex: escapeRegex(query), $options: 'i' } },
                { summary: { $regex: escapeRegex(query), $options: 'i' } },
            ],
        }).sort(getResumeSort(req.query.sort));

        if (!resumes) {
            return res.status(404).json({ message: 'No resumes found' });
        }

        res.status(200).json(resumes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getSingleResume = async (req, res) => {
    try {
        const resume = await Resumes.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        res.status(200).json(resume);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid resume id' });
        }

        res.status(500).json({ message: error.message });
    }
};

export const createResume = async (req, res) => {
    try {
        const { title, summary, file } = req.body;

        const resume = await Resumes.create({
            user: req.user.id,
            title,
            summary,
            ...(file ? { file } : {}),
        });

        if (!resume) {
            return res.status(400).json({ message: 'Resume not created' });
        }

        res.status(201).json(resume);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: error.message });
    }
};

export const updateResume = async (req, res) => {
    try {
        const resume = await Resumes.findOneAndUpdate({
            _id: req.params.id,
            user: req.user.id,
        }, req.body, {
            new: true,
            runValidators: true,
        });

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        res.status(200).json(resume);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid resume id' });
        }

        res.status(500).json({ message: error.message });
    }
}

export const deleteResume = async (req, res) => {   
    try {
        if (String(req.user.id) !== String(req.params.id)) {
            return res.status(403).json({ message: 'You can only delete your own resume' });
        }
        
        const resume = await Resumes.findByIdAndDelete(req.params.id);

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        res.status(200).json(resume);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid resume id' });
        }

        res.status(500).json({ message: error.message });
    }
}
