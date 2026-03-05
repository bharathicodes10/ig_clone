import React, { Fragment, useRef, useState } from "react";
import { modalState } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";
import { Dialog, Transition } from "@headlessui/react";
import { CameraIcon } from "@heroicons/react/outline";
//import { profile, timeStamp } from "console";
import {addDoc, collection,serverTimestamp,doc,updateDoc} from "firebase/firestore"
//db from "../firebase";
//import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { storage,db } from "../firebase";
import { useSession } from "next-auth/react";
//import { profile } from "console";
function Modal() {
  const [open, setOpen] = useRecoilState(modalState);
  const { data: session } = useSession();
const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef(null);
  const [caption, setCaption] = useState("");
  const [loading,setLoading]=useState(false);
  const captionRef = useRef(null);

  const uploadImageToCloudinary = async () => {
  const data = new FormData();
  data.append("file", selectedFile);
  data.append("upload_preset", "insta_uploads");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/drlx6swqa/image/upload",
    {
      method: "POST",
      body: data,
    }
  );

  const file = await res.json();
  return file.secure_url;
};

  const uploadPost=async()=>{
if(loading) return;
setLoading(true);
const imageUrl = await uploadImageToCloudinary();
const docRef=await addDoc(collection(db,'posts'),{
  username:session?.user?.username,
  caption:caption,
  profileImage:session?.user?.image,

  image:imageUrl,
  timeStamp:serverTimestamp(),
  });
  console.log("New doc added with ID",docRef.id);
//   const imageRef=ref(storage,`posts/${docRef.id}/image`);
//   //to upload the image to firebase storage and get the download url to update the post with the image url
//     await uploadString(imageRef,selectedFile,'data_url').then(async snapshot=>{ 
//     const downloadURL=await getDownloadURL(imageRef);
//     await updateDoc(doc(db,'posts',docRef.id),{
//         //to update the post with the image url   - document image in firebase storage
//       image:downloadURL,
//     });
//     });
    setOpen(false);
    setLoading(false);
    setSelectedFile(null);  
}
  const addImageToPost = (e) => {
    const reader = new FileReader(); 
console.log(e.target.files[0]);
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
      console.log(readerEvent.target.result);
    }
  }
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-[9999] inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-center justify-center min-h-screen p-4 text-center sm:p-0">
          {/* Background overlay */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
            &#8203;
          </span>

          {/* Modal panel */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                {/* Camera icon render and file input */}
                {selectedFile ? (
                  <img src={selectedFile} 
                  onClick={() => filePickerRef.current.click()} alt="Selected" className="w-full object-contain cursor-pointer" />
                ) : (
                    <>
              <div className="mx-auto flex items-center justify-center mt-4 h-12 w-12 rounded-full bg-red-100 cursor-pointer mb-4"onClick={() => filePickerRef.current.click()}>
                <CameraIcon
                  className="h-6 w-6 text-red-600"
                  aria-hidden="true" 
                />
              </div>
               <Dialog.Title className="text-lg font-medium text-gray-900 text-center">
                  Upload a Photo
                </Dialog.Title>
                    </>
                )}
              <div className="p-6">
               

                {/* Image picker */}
                <div className="mt-4">
                  <input
                    type="file"
                    ref={filePickerRef}
                    className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                    hidden
                    onChange={addImageToPost}
                  />
                </div>

                {/* Caption */}
                <input
                  type="text"
                  placeholder="Write a caption..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  ref={captionRef}
                  className="mt-4 w-full border-none focus:ring-0 text-sm"
                />
              </div>

              {/* Buttons */}
              <div className="bg-gray-50 px-6 py-3 flex justify-end gap-3">
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 text-sm bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>

                <button className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 focus ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:cursor-not-allowed hover:disabled:bg-gray-300" onClick={uploadPost} disabled={!selectedFile || loading}>
                  {loading ? "Uploading..." : "Upload Post"}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}


export default Modal;
