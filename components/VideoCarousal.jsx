"use client";

import React, { useEffect, useRef, useState } from 'react'
import { hightlightsSlides } from '@/constants'
import { useGSAP } from '@gsap/react';
import { pauseImg, playImg, replayImg } from '@/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

const VideoCarousal = () => {
    const videoRef = useRef([]);
    const videoSpanRef = useRef([]);
    const videoDivRef = useRef([]);

    const [loadedData , setLoadedData] = useState([]);

    const [video , setVideo] = useState({
        isEnd : false,
        startPlay : false,
        videoId : 0,
        islastVideo : false,
        isPlaying : false
    });

    const {isEnd , startPlay , videoId , islastVideo , isPlaying} = video;

    useGSAP(() => {

        gsap.to('#slider' , {
            transform : `translateX(${-100 * videoId}%)`,
            duration  :2
        });

        gsap.to("#video" , {
            scrollTrigger : {
                trigger : "#video",
                toggleActions : "restart none none none"
            },
            onComplete : () => {
                setVideo((prev) => ({
                    ...prev ,
                    startPlay : true,
                    isPlaying : true
                }))
            }
        })
    } , [isEnd , videoId]);

    useEffect(() => {
        if(loadedData.length > 3) {
            if(!isPlaying) {
                videoRef.current[videoId].pause();
            }else {
                startPlay && videoRef.current[videoId].play();
            }
        }
    } , [startPlay , videoId , isPlaying , loadedData]);

    useEffect(() => {
        let anim;
        let animUpdate;
        if(videoSpanRef.current[videoId]) {
            anim = gsap.to(videoSpanRef.current[videoId] , {
                onUpdate : () => {
                    const progress = Math.ceil(anim.progress() * 100);

                    gsap.to(videoDivRef.current[videoId] , {
                        width : window.innerWidth < 760 ? '10vw' : window.innerWidth < 1200 ? '10vw' : '4vw'
                    });

                    gsap.to(videoSpanRef.current[videoId] , {
                        width : `${progress}%`,
                        backgroundColor : "white"
                    })
                },

                onComplete : () => {
                    if(isPlaying) {
                        gsap.to(videoDivRef.current[videoId] , {
                            width : '12px'
                        });


                        gsap.to(videoSpanRef.current[videoId] , {
                            backgroundColor : "#afafaf"
                        })
                    }
                }
            });

            if(videoId == 0) {
                anim.restart();
            }

            animUpdate = () => {
                anim.progress(
                    videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration
                )
            }

            if (isPlaying) {
                gsap.ticker.add(animUpdate);
            } else {
                gsap.ticker.remove(animUpdate);
            }
        }
    
        return () => {
            if (animUpdate) gsap.ticker.remove(animUpdate);
        };
    } , [videoId, isPlaying, startPlay]);

    const handleProcess = (type , i) => {
        switch(type) {
            case "video-end" :
                setVideo((prev) => ({...prev , isEnd : true , videoId : i + 1}));
                break;
            case "video-last":
                setVideo((prev) => ({...prev , islastVideo : true}));
                break;
            case "video-reset":
                setVideo((prev) => ({...prev , islastVideo : false , videoId : 0}));
                break;
            case "play" :
                setVideo((prev) => ({...prev , isPlaying : !prev.isPlaying}));
                break;
            case "pause" :
                setVideo((prev) => ({...prev , isPlaying  :false}));
                break;
            default :
            return video;
        }
    }

    const handleLoadedMetaData = (i , e) => 
    setLoadedData((prev) => [...prev , e]);

  return (
    <>
        <div className="flex items-center">

            {hightlightsSlides.map((list , i) => (
                <div key={list.id} id='slider' className='sm:pr-20 pr-10'>
                    <div className="video-carousel_container">

                        <div className="w-full h-full flex-center bg-black rounded-3xl overflow-hidden">
                            <video
                                id='video'
                                playsInline={true}
                                preload='auto'
                                muted
                                ref={(el) => videoRef.current[i] = el}
                                onLoadedData={(e) => handleLoadedMetaData(i,e)}
                                onEnded={() => {
                                    i !== 3 ?
                                    handleProcess('video-end' , i) :
                                    handleProcess('video-last')
                                }}
                            >
                                <source src={list.video} type='video/mp4'/>
                            </video>
                        </div>

                        <div className="absolute top-12 left-[5%] z-10">
                            {list.textLists.map((text , i) => (
                                <p key={i} className='md:text-2xl text-xl font-medium'>{text}</p>
                            ))}
                        </div>
                    </div>
                </div>
            ))}

        </div>

        <div className="relative flex-center mt-10">
            <div className="flex-center py-5 px-7 bg-zinc-700 backdrop-blur rounded-full">
                {videoRef.current.map((_, i) => (
                    <span
                        key={i}
                        ref={(el) => videoDivRef.current[i] = el}
                        className='mx-2 w-3 h-3 bg-gray-200 rounded-full relative'
                    >
                        <span ref={(el) => videoSpanRef.current[i] = el}
                        className='absolute h-full w-full rounded-full'
                        />
                    </span>
                ))}
            </div>
            <button className="control-btn">
                <img src={islastVideo ? replayImg : !isPlaying ? playImg : pauseImg} alt={
                    islastVideo ? "replay" :
                    !isPlaying ? "play" : "pause"
                } 
                    onClick={() => islastVideo ? 
                    handleProcess("video-reset") : !isPlaying ? handleProcess('play') :
                    handleProcess('pause')}
                />
            </button>
        </div>
    </>
  )
}

export default VideoCarousal