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

## Interfacing with Sungear

__Selecting__

Almost all dialogs in Sungear allow the selection of elements or groups of elements. Selected elements will often highlight or affect values seen across all the dialogs.

For Mac users:
`alt` = options/alt key
`ctrl` = apple key

__Basic__
* `Left Click`: select an item in a list, or a vessel or anchor inside the sungear dialog.
* `Shift Left Click`: select a range of items in a list. Left Click the first item of the range then Shift Left Click on the final item to select the range.

__Advanced__
Once the basics of selecting have been mastered there are two additional types of selection in Sungear that allow more control over the data.
* `Ctrl Left Click`: Unions an anchor/vessel/term with a previous selection. From then on, toggles between selecting all or none of the genes in the anchor/vessel/term.
* `Ctrl Alt Left Click`: Starts a multiple select for union and intersection. Performing this action will highlight the union and the Intersection buttons in the control dialog. Once elements have been selected pressing the Union or Intersection button finishes the command.
![Union Intersection](images/sungear_union_intersection.png)

## Control dialog
![Sungear Control](images/sungear_control.png)
