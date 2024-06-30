"use client"

import { HiOutlineChat, HiOutlineHeart, HiOutlineTrash, HiHeart } from "react-icons/hi"

import { signIn, useSession } from "next-auth/react"
import { setDoc, doc, getFirestore, serverTimestamp, onSnapshot, collection, deleteDoc } from "firebase/firestore";
import {app} from "../firebase"
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "@/atom/modelAtom";
export default function Icons({id, uid}) {
    const {data: session} = useSession();
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState([]);
    const [open, setOpen] = useRecoilState(modalState);
    const db = getFirestore(app);
    const likePost = async () => {
        if(session){
            if(isLiked){
                await deleteDoc(doc(db, 'posts', id, "likes", session.user.uid));
            }else{
                await setDoc(doc(db, 'posts', id, "likes", session.user.uid),{
                    username: session.user.username,
                    timestamp: serverTimestamp()
                });
            }
        }else{
            signIn()
        }
    };
    useEffect(() => {
        onSnapshot(collection(db, 'posts', id, "likes"),(snapshot) => {
            setLikes(snapshot.docs)
        })
        }, [db])

    useEffect(() => {
        setIsLiked(likes.findIndex((like) => like.id === session?.user.uid) !== -1)}, [likes])

    const deletePost = async () => {
        if(window.confirm("Are you sure you want to delete this post?")){
            if(session?.user?.uid === uid){
                deleteDoc(doc(db, 'posts', id)).then(() => {
                    console.log("post deleted");
                    window.location.reload();
                }).catch((error) => {
                    console.error('Error deleting document: ', error);
                })
            } else {
                alert("You can only delete your own posts");
            }
        }
    }
  return (
    <div className="flex justify-start gap-5 p-2 text-gray-500">
        <HiOutlineChat 
        onClick={() => setOpen(!open)}
        className="w-8 h-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100" />
        <div className="flex items-center">
        {isLiked ? (
        <HiHeart
        onClick={likePost}
        className="w-8 h-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-red-500 text-red-600 hover:bg-red-100" />): (
        <HiOutlineHeart
        onClick={likePost}
        className="w-8 h-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100" />)}
        {likes.length > 0 && <span className={`text-xs ${isLiked && "text-red-600"}`}>{likes.length}</span>}
        </div>
        {session?.user?.uid === uid && (
            <HiOutlineTrash
            onClick={deletePost}
            className="w-8 h-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-green-500 hover:bg-green-100" />
        )
        }
    </div>
  )
}
