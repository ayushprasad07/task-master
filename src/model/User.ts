import mongoose , {Document,Schema}from "mongoose";

interface Note extends Document{
    _id : mongoose.Types.ObjectId;
    title : string;
    description : string;
    createdAt : Date;
}

const noteSchema : Schema<Note> = new Schema<Note>({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

interface PDF extends Document{
    _id : mongoose.Types.ObjectId;
    title : string;
    description : string;
    url : string;
    createdAt : Date;
}

const pdfSchema : Schema<PDF> = new Schema<PDF>({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    url : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

interface YouTube extends Document{
    _id: mongoose.Types.ObjectId;
    title : string;
    description : string;
    url : string;
    preview : string;
    createdAt : Date;
}

const youtubeSchema : Schema<YouTube> = new Schema<YouTube>({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    url : {
        type : String,
        required : true
    },
    preview : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

interface User extends Document{
    _id : mongoose.Types.ObjectId;
    username : string;
    email : string;
    password : string;
    isVerified : boolean;
    createdAt : Date;
    verificationCode : string;
    verificationExpiry : Date;
    notes : Note[];
    youtubes : YouTube[];
    pdf : PDF[];
}

const userSchema : Schema<User> = new Schema<User>({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    verificationCode : {
        type : String,
        required : true
    },
    verificationExpiry : {
        type : Date,
        required : true
    },
    notes : {
        type : [noteSchema],
        default : []
    },
    youtubes : {
        type : [youtubeSchema],
        default : []
    },
    pdf : {
        type : [pdfSchema],
        default : []
    }
})


const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", userSchema);

export {UserModel};