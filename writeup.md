Need to do a write up on it that says:

   - How it was made

   - What it's for

   - How it could be used in the future


-------------------------------

-------------------------------

-------------------------------


The BVN office (as a part of project octopus) has been undergoing some works. The old office:

![Missing Image](doc_images/ExistingWithBackground.png)

Has gone away, in preparation for the new office:

![Missing Image](doc_images/ProposedWithBackground.png)

In the meantime, various areas around the office have been closed for construction intermittently, meaning that many people have had to temporarily relocate. To appease some of the confusion about what's happening, we built this:

https://baptistehiggs.github.io/BVN_Office_Staging/

The tool visualises the works around the office on a floorplan, highlighting the different areas as they are zoned off, and displaying the correct table configurations when they aren't. It also has a gantt chart showing when different zones will be under construction, changing colour as time passes. It gives a holistic picture that's easily understandable.

Looking forward, this isn't the only potential use of the visualisation tool. It has been built in an adaptable way with [a guide](README.md) on how to create and edit other similar visualisations. Any floorplan with changes over time can be visualised relatively easily, but more than just floorplans can be visualised with this. Some ideas of how it could be used include:

   - Building construction over time. Rather than using the view of a floorplan, a render from any perspective could be used with various images that convey how it will change over time.
   
   - City planning. On a much larger scale than a floorplan, a map of a city or some other region and how it will be developed could be visualised quite similarly.
   
   - Demographics visualisations. Rather than highlighting zones under construction, the same zones could be used to show statistics on various demographics over time.
   
   - Internal architecture project phasing. Similarly to the building construction idea, a visualisation could be created to communicate what has to be completed and when for an architecture project.
   
When it comes down to it, all of these work well with the visualisation tool because they need to show spatial change over time. If there's any other kind of data that you need to visualise that needs to show spatial change over time, this visualisation tool can be used.

The actual way that the website works includes four main components:

   - **The Illustrator file.** This is the interface for all of the floorplan's visuals, and is saved to an SVG for later injection into the website.
   
   - **The Google sheet.** If you haven't used google sheets before, it's basically microsoft excel except online. The google sheet stores all of the time data needed for the visualisation (when it's under construction, when it's got the old layout, etc.) in the form of 1s and 0s. [Here's what the sheet looks like.](https://docs.google.com/spreadsheets/d/1Np-BOM5_Jr6B4Obx_9ls0JlX0vd-i1pDeVKMYbUYA_s/edit#gid=0)
   
   - **The Python script.** The python script gathers the visuals, downloads the google sheet, and puts it in all the right places for the website to work. It also cleans up a lot of this data so that the website can run faster.
   
   - **The HTML, CSS, & Javascript files.** This is the actual website and is what runs when someone views the visualisation. The Javascript file handles all of the necessary calculations for the interactive part of the website, whereas the HTML and CSS files just handle what it looks like.










