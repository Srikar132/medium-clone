import gsap from "gsap";

// utils/assets.js or any shared config file
export const highlightFirstmv = "/videos/highlight-first.mp4";
export const highlightSectmv = "/videos/hightlight-third.mp4";
export const highlightThirdmv = "/videos/hightlight-sec.mp4";
export const highlightFourthmv = "/videos/hightlight-fourth.mp4";

export const replayImg = "/replay.svg";
export const playImg = "/play.svg";
export const pauseImg = "/pause.svg";


export const animateGSAP = (target : string , animationProps : any , scrollProps : any) => {
    gsap.to(target , {
        ...animationProps,
        scrollTrigger : {
            trigger : target,
            toggleActions : "restart reverse restart reverse",
            start : "top 85%",
            ...scrollProps
        }
    });
}



