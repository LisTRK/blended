import { HttpError } from "http-errors";
export const errorHandler = (err, req, res, next)=>{
console.log("ErrorHandler: ", err);

	if(err instanceof HttpError) return res.status(err.status).json({
		message: err.message || err.name
	})

    res.status(500).json({
	  message:  "Ooop, Something went wrong"
	})
    
}