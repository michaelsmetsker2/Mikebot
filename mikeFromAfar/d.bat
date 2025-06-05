@echo off
echo Registering AcaTts for Sapi 5 layer.
if exist %systemroot%\syswow64\regsvr32.exe (
%systemroot%\syswow64\regsvr32.exe /s "%~dp0\AcaTtsSapi5.dll"
%systemroot%\system32\regsvr32.exe /s "%~dp0\AcaTtsSapi5.64.dll"
) else (
%systemroot%\system32\regsvr32.exe /s "%~dp0\AcaTtsSapi5.dll"
)
exit
