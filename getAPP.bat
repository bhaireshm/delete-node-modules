@ echo off

if exist "./delete_node_modules" (
    goto startApp
) else (
    goto getProjectFromGit
)

:getProjectFromGit
git clone https://github.com/bhaireshm/delete_node_modules.git
cls

:startApp
cd delete_node_modules
CALL start.bat