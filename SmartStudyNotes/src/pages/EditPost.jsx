import React,{useEffect,useState} from 'react'
import { Container,PostCard,PostForm } from '../components'
import appwriteSrvice from '../appwrite/databaseService'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function EditPost() {
   const [post,setPost]=useState(null);
   const {slug}=useParams()
   const navigate=useNavigate()
 useEffect(()=>{
    if(slug)
    {
        appwriteSrvice.getPost(slug).then((post)=>{
           if(post)
            setPost(post)
        })
    }else{
        navigate('/')
    }

 },[slug,navigate])
   return post ?(
    <div className='py-8'>
       <Container>
        <PostCard post={post}></PostCard>
       </Container>
       </div>
   ) :null
     
}

export default EditPost