# How to edit and use the website:

There are three main parts to editing the data on the website.

 - Editing the times

 - Editing the visuals

 - Collating the data for the website

After this, there will also be a section on more advanced uses.

## Standard Workflow

### Editing the times

1. The times are entered and stored on a google sheets doc, which can be [viewed here](https://docs.google.com/spreadsheets/d/1Np-BOM5_Jr6B4Obx_9ls0JlX0vd-i1pDeVKMYbUYA_s/edit?usp=sharing). If you'd like to have editing priveleges, please email me at BaptisteHiggs@gmail.com

2. Inside the google doc, the columns represent the different states of the different areas. [See here for a guide on how the naming convention works](#namingConvention) - if you have the time (and you're confident you can do it without messing it all up), please feel free to change it.

3. 





## Other Issues

### <a name="namingConvention">The naming convention.</a>

HM

### Allowing for more layers to be shown

Currently, the *Prepare_SVG.py* python script that collates all the data ignores anything that's not visible and that's not in any of the following layers:

 - clippaths
 
 - Zones
 
 - Background
 
If you'd like to allow for any more layers to be visible, it will involve a quick trip into the python script. Don't worry if you're unfamiliar with coding or python, it's fairly straightforward:

1. In the windows start search, search for IDLE, and click on the link that presents itself.

![PUT THIS IMAGE IN](windows start search for IDLE.png)

2. Select **File > Open**

3. Find *Prepare_SVG.py* in the dialog window that appears, opening the file up.

![PUT THIS IMAGE IN](selecting the prepare_SVG.py file.png)

4. The code should present itself.

![PUT THIS IMAGE IN](image of code.png)

5. Every so often you should see a line that starts on the very right that begins with an orange *"def"*. Scroll down until you see the line that says *"def runSVGPrep():"*.

![PUT THIS IMAGE IN](image of def runSVGPrep(): line of code.png)

6. Just 6 lines below it, you should see a line that says something like *"newSVG = extractCode(inFile, ["clippaths", "Zones", "Background"])"*. This is the part that we're going to edit, specifically the part that says *"["clippaths", "Zones", "Background"]"*.



















