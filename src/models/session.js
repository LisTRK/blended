import { Schema, model } from "mongoose";


const sessionSchema = new Schema({
    userId: {type: String, required: true, trim: true},
    accessToken: {type: String, required: true, trim: true},
    refreshToken: {type: String, required: true, trim: true},
    accessTokenValidUntil: {type: Date , required: true},
    refreshTokenValidUntil: {type: Date , required: true},
},
{timestamps: true, versionKey: false}
)

export const Session = model('Session', sessionSchema);

