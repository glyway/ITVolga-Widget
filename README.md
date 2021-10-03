# ITVolga Widget
## Как запустить?
Просто откройте файл index.html в браузере.
## Как вставить скрипт в свой html?
Положите файлы widget.js widget.css и example.png в одну папку с html файлом, в html файле напишите в `head`
```
<link rel="stylesheet" href="widget.css">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet">
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<link rel="stylesheet" href="http://ajax.aspnetcdn.com/ajax/jquery.ui/1.10.3/themes/sunny/jquery-ui.css">
<script src="widget.js"></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet"> 
```
и в `body`
```
<div id="virtual-mirror-widget"></div>
```

