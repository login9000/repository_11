# Требования

1. nginx 
2. nodejs >= 20
3. python >= 3.9
4. mariaDB >= 10.7

# Подготовка и установка 

Создайте папку для проекта, я рекомендую /var/www/default, зайдите в эту папку и выполните ```git clone https://github.com/login9000/repository_11 .``` таким образом в этой папке появятся все необходимые файлы проекта. Обратите внимание на папку /var/www/default/sources-frontend в ней находятся исходники фронтенда, фронтенд написан на Angular, поэтому настоятельно рекомендую переместить эту папку куда нибудь в другое место и уже там из другого места работать над исходниками фронтенда. Допустим вы ее решили переместить в /root/ таким образом если зайти в /root/sources-frontend мы увидим исходники фронтенда, и оттуда будем работать, отлично 🤔 🤔 🤔

Создайте в системе какого нибудь пользователя от имени которого будут работаь микросервисы проекта, рекомендую чтобы все это работало не от root. Почему именно так рекомендую можете почитать об этом в интернете. Затем выполнитету команду чтобы установить правильные права доступа для файлов (и замените "vasya" на имя того пользователя которого вы создали):
```
chown vasya:www-data -R /var/www/default
```

Установите необходимые зависимости для nodejs микросервисов:
```
cd /var/www/default
npm i jsonschema
```

Установите необходимые зависимости для python микросервисов:
```
pip3 install fastapi --break-system-packages
pip3 install "uvicorn[standard]" --break-system-packages
pip3 install fpdf2 --break-system-packages
pip3 install rsa --break-system-packages
pip3 install xlsxwriter --break-system-packages
```

Если папка в которую вы установили проект не /var/www/default то откройте:
```
/var/www/default/aes_crypto/aes_crypto.service
/var/www/default/email_sender/email_sender.service
/var/www/default/pdf_creator/pdf_creator.service 
/var/www/default/rsa_crypto/rsa_crypto.service
/var/www/default/xlsx_creator/xlsx_creator.service
```
и замените везде "/var/www/default" на тот путь к папке куда вы все установили.

Если версия python у вас не 3.9 то откройте:
```
/var/www/default/email_sender/email_sender.service
/var/www/default/pdf_creator/pdf_creator.service 
/var/www/default/rsa_crypto/rsa_crypto.service
/var/www/default/xlsx_creator/xlsx_creator.service
```
и замените везде "python3.9" на вазу версию python, например "python3.11"

Создайте в системе какого нибудь пользователя от имени которого будут работаь микросервисы проекта, рекомендую чтобы все это работало не от root. Почему именно так рекомендую можете почитать об этом в интернете.

Откройте: 
```
/var/www/default/aes_crypto/aes_crypto.service
/var/www/default/email_sender/email_sender.service
/var/www/default/pdf_creator/pdf_creator.service 
/var/www/default/rsa_crypto/rsa_crypto.service
/var/www/default/xlsx_creator/xlsx_creator.service
```
и замените везде "vasya" на имя того пользователя которого вы создали.

Установите и настройте nginx и mariaDB, как это делается можно почитать в интернете. Затем откройте файл /var/www/default/.env и установите правильные значения для переменных для подключения к mariaDB:
```
DB_HOST
DB_PORT
DB_DATABASE
DB_USERNAME
DB_PASSWORD
```

После настройки базы данных mariaDB и создания в ней пользователя (рекомендуется), нужно импортировать дамп базы данных проекта в базу данных сервера, для этого сначало в mariaDB создайте базу данных и назовите ее как нибудь, например "db1", затем импортируйте дамп такой командой:
```
вариант 1: "mysql -u <username> -p<PlainPassword> <databasename> < <filename.sql>"
вариант 2: "/usr/bin/mariadb -u <username> -p<PlainPassword> <databasename> < <filename.sql>"
```
где: <username> - имя пользователя в mariaDB, <PlainPassword> - пароль, который соответствует пользователю в mariaDB, <databasename> - имя базы данных (например "db1" как я писал выше), <filename.sql> - путь к sql дампу с базой, скорее всего это будет путь /var/www/default/sokrof.sql

Откройте /var/www/default/config/project.php и в переменную ```host_name``` впишите ip вашего серврера, в переменные:
```
smtp_host
smtp_port
smtp_login
smtp_password
```
если нужно впишите данные для подключения к SMTP серверу который будет рассылать письма (можно оставить как есть). 
В переменные:
```
url_1с
path_1с
port_1с
```
если нужно впишите данные для подключения к удаленному серверу с 1С системой (можно оставить как есть).

Если собираетесь тестировать все это а не сразу закидывать на продакшен то откройте файл конфига для nginx и добавьте в блок "server" вот это чтобы не было броблем с CORS:
```
add_header Access-Control-Allow-Origin  "http://x.x.x.x:4200" always;
add_header Access-Control-Allow-Credentials "true" always;
add_header Access-Control-Allow-Methods "GET, DELETE, POST, PUT, OPTIONS" always;
add_header Access-Control-Allow-Headers "Accept, Authorization, Cache-Control, Content-Type, DNT, If-Modified-Since, Keep-Alive, Origin, User-Agent, X-Requested-With, DNT, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Range, Authorization, company-code, Content-Length, Content-Range, csrf-token, x-csrf-token" always;						 

if ($request_method !~ ^(GET|HEAD|POST|PUT|DELETE|OPTIONS)$) {
	return 444;
}
```
где: x.x.x.x - ip вашего сервера, если вы устанавливаете проект на своем локальном компуктере то вместо x.x.x.x - это скорее всего нужно вписать "127.0.0.1" 🤔 🤔 🤔

Если вы установили проект на своем локальном компуктере то откройте /root/sources-frontend/src/app/core/constants/api-url.ts и закомментируйте первую строчку и разкомментируйте вторую. Во второй строчке можно заметить "8080" - это порт на котором на вашем локальном компуктере будет запущен nginx, если он у вас будет запущен на другом порту то укажите другой порт, вместо "8080".

Бекенд данного проекта по большей части написан на php + laravel и нужно еще подрубить api для laravel, чтобы в этот проект извне, могли отправлятьь запросы из 1С каких то серверов, незнаю каких. 🤔  Как это делается можно почитать в интернете.

Скопируйте микрсервисы в /etc/systemd/system и запустите их:
```
cp /var/www/default/aes_crypto/aes_crypto.service /etc/systemd/system
cp /var/www/default/email_sender/email_sender.service /etc/systemd/system
cp /var/www/default/pdf_creator/pdf_creator.service  /etc/systemd/system
cp /var/www/default/rsa_crypto/rsa_crypto.service /etc/systemd/system
cp /var/www/default/xlsx_creator/xlsx_creator.service /etc/systemd/system

systemctl --system daemon-reload
systemctl enable aes_crypto
systemctl enable email_sender
systemctl enable pdf_creator
systemctl enable rsa_crypto
systemctl enable xlsx_creator

systemctl start aes_crypto
systemctl start email_sender
systemctl start pdf_creator
systemctl start rsa_crypto
systemctl start xlsx_creator
```

Проверьте по очереди статусы только что запущенных микросервисов, все ли в порядке:
```
systemctl status aes_crypto
systemctl status email_sender
systemctl status pdf_creator
systemctl status rsa_crypto
systemctl status xlsx_creator
```

# Использование

Если собираетесь тестировать все это а не сразу закидывать на продакшен то зайдите в папку куда мы переместили исходники фронтенда , которые на Angular , предпологается что это папка /root/sources-frontend выполните 
```
npm install
```
чтобы установились все необходимые зависимости.


### Запуск проекта из исходников чтобы сразу же видеть все изменения
Если вы собираетесь запустить сейчас проект из исходников на своем локальном компуктере то перед запуском незабудьте в файле /root/sources-frontend/src/app/core/constants/api-url.ts разкомментировать вторую строчку и закомментировать первую.

Выполните:
```
ng serve -o --host x.x.x.x
```
где: x.x.x.x - ip вашего сервера, если вы устанавливаете проект на своем локальном компуктере то вместо x.x.x.x - это скорее всего нужно вписать "127.0.0.1" 🤔 🤔 🤔

Если запуск произошол без ошибок (по идее так и должно быть) то мы увидим:
```
** Angular Live Development Server is listening on 127.0.0.1:4200, open your browser on http://127.0.0.1:4200/ **


√ Compiled successfully.

```

Затем откройте http://x.x.x.x:4200/ - перед вами фронтенд проекта запущенного из исходников. Чтобы увидеть проект запущенный из не исходников (из скомпилированного билда) откройте http://x.x.x.x:8080/

где: x.x.x.x - ip вашего сервера, если вы устанавливаете проект на своем локальном компуктере то вместо x.x.x.x - это скорее всего нужно вписать "127.0.0.1" 🤔 🤔 🤔
"8080" - порт на котором будет запущен nginx, если он у вас будет запущен на другом порту то укажите другой порт, вместо "8080".

### Сборка проекта 

Если собираетесь тестировать все это а не сразу закидывать на продакшен то перед сборкой незабудьте в файле /root/sources-frontend/src/app/core/constants/api-url.ts разкомментировать первую строчку и закомментировать вторую.

Выполните:
```
ng build --output-hashing=all --configuration=production
```
в итоге собранный проект (скомпилированный билд) будет находится в /root/sources-frontend/dist/frontend нужно будет просто скопировать все это содержимое и поместить в /var/www/default/public

Ну и последнее, после сборки прокта скопируйте содержимое /var/www/default/public/index.html и вставте в /var/www/default/resources/views/home.blade.php

и затем откройте уже http://x.x.x.x:8080/ чтобы увидеть что получилось в собранном виде.
где: x.x.x.x - ip вашего сервера, если вы устанавливаете проект на своем локальном компуктере то вместо x.x.x.x - это скорее всего нужно вписать "127.0.0.1" 🤔 🤔 🤔
"8080" - порт на котором будет запущен nginx, если он у вас будет запущен на другом порту то укажите другой порт, вместо "8080".

Так же нужно не забыть о том что если мы все это пока только тестируем, то нужно открыть /var/www/default/config/project.php и в переменную "path_1с" вписать значение "/unf_sitec", если уже все это выкладываем на продакшен то в переменнную нужно вписать "/unf"

