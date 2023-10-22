import axios from "axios";

export const getImages = async (data:string) => {
    if(data){
        const response = await axios.get(`https://api.unsplash.com/search/photos/?query=${data}&page=1&per_page=8&client_id=SRTHIJBzRV4O5hYVHKEK-eLcwvqKLNtYmdgXBgCWEc8`) 
        return response
    }
    else{
        const response = await axios.get("https://api.unsplash.com/photos/?client_id=SRTHIJBzRV4O5hYVHKEK-eLcwvqKLNtYmdgXBgCWEc8") 
        return response
    }
      
}
