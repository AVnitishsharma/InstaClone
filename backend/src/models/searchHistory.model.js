import mongoose from 'mongoose';

const searchHistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    searchedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '30d' // Automatically remove after 30 days
    }
});

// Unique index to prevent duplicate history for same user (optional, Instagram allows multiple but usually keeps only newest)
searchHistorySchema.index({ user: 1, searchedUser: 1 }, { unique: true });

const SearchHistoryModel = mongoose.model('SearchHistory', searchHistorySchema);
export default SearchHistoryModel;
