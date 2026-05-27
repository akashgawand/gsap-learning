gsap.from("h1", {
    duration: 1,
    x: -100,
    y: 30,
    opacity: 0,
    stagger: 0.5,
    repeat: -1,
    yoyo: true
});


gsap.to("#earth", { rotation: 360, transformOrigin: "-130px 50%", duration: 5, repeat: -1, ease: "none" });
gsap.to("#moon", { rotation: 360, transformOrigin: "-170px 50%", duration: 2, repeat: -1, ease: "none" });


t1 = gsap.timeline()


t1.to("#item1", { y: 100, duration: 1 ,rotate:360});
t1.to("#item2", { y: 100, duration: 1 ,rotate:360}, "<"); // "<" makes this start at the same time as previous tween
t1.to("#item3", { y: 100, duration: 1 ,rotate:360});
t1.to("#item4", { y: 100, duration: 1 ,rotate:360});
