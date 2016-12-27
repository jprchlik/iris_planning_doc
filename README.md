A html table which will assist with IRIS planning.

The procedure for the table is as follows.
First, input the planning Day of Year (doy; i.e. December 28, 2016 doy=363).
Then update the memory usage as a percentage.
After you set the memory usage, fill in the table to the right, which contains an overview of your planning days and the days in the time line.
Once you are satisfied with the table, click freeze so the values are stored in the html file.
Next, save the html file as a webarchive, so you have a record of your events 
(N.B. refreshing the page causes you to lose yourinput).
Even though the webarchive looks like a html page when open, you can only work and save from the original html document (might fix with cookies in the future).

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
Again save as a webarchive as you progress, 
adding new observations to the table.


