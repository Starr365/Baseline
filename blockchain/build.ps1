$env:HOME = 'C:\Users\Stella'
$env:USERPROFILE = 'C:\Users\Stella'
$env:Path = 'C:\Users\Stella\Desktop\Web Practices\baseline\blockchain\bin;C:\Users\Stella\.cargo\bin;' + $env:Path
.\bin\anchor.exe build
