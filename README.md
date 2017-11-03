# How to edit and use the website:

There are three main parts to editing the data on the website.

 - Editing the times

 - Editing the visuals

 - Collating the data

After this, there will also be a section on more advanced uses.

## Standard Workflow


### Editing the times

The times are entered and stored on a google sheets doc, which can be [viewed here](https://docs.google.com/spreadsheets/d/1Np-BOM5_Jr6B4Obx_9ls0JlX0vd-i1pDeVKMYbUYA_s/edit?usp=sharing). If you'd like to have editing priveleges, please email me at BaptisteHiggs@gmail.com

Inside the google doc, the columns represent the different states of the different areas. [See here for a guide on how the naming convention works](#namingConvention) - if you have the time (and you're confident you can do it without messing it all up), please feel free to change it.

The rows represent each of the days, spanning between August 2017 and January 2018. Each of the cells, a combination of the day and the states of each of the areas, are either a 1 or a zero (or somewhere in between) to represent how transparent that state should be on that day.


### Editing the visuals

The way that the website works is that there are three base images that are manipulated:

 - *ExistingFloorplan.png*,
 
 - *EmptyFloorplan.png*,
 
 - & *ProposedFloorplan.png*

There are also the orange zones and the clipping planes (i.e. where the above images are split up) included in the *MasterFloorplan.ai* Illustrator file. If you'd like to edit one of the base images, just open it up in photoshop, and as long as the size of the image remains the same your edits should work like you'd expect them to.

If you make any edits to the data inside the illustrator file for the website, you'll need to **File > Save As** the image as an SVG file. Make sure the settings are the same as these:

![put image here](SVGsettings.png)

To actually push these changes to the website, you'll need to [collate the data](#collateData)

### <a name="collateData">Collating the data</a>

1. To start collating the data, open up the *Prepare_SVG.py* file.

   *Note: You'll need python 2.7 installed in order to do this!
   
2. The script will ask you for the name of the svg file generated. Enter it, ensuring that all the cases of the letters are correct and that you've put *.svg* on the end of it.

3. After this, it should ask for the html file's name. It's likely *index.html* unless you've renamed it. As before, ensure that the cases are correct and *.html* is on the end of it!

4. The program is done! Index.html should work with your newly updated files.


## Other Issues

### <a name="namingConvention">The naming convention.</a>

The naming convention of the states may not be intuitive, but there is logic to it (feel free to change it if you'd like to and feel that you'd be able to without messing anything up - every place that the convention is used will need to be updated!). 

It works like a coordinate system, with the first number representing the **x** value, and the second the **y** value. The A represents how it's first in that block - there used to be Bs and Cs but now there are only As.

![Missing Image](doc_images/MasterFloorplan_Example.png)

The three terms - EXS, CON, & PRP - are short for existing, construction, and proposed floorplans. The construction phase is when there's an orange shape on top of it, and the existing and proposed floorplans are the different floorplans that are respectively before and after the works are completed in each area. 


### Allowing for more layers to be shown

Currently, the *Prepare_SVG.py* python script that collates all the data ignores anything that's not visible and that's not in any of the following layers:

 - clippaths
 
 - Zones
 
 - Background
 
If you'd like to allow for any more layers to be visible, it will involve a quick trip into the python script. Don't worry if you're unfamiliar with coding or python, it's fairly straightforward:

1. In the windows start search, search for IDLE, and click on the link that presents itself.

![PUT THIS IMAGE IN](windowsstartsearchforIDLE.png)

2. Select **File > Open**

3. Find *Prepare_SVG.py* in the dialog window that appears, opening the file up.

![PUT THIS IMAGE IN](selectingtheprepare_SVGpyfile.png)

4. The code should present itself.

![PUT THIS IMAGE IN](imageofcode.png)

5. Every so often you should see a line that starts on the very right that begins with an orange *"def"*. Scroll down until you see the line that says *"def runSVGPrep():"*.

![PUT THIS IMAGE IN](imageofdefrunSVGPreplineofcode.png)

6. Just 6 lines below it, you should see a line that says something like *"newSVG = extractCode(inFile, ["clippaths", "Zones", "Background"])"*. This is the part that we're going to edit, specifically the part that says *"["clippaths", "Zones", "Background"]"*.

![PUT THIS IMAGE IN](imageoflisteditlineofcode.png)

7. To add an item to a list in Python (what we're editing is a list), just add a comma after the last item, and put the item in after it. Since the layer that we need to add is a word, we need to put speech marks ("") around it. The line should now look something like this (except with the name of your layer - remember that the case is important! keep it exactly the same as what it's named in illustrator):

![PUT THIS IMAGE IN](imageofeditedlineofcode.png)

8. Now that we've finished the editing, just **File > Save** it. When you next use the *Prepare_SVG.py* file, the new layer should be included!














