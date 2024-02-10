import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase.js'
import { updateUserStart,updateUserSuccess,updateUserFailure } from '../redux/user/userSlice.js'



const Profile = () => {
  const {currentUser}=useSelector((state)=>state.user);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0)
  const [imageError, setImageError] = useState(false)
  const [FormData, setFormData] = useState({});
  const dispatch =useDispatch()
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

  const handleChange = (e) => {
    setFormData({ ...FormData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/v1/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(FormData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      console.log("Dataaaa",data)
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

            <input type="file" ref={fileRef} hidden accept='image/*' onChange={(e)=>setImage(e.target.files[0])}/>

                                  {/* allow read;
                            allow write: if 
                            request.resource.size<2*1024*1024 &&
                            request.resource.contentType.matches('images/.*') */}

            <img src={FormData.profile || `${currentUser.profile}`} alt="Profile" className='h-24 w-24 self-center cursor-pointer rounded-full mb-5 object-cover hover:h-[100px]  hover:w-[100px]'
              onClick={handleImageClick}
            />
                  <p className='text-sm self-center'>
                {imageError ? (
                  <span className='text-red-700'>
                    Error uploading image (file size must be less than 2 MB)
                  </span>
                ) : imagePercent > 0 && imagePercent < 100 ? (
                  <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
                ) : imagePercent === 100 ? (
                  <span className='text-green-400'>Image uploaded successfully</span>
                ) : (
                  ''
                )}
              </p>

            <input type="username" defaultValue={currentUser.username} placeholder='Username' id='username' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/> 
            
            <input type="email" defaultValue={currentUser.email} placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
            
             <input type="password" placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>

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