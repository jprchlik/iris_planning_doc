A html table which will assist with IRIS planning.

The procedure for the table is as follows.
First, input the planning Day of Year (doy; i.e. December 28, 2016 doy=363).
Then update the memory usage as a percentage.
After you set the memory usage, fill in the table to the right, which contains an overview of your planning days and the days in the time line.
Once you are satisfied with the table, click freeze so the values are stored in the html file.
Next, save the html file using the save button at the bottom left, so you have a event record  
(N.B. refreshing the page causes you to lose your input, but you can reload that data with load).

After you freeze the top tables, proceed to observation table.
In the cells enter data in the following format:
Day = Day in time line (Integer), 
Start Time = Observation start time (HH:MM:SS),
Exp. Time = Exposure time (Float in seconds),
Repeats = Number of repeats of same OBSID (Integer),
End = No input will be computed from Start Time + Repeats(Exp. Time)+11 minutes, 
X = solar X position in arcsec,
Y = solar Y position in arcsec,
OBSID = IRIS OBSID,
Roll = The telescope roll,
AEC = Check if you set the telescope to automatically detect flares and shorten exposure time if detected,
Track = Check if you set the telescope to correct for solar rotation tracking,
Delete = Removes row from table,
Add = Freezes current row and adds a new row after the current row,
Compute End Time = Computes the approximate End Time of the observation.
Save often as you progress because you can reload your progress with load even if you close out of the browser.



