import { Storage ,Client,ID} from "appwrite";
import config from "../config/config";


export class StorageService{
    client =new Client();
    storage;
    constructor(){
             this.client
             .setEndpoint(config.appwriteProjectId)
             .setProject(config.appwriteProjectId);
            
      storage=new Storage(this.client);


     }

     async uploadFile(file){
        try {
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file

            );
            
        } catch (error) {
            console.log("AppwriteService :uploadFile::error->"+error);
            return false;
        }




     }

     async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId
            )

            return true;

        } catch (error) {
            console.log("AppwriteService :deleteFile::error->"+error);
            return false;
        }



     }

     getFilePreview(fileId){
     return this.storage.getFilePreview(
            config.appwriteBucketId,
            fileId
        )

     }

     
        


}


 const storageService=new StorageService();
export default storageService;