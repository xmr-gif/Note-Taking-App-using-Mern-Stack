import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI';
import NoteCard from '../components/NoteCard'
import { useState } from "react";
import axios from "axios"
import toast from "react-hot-toast"
import axiosInstance from '../lib/axios';
import NotesNoteFound from '../components/NotesNoteFound';


const HomePage = () => {
    const [isRateLimited,setIsRateLimited] = useState(false) ;
    const [notes,setNotes] = useState([]) ;
    const [loading,setLoading] = useState(true) ;

    useEffect (()=> {
        const fetchNotes = async () =>{
            try {
                const res = await axiosInstance.get("/notes");
                console.log(res.data) ;
                setNotes(res.data);
                setIsRateLimited(false) ;
            } catch (error) {
                console.log("Error fetching the notes : ",error);
                if(error.response?.status == 429){
                    setIsRateLimited(true);
                }else{
                    toast.error("Failed to load Notes ! ")
                }

            }finally{
                setLoading(false);
            }
        };
        fetchNotes();
    },[])
  return (

    <div className="min-h-screen" >
        <Navbar/>
        {isRateLimited && <RateLimitedUI/> }
        <div className="max-w-7xl mx-auto p-4 mt-6" >
            {loading && <div className="text-center text-primary py-10" >Loading Notes...</div>}

            {notes.length === 0 && !isRateLimited && <NotesNoteFound/>}

            {notes.length > 0 && !isRateLimited && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-16" >
                    {notes.map(note => (
                        <NoteCard key={note.id} note={note} setNotes={setNotes} />
                    ))}

                </div>
            )}
        </div>
    </div>
  )
}

export default HomePage
