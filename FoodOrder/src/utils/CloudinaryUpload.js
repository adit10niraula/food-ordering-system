import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'


cloudinary.config({ 
    cloud_name: 'aditrajkumar', 
    api_key: '595121351384683', 
    api_secret: '11TE7Cd9z5cz7k7m8x49qT52wfw'
});

const uploadToCoudinary = async (filepath)=>{
    try {

        if(!filepath)return null

        const response = await cloudinary.uploader.upload(filepath, {resource_type: "auto"})
        fs.unlinkSync(filepath)
        return response;

        
    } catch (error) {
        fs.unlinkSync(filepath)
        console.log("error in cloudinary ", error)
        return null;

        
    }
}

export {uploadToCoudinary}




