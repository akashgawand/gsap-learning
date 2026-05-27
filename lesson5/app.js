const main = document.querySelector('#main')
const cursor = document.querySelector('#cursor')
const cursorLabel = document.querySelector('#cursor-label')
const image = document.querySelector('#image')

// Center cursor on mouse pointer
gsap.set(cursor, { xPercent: -50, yPercent: -50 })


main.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.8,
        ease: 'power2.out'
    })
})

main.addEventListener('click', (e) => {

    gsap.killTweensOf(cursor);
    gsap.set(cursor, {
        scale: 1
    });

    gsap.to(cursor, {
        scale: 1.5,
        duration: 0.2,
        ease: 'power2.out',
        yoyo: true,
        repeat:1,

    })
})


image.addEventListener('mouseenter', () => {
    // Morph into a large hollow ring with "View" label
    gsap.to(cursor, {
        width: 90,
        height: 90,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderColor: '#fff',
        duration: 0.4,
        ease: 'power3.out',
    })
    gsap.to(cursorLabel, {
        opacity: 1,
        duration: 0.3,
        delay: 0.15,
    })
})

image.addEventListener('mouseleave', () => {
    // Shrink back to solid dot
    gsap.to(cursor, {
        width: 20,
        height: 20,
        backgroundColor: '#fff',
        borderColor: 'transparent',
        duration: 0.4,
        ease: 'power3.out',
    })
    gsap.to(cursorLabel, {
        opacity: 0,
        duration: 0.15,
    })
})

let isExpanded = false
const img = image.querySelector('img')

image.addEventListener('click', () => {
    if (!isExpanded) {
        gsap.to(img, {
            width: window.innerWidth,
            height: window.innerHeight,
            borderRadius: 0,
            duration: 0.6,
            ease: 'power3.inOut',
        })
    } else {
        gsap.to(img, {
            width: 400,
            height: 200,
            borderRadius: 10,
            duration: 0.6,
            ease: 'power3.inOut',
        })
    }
    isExpanded = !isExpanded
})
