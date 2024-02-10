import React, { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase.js'

const Profile = () => {
  const {currentUser}=useSelector((state)=>state.user);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0)
  const [imageError, setImageError] = useState(false)
  const [FormData, setFormData] = useState({})
  console.log(FormData)
  console.log(imagePercent)
  useEffect(()=>{
    if (image) {
      handleFileUpload(image)
      
    }
  },[image]);



  

  // const handleFileUpload=async(image)=>{
  //   const storage=getStorage(app);
  //   const fileName = new Date().getTime()+image.name;
  //   const storageRef = ref(storage, fileName);
  //   const uploadTask= uploadBytesResumable(storageRef,image);
  //   uploadTask.on(
  //     'state_changed',
  //     (snapshot)=>{
  //       const progress =(snapshot.bytesTransferred/snapshot.totalBytes) *100;
  //       //console.log('Upload is '+progress+"% done");
  //       setImagePercentage(Math.round(progress))

  //     },
   
  //   (error)=>{
  //     setImageError(true)
  //   },
  //   ()=>{
  //     getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
  //       setFormData({...FormData,profile:downloadUrl})

  //     })
  //   }
  //   );

  //   ///4:00:37
  // }
  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...FormData, profile: downloadURL })
        );
      }
    );
  };

  const fileRef =useRef();

  const handleImageClick = () => {
    fileRef.current.click(); // Trigger the file input dialog
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
            <form className='flex flex-col gap-4' >

            <input type="file" ref={fileRef} hidden accept='image/*' onChange={(e)=>setImage(e.target.files[0])}/>

                                  {/* allow read;
                            allow write: if 
                            request.resource.size<2*1024*1024 &&
                            request.resource.contentType.matches('images/.*') */}

            <img src={`${currentUser.user.profile}`} alt="Profile" className='h-24 w-24 self-center cursor-pointer rounded-full mb-5 object-cover hover:h-[100px]  hover:w-[100px]'
              onClick={handleImageClick}
            />

            <input type="username" defaultValue={currentUser.user.username} placeholder='Username' id='password' className='bg-slate-100 p-3 rounded-lg'/> 
            
            <input type="email" defaultValue={currentUser.user.email} placeholder='Email' id='password' className='bg-slate-100 p-3 rounded-lg'/>
            
             <input type="password" placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg'/>

             <button  className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 p-3'>Update</button>

             <div className='flex justify-between'>
             <p className='text-red-600  '>Delete Account</p>
             <p className='text-red-600  '>Sign Out</p>
             </div>
            </form>
    </div>
  )
}

export default Profile