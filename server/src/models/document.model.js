import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    originalName: {
      type: String,
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
    },

    pageCount: {
      type: Number,
      default: 0,
    },

    status: {
    type: String,
    enum: [
        "uploaded",
        "extracting",
        "ready",
        "processing",
        "completed",
        "failed",
    ],
    default: "uploaded",
},

extractedText: {
    type: String,
    default: "",
},

notesGenerated: {
    type: Boolean,
    default: false,
},

flashcardsGenerated: {
    type: Boolean,
    default: false,
},

quizGenerated: {
    type: Boolean,
    default: false,
},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Document", documentSchema);