gsap.to(".page1 .box", {
    duration: 1,
    rotation: 360,
    repeat: -1,
    yoyo: true,
})



gsap.timeline({
    scrollTrigger: {
        trigger: ".page2 .box",
        // markers: true,
        scroller: "body",
        start: "top 80%",
        scrub: 3,
    }
})
    .from(".page2 .box", { opacity: 0.5, duration: 1 })
    .to(".page2 .box", {
        duration: 3,
        rotation: 360,
        // repeat: -1,
        scale: 4,
        // yoyo:true,
    
    });




gsap.timeline({
    scrollTrigger: {
        trigger: ".page3",
        start: "top 10%",
        markers: true,
        scroller: "body",
    }
})
.from(".page3 h1", { opacity: 0, x: -100, duration: 2 })
    .from(".page3 h2", { opacity: 0, x: 100, duration: 1 }, "-=0.5");

