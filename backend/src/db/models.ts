import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name : {type : String,required : true},
    email : {type : String,required : true,unique : true}, // unique?
    password : {type : String,required : true},
})
export const UserModel = mongoose.model("User",UserSchema)

const ResumeVersionSchema = new mongoose.Schema({
    userId : {type : mongoose.Schema.Types.ObjectId,ref : "User"},
    title : {type : String},
    skills : {type : String},
    summary : {type : String}
})
export const ResumeVersionModel = mongoose.model("ResumeVersion",ResumeVersionSchema)

const JobApplicationSchema = new mongoose.Schema({
    UserId : {type : mongoose.Schema.Types.ObjectId,ref : "User"},
    resumeId : {type : mongoose.Schema.Types.ObjectId,ref : "ResumeVersion"},
    JobTitle : {type : String},
    company : {type : String},
    location : {type : String},
    source : {type : String},
    JobUrl : {type : String},
    status : {type : String,default : "Applied",enum: [
        "Applied",
        "HR Call",
        "Interview 1",
        "Interview 2",
        "Test",
        "Rejected",
        "Offer",
        "Ghosted",
      ],},
      appliedDate : Date,
      lastUpdate : Date,
      followUpDate : Date,
      // we can also add AI analysis here later
      notes : [{type : mongoose.Schema.Types.ObjectId,ref : 'Notes'}],
      timeline : [{type : mongoose.Schema.Types.ObjectId,ref : 'Timeline'}]
})
export const JobApplicationModel = mongoose.model('JobApplication',JobApplicationSchema)


const NotesSchema = new mongoose.Schema({
    JobId : {type : mongoose.Schema.Types.ObjectId,ref : 'JobApplication',required : true},
    userId : {type : mongoose.Schema.Types.ObjectId,ref : 'User',required : true},
    content : {type : String}
})

export const NotesModel = mongoose.model('Notes',NotesSchema)

const TimelineEventSchema = new mongoose.Schema({
    JobId : {type : mongoose.Schema.Types.ObjectId,ref : 'JobApplication'},
    type : {type : String,required : true}, // Applied,Interview,followUp
    description : {type : String},
    date : Date
})
export const TimelineModel = mongoose.model('Timeline',TimelineEventSchema)



const AnalyticsSnapshotSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    totalApplications: Number,
    interviews: Number,
    offers: Number,
    rejections: Number,
    ghosted: Number,

    applicationsBySource: {
      LinkedIn: Number,
      Naukri: Number,
      CompanySite: Number,
      Other: Number,
    },
  },
  { timestamps: true }
);

export const AnalyticsSnapshotModel = mongoose.model(
  "AnalyticsSnapshot",
  AnalyticsSnapshotSchema
);



const FollowUpReminderSchema = new mongoose.Schema(
  {
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "JobApplication", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    scheduledFor: Date,
    sent: { type: Boolean, default: false },
    sentAt: Date,
  },
  { timestamps: true }
);

export const FollowUpReminderModel = mongoose.model(
  "FollowUpReminder",
  FollowUpReminderSchema
);
