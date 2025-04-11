"use client";

import React, { useEffect, useRef, useState } from 'react';
import { hightlightsSlides } from '@/constants';
import { useGSAP } from '@gsap/react';
import { pauseImg, playImg, replayImg } from '@/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const VideoCarousal = () => {
    const videoRef = useRef([]);
    const videoSpanRef = useRef([]);
    const videoDivRef = useRef([]);

    const [loadedData, setLoadedData] = useState([]);
    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        islastVideo: false,
        isPlaying: false
    });

    const { isEnd, startPlay, videoId, islastVideo, isPlaying } = video;

    useGSAP(() => {
        gsap.to(".slider", {
            xPercent: -100 * videoId,
            duration: 2,
        });

        gsap.to(".carousel-video", {
            scrollTrigger: {
                trigger: ".carousel-video",
                toggleActions: "restart none none none"
            },
            onComplete: () => {
                setVideo((prev) => ({
                    ...prev,
                    startPlay: true,
                    isPlaying: true
                }));
            }
        });
    }, [isEnd, videoId]);

    useEffect(() => {
        if (loadedData.length === hightlightsSlides.length) {
            if (!isPlaying) {
                videoRef.current[videoId]?.pause();
            } else {
                startPlay && videoRef.current[videoId]?.play();
            }
        }
    }, [startPlay, videoId, isPlaying, loadedData]);

    useEffect(() => {
        let anim;
        let animUpdate;

        if (videoSpanRef.current[videoId]) {
            anim = gsap.to(videoSpanRef.current[videoId], {
                onUpdate: () => {
                    const progress = Math.ceil(anim.progress() * 100);

                    gsap.to(videoDivRef.current[videoId], {
                        width: window.innerWidth < 760 ? '10vw' :
                               window.innerWidth < 1200 ? '10vw' : '4vw'
                    });

                    gsap.to(videoSpanRef.current[videoId], {
                        width: `${progress}%`,
                        backgroundColor: "white"
                    });
                },
                onComplete: () => {
                    if (isPlaying) {
                        gsap.to(videoDivRef.current[videoId], { width: '12px' });
                        gsap.to(videoSpanRef.current[videoId], { backgroundColor: "#afafaf" });
                    }
                }
            });

            if (videoId === 0) {
                anim.restart();
            }

            animUpdate = () => {
                anim.progress(
                    videoRef.current[videoId].currentTime /
                    hightlightsSlides[videoId].videoDuration
                );
            };

            if (isPlaying) {
                gsap.ticker.add(animUpdate);
            } else {
                gsap.ticker.remove(animUpdate);
            }
        }

        return () => {
            if (animUpdate) gsap.ticker.remove(animUpdate);
        };
    }, [videoId, isPlaying, startPlay]);

    const handleProcess = (type, i) => {
        switch (type) {
            case "video-end":
                if (i + 1 < hightlightsSlides.length) {
                    setVideo((prev) => ({ ...prev, isEnd: true, videoId: i + 1 }));
                } else {
                    setVideo((prev) => ({ ...prev, islastVideo: true }));
                }
                break;
            case "video-reset":
                setVideo({ isEnd: false, startPlay: false, videoId: 0, islastVideo: false, isPlaying: false });
                break;
            case "play":
                setVideo((prev) => ({ ...prev, isPlaying: true }));
                break;
            case "pause":
                setVideo((prev) => ({ ...prev, isPlaying: false }));
                break;
            default:
                break;
        }
    };

    const handleLoadedMetaData = (i, e) => {
        setLoadedData((prev) => [...prev, e]);
    };

    return (
        <>
            <div className="flex items-center ">
                {hightlightsSlides.map((list, i) => (
                    <div key={list.id} className="slider sm:pr-20 pr-10 shrink-0 w-full">
                        <div className="video-carousel_container relative">

                            <div className="w-full h-full flex-center bg-black rounded-3xl overflow-hidden">
                                <video
                                    className="carousel-video w-full h-full object-cover"
                                    playsInline
                                    preload="auto"
                                    muted
                                    ref={(el) => videoRef.current[i] = el}
                                    onLoadedData={(e) => handleLoadedMetaData(i, e)}
                                    onEnded={() =>
                                        handleProcess("video-end", i)
                                    }
                                >
                                    <source src={list.video} type="video/mp4" />
                                </video>
                            </div>

                            <div className="absolute top-12 left-[5%] z-10 text-white">
                                {list.textLists.map((text, idx) => (
                                    <p key={idx} className="md:text-2xl text-xl font-medium">{text}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Progress & Controls */}
            <div className="relative flex-center mt-10">
                <div className="flex-center py-5 px-7 bg-zinc-700 backdrop-blur rounded-full">
                    {hightlightsSlides.map((_, i) => (
                        <span
                            key={i}
                            ref={(el) => videoDivRef.current[i] = el}
                            className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative"
                        >
                            <span
                                ref={(el) => videoSpanRef.current[i] = el}
                                className="absolute h-full w-full rounded-full"
                            />
                        </span>
                    ))}
                </div>
                <button className="control-btn ml-4">
                    <img
                        src={islastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
                        alt={islastVideo ? "Replay" : !isPlaying ? "Play" : "Pause"}
                        onClick={() =>
                            islastVideo
                                ? handleProcess("video-reset")
                                : isPlaying
                                ? handleProcess("pause")
                                : handleProcess("play")
                        }
                    />
                </button>
            </div>
        </>
    );
};

export default VideoCarousal;
