gsap.registerPlugin(ScrollTrigger);

// =============================================================================
//  LESSON 1 — gsap.from(), stagger, repeat, yoyo, transformOrigin
// =============================================================================

// nav entrance with stagger
gsap.from(".logo",  { y: -50, opacity: 0, duration: 0.8, ease: "power3.out" });
gsap.from("nav a",  { y: -30, opacity: 0, stagger: 0.1, duration: 0.6, ease: "power3.out", delay: 0.2 });

// orbital motion — same transformOrigin trick as lesson 1
// formula: transformOrigin = "-(planet's left offset from center)px 50%"
gsap.to("#mercury", { rotation: 360, transformOrigin: "-80px 50%",  duration: 3,  repeat: -1, ease: "none" });
gsap.to("#earth",   { rotation: 360, transformOrigin: "-135px 50%", duration: 7,  repeat: -1, ease: "none" });
gsap.to("#mars",    { rotation: 360, transformOrigin: "-185px 50%", duration: 13, repeat: -1, ease: "none" });

// floating background blobs — repeat + yoyo
gsap.to(".blob.b1", { y: -50, duration: 4,   repeat: -1, yoyo: true, ease: "sine.inOut" });
gsap.to(".blob.b2", { y: 35,  duration: 5,   repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.2 });
gsap.to(".blob.b3", { y: -30, duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.6 });

// scroll indicator bounce
gsap.to(".scroll-hint", { y: 14, duration: 0.9, repeat: -1, yoyo: true, ease: "power1.inOut", delay: 3 });


// =============================================================================
//  LESSON 2 — timeline with defaults, fromTo, position params, addLabel, onComplete
// =============================================================================

const heroTl = gsap.timeline({
    defaults: { ease: "power3.out", duration: 0.8 },

    // onComplete callback — reveal blobs after hero text finishes
    onComplete: () => {
        gsap.to(".blob.b1, .blob.b2, .blob.b3", { opacity: 0.75, duration: 1.5, stagger: 0.2 });
    }
});

heroTl
    .addLabel("textIn")
    .from(".hero-tag",        { y: 30, opacity: 0 })
    .from(".hero-title span", { y: 80, opacity: 0, stagger: 0.15, duration: 1 }, "-=0.4")
    .from(".hero-sub",        { y: 20, opacity: 0, duration: 0.7 },              "-=0.3")
    .fromTo(".hero-content .hero-cta",          // fromTo: control both start and end
        { scale: 0.7, opacity: 0 },
        { scale: 1,   opacity: 1, ease: "back.out(1.7)", duration: 0.6 },        "-=0.2"
    )
    .from(".scroll-hint", { opacity: 0, duration: 0.4 },                         "+=0.4");


// =============================================================================
//  LESSON 3 — ScrollTrigger on timelines (one trigger per timeline)
// =============================================================================

// Solar section — text slides from left, solar system from right, "<" for parallel
gsap.timeline({
    scrollTrigger: {
        trigger: "#solar",
        start: "top 60%",
        scroller: "body",
    }
})
.from(".solar-text h2", { x: -80, opacity: 0, duration: 0.8 })
.from(".solar-text p",  { x: -60, opacity: 0, duration: 0.7 }, "-=0.4")
.from(".solar-text li", { x: -40, opacity: 0, stagger: 0.12, duration: 0.5 }, "-=0.3")
.from("#solarSystem",   { x: 80,  opacity: 0, duration: 0.9 }, "<");

// Concepts section — title drops in, cards stagger up with back.out bounce
gsap.timeline({
    scrollTrigger: {
        trigger: "#concepts",
        start: "top 65%",
        scroller: "body",
    }
})
.from(".concepts-title", { y: -40, opacity: 0, duration: 0.7 })
.from(".card", {
    y: 60,
    opacity: 0,
    stagger: 0.1,
    duration: 0.6,
    ease: "back.out(1.7)",
}, "-=0.3");

// CTA section — fromTo scale-in + staggered children + blob fade
gsap.timeline({
    scrollTrigger: {
        trigger: "#cta",
        start: "top 65%",
        scroller: "body",
    }
})
// =============================================================================
//  DEMO ANIMATIONS — each card's mini canvas, looping to show the concept
// =============================================================================

// Demo 1: dot moves right (demonstrating .to()), label swaps, dot moves back (.from())
const demo1 = gsap.timeline({ repeat: -1, defaults: { ease: "power2.inOut" } });
demo1
    .to(".d1-dot",    { x: 140, duration: 1 })
    .set(".d1-label", { innerHTML: "&larr; gsap.from()" })
    .to(".d1-dot",    { x: 0, duration: 1 }, "+=0.2")
    .set(".d1-label", { innerHTML: "gsap.to() &rarr;" }, "+=0.2");

// Demo 2: mover travels explicitly FROM (ghost, left) TO (solid, right)
const demo2 = gsap.timeline({ repeat: -1, repeatDelay: 0.4 });
demo2
    .fromTo(".d2-mover",
        { x: -58, opacity: 0, scale: 0.3 },
        { x: 58,  opacity: 1, scale: 1, duration: 1.1, ease: "power3.out" }
    )
    .to(".d2-mover", { opacity: 0, scale: 0.3, duration: 0.25, ease: "power2.in" }, "+=0.5");

// Demo 3: three boxes enter one by one — shows the SEQUENCE concept
const demo3 = gsap.timeline({ repeat: -1, repeatDelay: 0.6, defaults: { duration: 0.38, ease: "power2.out" } });
demo3
    .fromTo(".s1", { y: 18, opacity: 0.1 }, { y: 0, opacity: 1 })
    .fromTo(".s2", { y: 18, opacity: 0.1 }, { y: 0, opacity: 1 })
    .fromTo(".s3", { y: 18, opacity: 0.1 }, { y: 0, opacity: 1 })
    .to([".s1", ".s2", ".s3"], { opacity: 0.12, duration: 0.3, stagger: 0.1 }, "+=0.5");

// Demo 4: bars grow up then shrink — stagger makes them cascade, not all at once
const demo4 = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
demo4
    .fromTo(".d4-bar",
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, stagger: 0.1, duration: 0.45, ease: "power2.out" }
    )
    .to(".d4-bar", { scaleY: 0, opacity: 0, stagger: 0.08, duration: 0.3, ease: "power2.in" }, "+=0.4");

// Demo 5: scrollbar thumb moves down; when it crosses the trigger line the box pops in
const demo5 = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
demo5
    .to(".d5-thumb",  { y: 62, duration: 1.8, ease: "none" })
    .fromTo(".d5-box",
        { opacity: 0, scale: 0.3 },
        { opacity: 1, scale: 1,  duration: 0.4, ease: "back.out(2)" }, 1.0
    )
    .to(".d5-box",    { opacity: 0, scale: 0.3, duration: 0.2 }, "+=0.5")
    .set(".d5-thumb", { y: 0 });

// Demo 6: log lines appear in lifecycle order — onStart → onUpdate → onComplete
const demo6 = gsap.timeline({ repeat: -1, repeatDelay: 0.4, defaults: { ease: "power2.out" } });
demo6
    .fromTo(".d6-line.l1", { x: -15, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4 })
    .fromTo(".d6-line.l2", { x: -15, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4 }, "+=0.35")
    .fromTo(".d6-line.l3", { x: -15, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4 }, "+=0.35")
    .to(".d6-terminal",    { opacity: 0, duration: 0.3 }, "+=0.7")
    .set(".d6-terminal",   { opacity: 1 });


// CTA section — fromTo scale-in + staggered children + blob fade
gsap.timeline({
    scrollTrigger: {
        trigger: "#cta",
        start: "top 65%",
        scroller: "body",
        scrub: true 
    }
})
.fromTo(".cta-section h2",
    { scale: 0.8, opacity: 0 },
    { scale: 1,   opacity: 1, duration: 0.9, ease: "back.out(1.5)" }
)
.from(".cta-section p",           { y: 20, opacity: 0, duration: 0.6 },                   "-=0.3")
.from(".cta-section .hero-cta",   { y: 20, opacity: 0, duration: 0.5, ease: "back.out(2)" }, "-=0.2")
.to(".blob.b4",                   { opacity: 0.5, duration: 1.5 },                         "<");


gsap.to("#try #big", {
    width: "100vw",
    height: "100vh",
    scrollTrigger: {
        trigger: "#try",   // ← required
        scroller: "body",        // ← required
        markers: true,
        start: "top 0%",
        end: "+=900",           // ← give it scroll distance
        scrub: true,
        pin: true,              // ← belongs here
        invalidateOnRefresh: true, // ← belongs here
    },
})


gsap.to("#again h1", {
    x: "-70%",
    ease: "none",
    scrollTrigger: {
        trigger: "#again",
        scroller: "body",
        start: "top top",
        end: "+=1200", // controls scroll distance
        scrub: 3,
        pin: true,

    }
});

// gsap.fromTo(
//     "#again h1",
//     { x: "100%" },
//     {
//         x: "-100%",
//         ease: "none",
//         scrollTrigger: {
//             trigger: "#again",
//             start: "top top",
//             end: "+=1500",
//             scrub: true,
//             pin: true,
//             markers: true
//         }
//     }
// );


// Default center rotation
gsap.to(".b1", {
    rotation: 360,
    duration: 2,
    repeat: -1,
    ease: "none"
})


// Rotate from left side
gsap.to(".b2", {
    rotation: 360,
    transformOrigin: "0% 50%",
    duration: 2,
    repeat: -1,
    ease: "none"
})


// Rotate around external point
gsap.to(".b3", {
    rotation: 360,
    transformOrigin: "-100px 50%",
    duration: 2,
    repeat: -1,
    ease: "none"
})