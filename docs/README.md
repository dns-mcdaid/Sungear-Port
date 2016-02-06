# Table of Contents

### How to Use

1. [Interacting with Sungear](#interacting-with-sungear)
2. [Control Dialog](#control-dialog)
3. [Genes Dialog](#genes-dialog)
4. [GO Terms Dialog](#go-terms-dialog)
5. [Sungear Dialog](#sungear-dialog)
6. [(optional) GeneLights Dialog]

### Definitions

1. [Anchors](#anchors)
2. [Vessels](#vessles)
3. [GO Terms](#go-terms)

### Troubleshooting

### Data Files

1. [Sungear data file Documentation]
2. [Adding new data (experiments, species, hierarchies) to Sungear]

### Interfacing with Sungear from third-party applications

1. [Data exchange using a web application]

## <br />

## Interacting with Sungear

__Selecting__

Almost all dialogs in Sungear allow the selection of elements or groups of elements. Selected elements will often highlight or affect values seen across all the dialogs.

For Mac users:
* `alt` = options/alt key
* `ctrl` = apple key

__Basic__
* `left click`: select an item in a list, or a vessel or anchor inside the sungear dialog.
* `shift left click`: select a range of items in a list. Left Click the first item of the range then Shift Left Click on the final item to select the range.

__Advanced__
Once the basics of selecting have been mastered there are two additional types of selection in Sungear that allow more control over the data.
* `ctrl left click`: Unions an anchor/vessel/term with a previous selection. From then on, toggles between selecting all or none of the genes in the anchor/vessel/term.
* `ctrl alt left click`: Starts a multiple select for union and intersection. Performing this action will highlight the union and the Intersection buttons in the control dialog. Once elements have been selected pressing the Union or Intersection button finishes the command.
![Union Intersection](images/sungear_union_intersection.png)

## Control dialog

![Sungear Control](images/sungear_control.png)

__What you are seeing__

The general management tool for sungear data.
* Restart: reloads data set
* All: select all groupings
* None: select no groupings
* << : Go backward to a previous selection
* >> : Go forward to a selection
* Narrow: Create a new group based on selected elements and clears selection history.
* Union ![Union](images/sungear_union.png): Union two or more selected elements. Select multiple elements using `ctrl-alt left-click`, then click _Union_.
* Intersect ![Intersect](images/sungear_intersection.png): Intersect two or more selected elements. Select multiple elements using `ctrl-alt left-click`, then click _Intersect_.
* Find Cool: Find the vessel consisting of the most overrepresented set. The results are saved after the first click. If saved results are available, the button will read "Show Cool".
* Export: Export data set
* View Group ![View Group](images/sungear_view_group.png): View this group

## Genes Dialog
