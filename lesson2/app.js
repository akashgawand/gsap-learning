// =============================================================================
//  GSAP TIMELINE — full feature demo
// =============================================================================


// ─── 1. TIMELINE DEFAULTS ────────────────────────────────────────────────────
//  Instead of repeating duration/ease on every tween, set them once here.
//  Any tween that doesn't override them will use these automatically.
const tl = gsap.timeline({
    defaults: { duration: 0.7, ease: "power3.out" },

    // ─── 4. CALLBACKS ────────────────────────────────────────────────────────
    //  Run any JS at key moments of the timeline lifecycle.
    onStart:    () => console.log("▶  timeline started"),
    onComplete: () => console.log("✅ timeline complete"),
    onRepeat:   () => console.log("🔁 repeating"),
    onUpdate:   () => {
        // fires every frame — great for syncing a scrubber UI
        document.getElementById("scrubber").value = tl.progress() * 100;
    }
});


// ─── 2. POSITION PARAMETER ───────────────────────────────────────────────────
//  Controls WHEN each tween starts on the timeline.
//
//    omitted   → right after previous ends      (default sequence)
//    "<"       → same start time as previous    (parallel)
//    "-=0.3"   → overlap: 0.3s before prev ends
//    "+=0.5"   → gap: 0.5s after prev ends
//    2         → absolute: always at the 2s mark

// label fades in (default sequence — starts at 0s)
tl.to("#label", { opacity: 1, y: -10 });

// circle drops from above (sequence — starts after label)
tl.fromTo("#circle",
    { y: -200, opacity: 0, scale: 0.3 },
    { y: 0,    opacity: 1, scale: 1   }
);

// box slides from right — "-=0.3" overlaps with circle still moving
tl.fromTo("#box",
    { x: 200, opacity: 0, rotation: 90 },
    { x: 0,   opacity: 1, rotation: 0  },
    "-=0.3"
);

// triangle pops from below — another overlap for a cascade feel
tl.fromTo("#triangle",
    { y: 200, opacity: 0, scale: 0 },
    { y: 0,   opacity: 1, scale: 1 },
    "-=0.3"
);


// ─── 3. LABELS ───────────────────────────────────────────────────────────────
//  Name a point in time so you can reference it by name instead of seconds.
//  The "seek → spinTime label" button in the HTML jumps straight here.
tl.addLabel("spinTime");

// all three spin TOGETHER — "<" on box and triangle makes them parallel to circle
tl.to("#circle",   { rotation: 360,  scale: 1.25, duration: 1, ease: "power1.inOut" })
  .to("#box",      { rotation: -360, scale: 1.25, duration: 1, ease: "power1.inOut" }, "<")
  .to("#triangle", { rotation: 360,  scale: 1.25, duration: 1, ease: "power1.inOut" }, "<");

// shrink back together (sequence — after spin)
tl.to(["#circle", "#box", "#triangle"], { scale: 1, duration: 0.4 });

// label text swaps at ABSOLUTE 4s — no matter how long the tweens above took
tl.to("#label", { opacity: 0, duration: 0.3 }, 4)
  .set("#label", { innerText: "timeline complete", color: "#ffd200" })
  .to("#label",  { opacity: 1, duration: 0.3 });

// everything fades out — "+=0.6" adds a 0.6s gap/pause before fading
tl.to(["#circle", "#box", "#triangle", "#label"], {
    opacity: 0,
    y: 30,
    stagger: 0.1,
    duration: 0.5,
    ease: "power2.in"
}, "+=0.6");


// ─── 5. NESTED TIMELINES ─────────────────────────────────────────────────────
//  Build sub-timelines and add them into a master.
//  Great for organising complex animations into reusable named chunks.
//
//  const intro = gsap.timeline()
//  intro.to("#circle", { y: 100 })
//  intro.to("#box",    { y: 100 })
//
//  const outro = gsap.timeline()
//  outro.to("#triangle", { y: -100 })
//
//  const master = gsap.timeline()
//  master.add(intro)           // plays first
//  master.add(outro)           // plays after intro
//  master.add(outro, "<")      // plays at same time as intro


// ─── 6. TIMESCALE ────────────────────────────────────────────────────────────
//  Speed up or slow down the entire timeline without changing any durations.
//  The buttons in the HTML call these directly:
//
//  tl.timeScale(2)    → 2× faster (great for skipping ahead during testing)
//  tl.timeScale(0.5)  → half speed (great for debugging slow-motion)
//  tl.timeScale(1)    → back to normal


// ─── 7. PROGRESS (scrubber) ──────────────────────────────────────────────────
//  progress() is a value from 0 (start) to 1 (end).
//  Pause the timeline and drive progress() manually = scroll-driven animation.
//
//  tl.progress(0.5)  → jump to halfway point instantly
//
//  The range input below lets you SCRUB through the whole timeline by hand:

document.getElementById("scrubber").addEventListener("input", (e) => {
    tl.progress(e.target.value / 100).pause();
    // divide by 100 because the input goes 0–100, progress expects 0–1
});


// ─── 8. PLAYBACK CONTROLS ────────────────────────────────────────────────────
//  All called by the buttons in the HTML — no extra code needed here.
//
//  tl.play()               → play from current position
//  tl.pause()              → freeze in place
//  tl.reverse()            → play backwards from current position
//  tl.restart()            → jump to start and play
//  tl.seek("spinTime")     → jump to the label named "spinTime"
//  tl.seek(2)              → jump to the 2s mark
