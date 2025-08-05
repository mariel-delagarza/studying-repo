# SVG Essentials and Animation

## Intro and Setup
- Repo for course is [https://github.com/sdras/svg-workshop](https://github.com/sdras/svg-workshop)
- Password for protected folders is in the README
- The exercises are in CodePen. You don't have to use it, but it may be convenient.

## SVG Anatomy Overview
### What is SVG?
- Vectors that are crisp on any display
- Fewer HTTP requests to handle - could be NO more if you put it directly in the HTML
- Small filesize even if you design for performance
- Easy to animate
- Easy to make accessible
- FUN (allegedly)

### SVG Support and Performance
- Nearly universally supported, don't worry about this.
- Images are really important for performance and most of what's delivered across the web
- Really great for Loaders - can be tiny files even with animation if optimized correctly
- SVG can also make other images smaller

### The Antidote to Positioning in CSS
- Can make it easier to put things where you want while keeping things responsive
- SVG stability can also be used for page transitions

### Platonic Shapes
- SVGs are like being on graph paper with infinite space and you plot the shapes using coordinates. 
- The viewbox is a little window where you're looking at that piece of graph paper
- The squares of the graph paper can get bigger or smaller, but the SVG stays plotted at the coordinates given. (This is how it scales.)
- You'll see and get x, y, width, height. Example: `viewBox = "0 0 450 100"`
- Circles are only 3 attributes: x, y, radius.

### viewBox and Responsive
- Remember it's a piece of graph paper that gets bigger and smaller.
- If you make the viewBox smaller, it's the same graph paper but the squares are smaller. Everything stays at the same coordinates.
- It's possible to use the viewBox to hide SVGs. They stay where plotted; you're moving the window into the graph paper.

### preserveAspectRatio
- You will probably almost never need this.
- Default: `preserveAspectRatio = "xMidYMid meet" -> Uniformly scales, like background-size: cover in CSS.
- Takes three parameters: X, Y (for `<align>`) and `<meetOrSlice>`
  - X and Y can be `Min`, `Mid`, `Max`
  - `<meetOrSlice>` can be `Meet` or `Slice`
- `meet` is default
  - entire`viewBox` is visible within viewport
  - the `viewBox` is scaled up as much as possible, meeting other criteria
  - `viewBox` < viewport
- `slice`
  - entire viewport is covered by `viewBox`
  - `viewBox` is scaled down as much as possible, meeting other criteria
  - `viewBox` > viewport
- Use it FOR the layout
  - `preserveAspectRatio = "none"`

### Paths, Groups, and Polylines
- `<g>` is like a `<div>`
- A `z` at the end of a path closes it - you want it to connect to where it came from.
- Paths all start with `d` for drawing and `M` for "move to"
- Since what applies to `<g>` applies to its children, it removes redundancy.
- You can keep the style of a child if you specify it (like IDs and Classes)
- A polyline is a non-straight line.
- M is "moveTo"
- L is "lineTo"
- H is "horizontal line drawn from current position"
- V is "vertical line drawn from current position
- Z is joining the end of a path
- ^ Capital letters and lowercase letters are the difference between absolute and relative positioning. 
- Curve commands -> Tell the computer here are a bunch of x,y coordinates and it knows to draw a curve
- C -> cubic-bezier
- S -> reflecting cubic-bezier
- Q -> quadratic bezier - where both sides share the same control point
- T -> command control point that's been reflected
- A -> elliptical arc

### Animated Bezier Curves and Template Literals
- Limitation with cubic bezier: two control points
- Possible to combine template literals and SVG path points
- This allows you to do things like create a line wobble

### a11y
- Title for elements in the SVG DOM
- Role to let the screen reader know whether to traverse
- Presentation -> Don't read out everything in it 
- Check out [Accessible SVGs](https://css-tricks.com/accessible-svgs/) by Heather Migliorisi

## CSS Animation

### Optimizing and Building
- An SVG with a lot of path points can become bulky and not very performant
- You can take down a lot of the bulk by using Object > Path > Simplify. There's little-to-no visual difference.
- You can also redraw a line and save it to get something with many fewer path points than the original.
- If you have a drop shadow, often it costs a lot. It's a giant PNG loaded into the SVG and adds a lot of size.
- You can use illustrator to use SVG Filters -> AI_Shadow_1 or 2
- It's also helpful to keep a background uniform; sometimes they're a bunch of small shapes for no reason.
- Tools
  - SVG OMG
  - Peter Collingridge's SVG Editor
  - SVGO / SVGO-GUI
    - Terminal-based SVG Optimiser - paired with the GUI it's really helpful

### Constructing an SVG
- Exporting from "Sketch" isn't really helpful
- Exporting fromm Illustrator is good but Illustrator is expensive (Inkscape may be an alternative - open source and free)

### Starting an SVG
- First: get everything on the page first and store it in 1 SVG
- Opacity: 0 for everything you aren't using yet
- Main principle: design everything first, slowly unveil things
- Ugly storyboards save you time - use a sketchbook
- Thumbnails: notes to yourself
- Storyboards: notes for collaboration
- Low fidelity prototypes show the motion

### Exercise
- Get an SVG - think of an animation you'd l ike to make
- Create 3 thumbnails for yourself
- Pick one and make a storyboard.

### Animation Support Breakdown
- For img src, object, embed, background url, and iframe, you can only designate animation if inside the SVG.
- But for inline, both SVG animation and interaction are supported.

### Differences in Functionality
- The SVG is an HTML element, so the whole SVG does have a background and is rectangle/square shaped.
- Instead of background use `fill`.
- You'll (probably) need to expand the viewbox 
- In the example, to target the circle, expand the viewBox use fill and remove fill from the markup.

### Why SVG
- CSS was built for layout
- SVG was created for drawing

### Transform Origin
- Not intuitive -- it starts in the top left corner not in the middle

### SVG Tools and Ideas Q&A

### Sprites
- Parallax - stuff closer to you is faster, stuff farther away is slower
- You have to use JS on the viewbox there's not a way to do it from CSS

### Atmospheric and Elemental Motion
- Sometimes the character of the animation is the atmosphere
- Elemental motion
  - Farther away is more blurry and has less contrast
  - Does the air or environment affect the movement of the thing?

## Greensock
### Tools Overview
- DOM/Virtual DOM
  - Pros
    - Great for UI/UX animation
    - Great for SVG that is resolution independent
    - Easier to debug
  - Cons:
    - Tanks with a lot of objects
    - Because of this ^ you have to care about the way you animate
- Canvas
  - Pros
    - Dance pixels dance!
    - Great for 3d or immersive stuff
    - Movement of a ton of objects
  - Cons
    - Harder to make accessible
    - Not resolution independent out of the box
    - Breaks to nothing
- Correct tools for the job
  - CSS/SCSS
    - Small sequences and simple interactions
    - Once you get to more than 3 things going on, switch to GSAP
  - GSAP
    - Great for sequencing and complex movement
    - Cross-browser consistency
  - React Spring/React Motion
    - Great for single movements you'd like to look realistic
    - For sending one thing _some_where.
  - Snap.svg is more like jQuery for SVG - not an animation library
  - AnimeJS is a lot like GSAP and fully open source but it has fewer plugins
  - Web Animations API looks great - not worth learning until support gets prioritized
  - Velocity is similar to GSAP with fewer bells and whisltes
  - Mo.js won't come out of beta because GSAP is better
  - D3.js was built for data viz but you can do a lot more with it

### Performance and GSAP
- Not all things are created equal
- Youshouldn't be animating with margin left, top - they cause repaints
- Transforms are what you should do to animate and change positions
- Check out:
  - [Debugging CSS Keyframe Animations](https://css-tricks.com/debugging-css-keyframe-animations/)
  - [How to create high-performance CSS animations](https://web.dev/articles/animations-guide)
- Chrome doesn't properly accelerated a lot of DOM nodes
- GSAP does under the hood
- GSAP has simple syntax timelines, nested timelines, morphs, etc.
- GSAP doesn't have cross-browser weirdness

### TweenMax Syntax
- fromTo -- go FROM this place TO that place

### Stagger
  
### GSAP Monster Demo

### Cycle Stagger
- Takes each time you stagger and cycles through a few different properties

### Comments on D3
- D3 and GSAP work nicely together
- The tricky part is making sure D3 is done, then using GSAP to move it.
- In theory: could hide D3 with CSS until it's done then use GSAP

### Timeline
- Stack tweens
- Set them a little before and after one another
- Change their placement in time
- Group them into scenes
- Add relative labels
- Animate the scenes