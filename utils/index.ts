import gsap from "gsap";


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


export function formatDate(dateInput: string | Date): string {
    const date = new Date(dateInput);
  
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
    const day = date.getDate(); // 1 - 31
    const month = months[date.getMonth()]; // 0 - 11
    const year = date.getFullYear(); // 4-digit year
  
    return `${month} ${day}, ${year}`;
  }
  

