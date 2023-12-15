import { Client, Account, ID } from "appwrite";
import config from '../config/config.js'



export class AuthService{
client=new Client();
account;

constructor(){
          this.client
          .setEndpoint(config.appwriteUrl)
          .setProject(config.appwriteProjectId);

          this.account=new Account(this.client);
        }

        async createAccount({email,password,name}){
             try {
               const userAccount = await this.account.create(ID.unique,email,password,name) 
               if (userAccount) {
                return this.login(email,password)
               } else {
                return userAccount;
               }                
             } catch (error) {
                throw error;
             }
          
          
        }



        async login({email,password}){
                  try {
                    return await this.account.createEmailSession(email,password)
                    
                  } catch (error) {
                    console.log("Appwrite Service ::Login"+error);
                  }




        }

        async getCurrentUser(){
            try {
                return this.account.get();
                
            } catch (error) {
                console.log("Appwrite Service ::getCurrentuser"+error);
            }
            return "User Not Found"





        }

         async logOut(){
                try {
                    
                         return await this.account.deleteSessions();

                } catch (error) {
                    console.log("Appwrite Service ::Logout"+error);
                }



         }








}

const account=new AuthService();

export default account;