Start-Process powershell -ArgumentList "-Command `"&{npm i -g concurrently}`""
Start-Process powershell -WorkingDirectory "client" -ArgumentList "-Command `"&{npm i}`""
Start-Process powershell -WorkingDirectory "server" -ArgumentList "-Command `"&{npm i}`""
