1. Each Vessel should have its own visual object:
  a. X and Y coordinates relative to their corner
  b. size relative to the number of genes in this set
    i. Width and Height coordinates come from this size.
  c. Active vs. Inactive state.
    i. Fill and opacity can impact this.
  d. Parent dataset which can change this vessel's state.
2. Setup canvas
3. Draw
  a. call `background(bgColor)` to refresh the canvas and not overwrite
  b. print Number of Selected Genes and Number of Total Genes in the bottom left corner
  c. print Number of Genes in common between two sets in the top right corner
    i. If I'm hovering over the currently active set, the bottom and top numbers should match.
    ii. Otherwise print 0 or the number of similarities.
  d. Bottom Left Navigation:
    i. Stats view:
      get the number of anchors on each vessel:
        print the number of vessels with the same amount of anchors and the number of genes which conform to these sets.
    ii. A button to increase vessel sizes.
    iii. A button to toggle anchors on/off
    iv. Left and right arrows to navigate between vessels which contain parts of a set (useless if set has only one vessel)
  b. draw all items currently in the drawStack
    i. Overarching Shape
    ii. Names of sets
    iii. Vessels
      foreach vessel, their anchors as well
        rotate anchors based on the location of their parent
      vessels can be active, hovered, inactive, or ignored.
    iv. Selected vessels OR selected Genes within a vessel


REMEMBER: X,Y IS TOP LEFT, NOT BOTTOM LEFT YA DINGUS. Y grows down, not up.

use keyIsPressed and keyCode to get user input

touchIsDown for mobile
