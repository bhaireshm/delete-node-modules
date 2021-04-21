@ echo off

REM Check if path exist
if exist "./node_modules" (

    REM Loop in dir files
    for /f "delims=" %%f in ('dir /a /b /s %1') do (
        
        REM Check file sizes
        for /f "usebackq delims=" %%s in ('%%f') do (

            REM Check if there is a file bigger than 0 bytes
            if %%~zs GTR 0 (
                @REM The directory is not empty
                goto startApp
            )
        )
    )
    @REM The directory is empty
    goto installPackages
) else (
    @REM node_modules not found
    goto installPackages   
)

:end
pause

:installPackages
echo Installing required packages please wait
npm install && npm start

:startApp
@REM Executing npm command in cmd prompt
cls
npm start